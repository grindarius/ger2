package types

import (
	"fmt"
	"github.com/ettle/strcase"
)

type DatabaseTable struct {
	Name    string
	Columns []DatabaseColumn
}

func (x DatabaseTable) GetName() string {
	return x.Name
}

func (x DatabaseTable) GetPascalName() string {
	return strcase.ToPascal(x.Name)
}

func (x DatabaseTable) GetColumns() []DatabaseColumn {
	return x.Columns
}

type DatabaseColumn struct {
	Name                string
	PostgresType        string
	RustType            string
	TypescriptType      string
	Nullable            bool
	DefaultValueDefined bool
	Pk                  bool
	Fk                  bool
	FkAttrs             *DatabaseForeignKey
}

func (x DatabaseColumn) GetName() string {
	return x.Name
}

func (x DatabaseColumn) GetPostgresType() string {
	return x.PostgresType
}

func (x DatabaseColumn) GetPascalName() string {
	return strcase.ToPascal(x.Name)
}

func (x DatabaseColumn) GetRustType() string {
	if x.Nullable {
		return "::std::option::Option<" + x.RustType + ">"
	}

	return x.RustType
}

func (x DatabaseColumn) GetRustTypeIden() string {
	if x.Nullable {
		return fmt.Sprintf("::std::option::Option<%sIden>", x.RustType)
	}

	return fmt.Sprintf("%sIden", x.RustType)
}

func (x DatabaseColumn) GetRawTypescriptType() string {
	return x.TypescriptType
}

func (x DatabaseColumn) GetTypescriptType() string {
	if x.Nullable {
		return x.TypescriptType + " | null"
	}

	return x.TypescriptType
}

func (x DatabaseColumn) GetNullable() bool {
	return x.Nullable
}

func (x DatabaseColumn) GetDefaultValueDefined() bool {
	return x.DefaultValueDefined
}

func (x DatabaseColumn) GetPrimaryKey() bool {
	return x.Pk
}

func (x DatabaseColumn) GetForeignKey() bool {
	return x.Fk
}

func (x DatabaseColumn) GetForeignKeyTableName() string {
  if x.FkAttrs != nil {
    return x.FkAttrs.GetReferencesTableName()
  }

  return ""
}

func (x DatabaseColumn) GetForeignKeyColumnName() string {
	if x.FkAttrs != nil {
    return x.FkAttrs.GetReferencesColumnName()
  }

  return ""
}
