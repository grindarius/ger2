package process

import (
	"github.com/ettle/strcase"
	"github.com/grindarius/sql-to-rust/errors"
	"github.com/grindarius/sql-to-rust/types"
	pg_query "github.com/pganalyze/pg_query_go/v4"
	"log"
)

type TableConstraint struct {
	PrimaryKeys []string
	ForeignKeys []string
}

func (x TableConstraint) GetPrimaryKeys() []string {
	return x.PrimaryKeys
}

func (x TableConstraint) GetForeignKeys() []string {
	return x.ForeignKeys
}

func indexOf[T comparable](collection []T, predicate func(x T) bool) int {
	for i, x := range collection {
		if predicate(x) {
			return i
		}
	}

	return -1
}

func processTableConstraint(constraint *pg_query.Constraint) ([]string, []string, error) {
	contype := constraint.GetContype()

	primaryKeys := make([]string, 0)
	foreignKeys := make([]string, 0)
	switch contype {
	case pg_query.ConstrType_CONSTR_PRIMARY:
		keys := constraint.GetKeys()

		for _, k := range keys {
			str := k.GetString_()
			if str == nil {
				return []string{}, []string{}, errors.StringUndefined
			}

			sval := str.GetSval()
			if sval == "" {
				return []string{}, []string{}, errors.StringUndefined
			}

			primaryKeys = append(primaryKeys, sval)
		}
	case pg_query.ConstrType_CONSTR_FOREIGN:
		fkAttrs := constraint.GetFkAttrs()
		for _, k := range fkAttrs {
			str := k.GetString_()
			if str == nil {
				return []string{}, []string{}, errors.StringUndefined
			}

			sval := str.GetSval()
			if sval == "" {
				return []string{}, []string{}, errors.StringUndefined
			}

			foreignKeys = append(foreignKeys, sval)
		}
	}

	return primaryKeys, foreignKeys, nil
}

func processColumnDef(columnDef *pg_query.ColumnDef) (types.DatabaseColumn, error) {
	columnName := columnDef.GetColname()
	if columnName == "" {
		return types.DatabaseColumn{}, errors.ColumnNameUndefined
	}

	columnTypeName := columnDef.GetTypeName()
	if columnTypeName == nil {
		return types.DatabaseColumn{}, errors.ColumnNameUndefined
	}

	columnTypeNameNames := columnTypeName.GetNames()
	if columnTypeNameNames == nil {
		return types.DatabaseColumn{}, errors.ColumnTypesUndefined
	}

	var rustType string
	var typescriptType string
	var postgresType string
	for _, name := range columnTypeNameNames {
		namesString := name.GetString_()
		if namesString == nil {
			continue
		}

		namesStringSval := namesString.GetSval()
		switch namesStringSval {
		case "pg_catalog", "":
			continue
		case "varchar", "text":
			rustType = "::std::string::String"
			typescriptType = "string"
		case "float4":
			rustType = "::std::primitive::f64"
			typescriptType = "number"
		case "numeric":
			rustType = "::rust_decimal::Decimal"
			typescriptType = "number"
		case "int8":
			rustType = "::std::primitive::i64"
			typescriptType = "number"
		case "int4":
			rustType = "::std::primitive::i32"
			typescriptType = "number"
		case "int2":
			rustType = "::std::primitive::i16"
			typescriptType = "number"
		case "date":
			rustType = "::time::Date"
			typescriptType = "string"
		case "timestamptz":
			rustType = "::time::OffsetDateTime"
			typescriptType = "string"
		case "time":
			rustType = "::time::Time"
			typescriptType = "string"
		case "timestamp":
			rustType = "::time::PrimitiveDateTime"
			typescriptType = "string"
		case "point":
			rustType = "::geo_types::Point<f64>"
			typescriptType = "{ x: number, y: number }"
		case "jsonb", "json":
			rustType = "::serde_json::Value"
			typescriptType = "string"
		case "boolean", "bool":
			rustType = "::std::primitive::bool"
			typescriptType = "boolean"
		default:
			rustType = strcase.ToPascal(namesStringSval)
			typescriptType = strcase.ToPascal(namesStringSval)
		}
		postgresType = namesString.GetSval()
	}

	columnConstraints := columnDef.GetConstraints()

	// constraint at the end of line for each column statement
	var nullable bool = true
	var defaultValueDefined bool = false
	var primaryKey bool = false
	var foreignKey bool = false
	for _, constraint := range columnConstraints {
		constraint := constraint.GetConstraint()

		contype := constraint.GetContype()
		switch contype {
		case pg_query.ConstrType_CONSTR_NOTNULL:
			nullable = false
		case pg_query.ConstrType_CONSTR_DEFAULT:
			defaultValueDefined = true
		case pg_query.ConstrType_CONSTR_PRIMARY:
			primaryKey = true
		case pg_query.ConstrType_CONSTR_FOREIGN:
			foreignKey = true
		}
	}

	return types.DatabaseColumn{
		Name:                columnName,
		PostgresType:        postgresType,
		RustType:            rustType,
		TypescriptType:      typescriptType,
		Nullable:            nullable,
		DefaultValueDefined: defaultValueDefined,
		Pk:                  primaryKey,
		Fk:                  foreignKey,
	}, nil
}

