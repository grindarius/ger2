package write

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/ettle/strcase"
	"github.com/grindarius/sql-to-rust/types"
)

func WriteToKnexTypesFormat(enums []types.DatabaseEnum, tables []types.DatabaseTable) {
	sort.Slice(enums, func(i, j int) bool {
		first := enums[i].GetName()
		second := enums[j].GetName()

		return first < second
	})

	sort.Slice(tables, func(i, j int) bool {
		first := tables[i].GetName()
		second := tables[j].GetName()

		return first < second
	})

	finalFile, err := os.Create(filepath.Join("..", "scripts", "src", "types", "index.d.ts"))
	if err != nil {
		log.Panic("error: cannot create new database.rs final file")
	}
	defer finalFile.Close()

	_, err = finalFile.WriteString("import { Knex } from 'knex'\n\ndeclare module 'knex/types/tables' {\n")
	if err != nil {
		log.Panic("error: could not write to database.ts")
	}

	for _, num := range enums {
		var typeString []string = make([]string, 0)
		for _, value := range num.GetValues() {
			typeString = append(typeString, fmt.Sprintf("'%s'", value))
		}
		values := strings.Join(typeString, " | ")

		_, err := finalFile.WriteString(fmt.Sprintf("  type %s = %s\n", strcase.ToPascal(num.GetName()), values))
		if err != nil {
			log.Panic("error: could not write to database.ts")
		}
	}

	_, err = finalFile.WriteString("\n")
	if err != nil {
		log.Panic("error: could not write to database.ts")
	}

	for _, table := range tables {
		_, err := finalFile.WriteString(fmt.Sprintf("  interface %s {\n", strcase.ToPascal(table.GetName())))
		if err != nil {
			log.Panic("error: could not write to database.ts")
		}

		for _, value := range table.GetColumns() {
			_, err := finalFile.WriteString(fmt.Sprintf("    %s: %s\n", value.GetName(), value.GetTypescriptType()))
			if err != nil {
				log.Panic("error: could not write to database.ts")
			}
		}

		_, err = finalFile.WriteString(fmt.Sprintf("  }\n\n"))
		if err != nil {
			log.Panic("error: could not write to database.ts")
		}
	}

	_, err = finalFile.WriteString("  interface Tables {\n")
	if err != nil {
		log.Panic("error: could not write to database.ts")
	}

	for _, table := range tables {
		_, err = finalFile.WriteString(fmt.Sprintf("    %s: %s\n", table.GetName(), table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to database.ts")
		}

		// calculate required type and optional type
		var required []string = make([]string, 0)
		var optional []string = make([]string, 0)
		for _, value := range table.GetColumns() {
			// Any column that have default value is considered optional.
			if value.GetDefaultValueDefined() || value.GetNullable() {
				optional = append(optional, "'"+value.GetName()+"'")
			} else {
				required = append(required, "'"+value.GetName()+"'")
			}
		}

		requiredTypeString := strings.Join(required, " | ")
		optionalTypeString := strings.Join(optional, " | ")

		var requiredString string = ""
		if len(required) != 0 {
			requiredString = fmt.Sprintf("Pick<%s, %s>", table.GetPascalName(), requiredTypeString)
		}

		var optionalString string = ""
		if len(optional) != 0 {
			optionalString = fmt.Sprintf("Partial<Pick<%s, %s>>", table.GetPascalName(), optionalTypeString)
		}

		var insertType []string = make([]string, 0)
		if len(required) != 0 {
			insertType = append(insertType, requiredString)
		}
		if len(optional) != 0 {
			insertType = append(insertType, optionalString)
		}

		insertTypeString := strings.Join(insertType, " & ")

		// calculate non-updatable types
		var nonUpdatable []string = make([]string, 0)
		for _, value := range table.GetColumns() {
			if value.GetPrimaryKey() == true && value.GetForeignKey() == false {
				nonUpdatable = append(nonUpdatable, "'"+value.GetName()+"'")
			}
		}

		nonUpdatableStringType := strings.Join(nonUpdatable, " | ")
		var updateTypeString string = ""
		if len(nonUpdatable) != 0 {
			updateTypeString = fmt.Sprintf("Partial<Omit<%s, %s>>", table.GetPascalName(), nonUpdatableStringType)
		} else {
			updateTypeString = fmt.Sprintf("Partial<%s>", table.GetPascalName())
		}

		// Base table type, insert type, and update type.
		//
		// - Base table type is everything.
		// - Insert type is required columns (you must specify) plus optional columns (nullable and default defined).
		// - Update type is optional everything except ones that are primary key.
		//
		// The table looks like
		// | Primary key | Foreign key | updatable |
		// |        true |        true |      true |
		// |        true |       false |     false |
		// |       false |        true |      true |
		// |       false |       false |      true |
		_, err = finalFile.WriteString(fmt.Sprintf("    %s_composite: Knex.CompositeTableType<%s, %s, %s>\n", table.GetName(), table.GetPascalName(), insertTypeString, updateTypeString))
		if err != nil {
			log.Panic("error: could not write to database.ts")
		}
	}

	_, err = finalFile.WriteString("  }\n}\n")
	if err != nil {
		log.Panic("error: could not write to database.ts")
	}
}

func WriteToKyselyTypes(enums []types.DatabaseEnum, tables []types.DatabaseTable) {
	sort.Slice(enums, func(i, j int) bool {
		first := enums[i].GetName()
		second := enums[j].GetName()

		return first < second
	})

	sort.Slice(tables, func(i, j int) bool {
		first := tables[i].GetName()
		second := tables[j].GetName()

		return first < second
	})

	finalFile, err := os.Create(filepath.Join("..", "scripts", "src", "types", "index.ts"))
	if err != nil {
		log.Panic("error: cannot create new index.rs final file")
	}
	defer finalFile.Close()

	_, err = finalFile.WriteString("import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely'\n\n")
	if err != nil {
		log.Panic("error: could not write to index.ts")
	}

	// Writing enums
	for _, num := range enums {
		enumValuesString := make([]string, 0)
		for _, value := range num.GetValues() {
			enumValuesString = append(enumValuesString, "'"+value+"'")
		}

		enumTypeString := strings.Join(enumValuesString, " | ")
		_, err := finalFile.WriteString(fmt.Sprintf("export type %s = %s\n", num.GetPascalName(), enumTypeString))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}
	}

	finalFile.WriteString("\n")
	if err != nil {
		log.Panic("error: could not write to index.ts")
	}

	// Writing database table types
	for _, table := range tables {
		_, err = finalFile.WriteString(fmt.Sprintf("export interface %sTable {\n", table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}

		for _, column := range table.GetColumns() {
			insertableTypeString := getInsertableType(column)
			updatableTypeString := getUpdatableType(column)

			_, err = finalFile.WriteString(fmt.Sprintf("  %s: ColumnType<%s, %s, %s>\n", column.GetName(), column.GetTypescriptType(), insertableTypeString, updatableTypeString))
			if err != nil {
				log.Panic("error: could not write to index.ts")
			}
		}

		_, err := finalFile.WriteString(fmt.Sprintf("}\n\n"))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}

		_, err = finalFile.WriteString(fmt.Sprintf("export type %s = Selectable<%sTable>\n", table.GetPascalName(), table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}

		_, err = finalFile.WriteString(fmt.Sprintf("export type New%s = Insertable<%sTable>\n", table.GetPascalName(), table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}

		_, err = finalFile.WriteString(fmt.Sprintf("export type Update%s = Updateable<%sTable>\n\n", table.GetPascalName(), table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}
	}

	_, err = finalFile.WriteString("export interface Database {\n")
	if err != nil {
		log.Panic("error: could not write to index.ts")
	}

	for _, table := range tables {
		_, err := finalFile.WriteString(fmt.Sprintf("  %s: %sTable\n", table.GetName(), table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to index.ts")
		}
	}

	_, err = finalFile.WriteString("}\n")
	if err != nil {
		log.Panic("error: could not write to index.ts")
	}
}

func getInsertableType(column types.DatabaseColumn) string {
	if column.GetDefaultValueDefined() || column.GetNullable() {
		if column.GetPostgresType() == "point" {
			return "string | undefined"
		}

		return fmt.Sprintf("%s | undefined", column.GetTypescriptType())
	}

	if column.GetPostgresType() == "point" {
		return "string | undefined"
	}

	return column.GetTypescriptType()
}

func getUpdatableType(column types.DatabaseColumn) string {
	if column.GetPrimaryKey() && !column.GetForeignKey() {
		return "never"
	}

	if column.GetPostgresType() == "point" {
		return "string | undefined"
	}

	return fmt.Sprintf("%s | undefined", column.GetTypescriptType())
}
