package write

import (
	"fmt"
	"github.com/ettle/strcase"
	"github.com/grindarius/sql-to-rust/types"
	"log"
	"os"
	"path/filepath"
	"slices"
	"sort"
)

func WriteToRustTypes(enums []types.DatabaseEnum, tables []types.DatabaseTable) {
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

	finalFile, err := os.Create(filepath.Join("..", "api", "src", "database", "schema.rs"))
	if err != nil {
		log.Panic("error: cannot create new schema.rs final file")
	}
	defer finalFile.Close()

	_, err = finalFile.WriteString("//! Stores information about database's tables and types. This file is automagically\n//! generated. Please do not edit this file by hand at all means.\n\nuse super::custom_types::*;\n\n")
	if err != nil {
		log.Panic("error: could not write to schema.rs")
	}

	for _, num := range enums {
		_, err := finalFile.WriteString(fmt.Sprintf("#[allow(dead_code)]\npub enum %sIden {\n    Type,\n", num.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to schema.rs")
		}

		for _, value := range num.GetValues() {
			_, err := finalFile.WriteString(fmt.Sprintf("    %s,\n", strcase.ToPascal(value)))
			if err != nil {
				log.Panic("error: could not write to schema.rs")
			}
		}

		_, err = finalFile.WriteString(fmt.Sprintf("}\n\n"))
		if err != nil {
			log.Panic("error: could not write to schema.rs")
		}

		_, err = finalFile.WriteString(fmt.Sprintf("impl ::sea_query::Iden for %sIden {\n    fn unquoted(&self, s: &mut dyn ::std::fmt::Write) {\n        write!(\n            s,\n            \"{}\",\n            match self {\n", num.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to schema.rs")
		}

		_, err = finalFile.WriteString(fmt.Sprintf("                Self::Type => \"%s\",\n", num.GetName()))
		if err != nil {
			log.Panic("error: could not write to schema.rs")
		}

		for _, value := range num.GetValues() {
			_, err := finalFile.WriteString(fmt.Sprintf("                Self::%s => \"%s\",\n", strcase.ToPascal(value), value))
			if err != nil {
				log.Panic("error: could not write to schema.rs")
			}
		}

		_, err = finalFile.WriteString(fmt.Sprintf("            }\n        )\n        .unwrap()\n    }\n}\n\n"))
		if err != nil {
			log.Panic("error: could not write to schema.rs")
		}
	}

	for index, table := range tables {
		_, err := finalFile.WriteString(fmt.Sprintf("#[allow(dead_code)]\n#[sea_query::enum_def]\npub struct %s {\n", table.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to schema.rs")
		}

		for _, member := range table.GetColumns() {
      _, err := finalFile.WriteString(fmt.Sprintf("    %s: %s,\n", member.GetName(), member.GetRustType()))
      if err != nil {
        log.Panic("error: could not write to schema.rs")
      }
		}

		if index == len(tables)-1 {
			_, err = finalFile.WriteString(fmt.Sprintf("}\n"))
			if err != nil {
				log.Panic("error: could not write to schema.rs")
			}
		} else {
			_, err = finalFile.WriteString(fmt.Sprintf("}\n\n"))
			if err != nil {
				log.Panic("error: could not write to database.rs")
			}
		}
	}
}

func getEnumIden(enums []types.DatabaseEnum, member types.DatabaseColumn) string {
	i := slices.IndexFunc(enums, func(x types.DatabaseEnum) bool {
		return x.GetName() == member.GetName()
	})

	if i == -1 {
		return member.GetRustType()
	}

	return member.GetRustTypeIden()
}

func WriteCustomEnumTypesFile(enums []types.DatabaseEnum) {
	file, err := os.Create(filepath.Join("..", "api", "src", "database", "custom_types.rs"))
	if err != nil {
		log.Panic("error: cannot create new custom_types.rs final file")
	}
	defer file.Close()

	for i, num := range enums {
		file.WriteString(fmt.Sprintf("#[derive(\n    ::std::fmt::Debug,\n    ::std::cmp::PartialEq,\n    ::std::clone::Clone,\n    ::postgres_types::FromSql,\n    ::postgres_types::ToSql,\n    ::serde::Deserialize,\n    ::serde::Serialize,\n    ::ts_rs::TS\n)]\n#[serde(rename_all = \"lowercase\")]\n#[postgres(name = \"%s\")]\n#[ts(export)]\n", num.GetName()))
		if err != nil {
			log.Panic("error: could not write to custom_types.rs")
		}

		file.WriteString(fmt.Sprintf("pub enum %s {\n", num.GetPascalName()))
		if err != nil {
			log.Panic("error: could not write to custom_types.rs")
		}

		for _, value := range num.GetValues() {
			file.WriteString(fmt.Sprintf("    #[postgres(name = \"%s\")]\n    %s,\n", value, strcase.ToPascal(value)))
		}

		if i == len(enums)-1 {
			file.WriteString(fmt.Sprintf("}\n"))
			break
		}

		file.WriteString("}\n\n")
	}
}