func ProcessCreateTableStatement(statement *pg_query.CreateStmt) types.DatabaseTable {
	columnName := statement.GetRelation().Relname
	if columnName == "" {
		log.Panic("error: create statement does not have relation name for a table")
	}

	tableElements := statement.GetTableElts()
	if tableElements == nil {
		log.Panic("error: create statement does not have table elements")
	}

	var columns []types.DatabaseColumn
	var pks []string
	var fks []string
	for _, tableElem := range tableElements {
		columnDef := tableElem.GetColumnDef()
		columnConstraint := tableElem.GetConstraint()

		if columnDef != nil {
			newColumn, err := processColumnDef(columnDef)
			if err != nil {
				log.Panic("error while processing column def statement")
			}

			columns = append(columns, newColumn)
		} else if columnConstraint != nil {
			primaryKeys, foreignKeys, err := processTableConstraint(columnConstraint)
			if err != nil {
				log.Panic("error while processing column constraint statement")
			}

			pks = append(pks, primaryKeys...)
			fks = append(fks, foreignKeys...)
		}
	}

	// Add table constraints to the columns array

	for i := 0; i < len(columns); i++ {
		column := &columns[i]
		for j := 0; j < len(pks); j++ {
			pk := &pks[j]
			if *pk == column.GetName() {
				column.Pk = true
			}
		}

		for k := 0; k < len(fks); k++ {
			fk := &fks[k]
			if *fk == column.GetName() {
				column.Fk = true
			}
		}
	}

	return types.DatabaseTable{Name: columnName, Columns: columns}
}

func ProcessCreateEnumStatement(statement *pg_query.CreateEnumStmt) types.DatabaseEnum {
	enumTypeNames := statement.GetTypeName()

	var enumName string
	for _, enumTypeName := range enumTypeNames {
		enumTypeString := enumTypeName.GetString_()
		if enumTypeString == nil {
			continue
		}

		enumTypeSval := enumTypeString.GetSval()
		// skip types with empty string or type of "pg_catalog" (postgres's own types)
		if enumTypeSval != "" && enumTypeSval != "pg_catalog" {
			enumName = enumTypeSval
		}
	}

	enumVals := statement.GetVals()
	if enumVals == nil {
		return types.DatabaseEnum{Name: enumName, Values: []string{}}
	}

	var enumValues []string
	for _, enumVal := range enumVals {
		enumValString := enumVal.GetString_()
		if enumValString == nil {
			continue
		}

		enumValTypeSval := enumValString.GetSval()
		if enumValTypeSval != "" {
			enumValues = append(enumValues, enumValTypeSval)
		}
	}

	return types.DatabaseEnum{Name: enumName, Values: enumValues}
}
