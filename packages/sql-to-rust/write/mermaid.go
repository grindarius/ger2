package write

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/grindarius/sql-to-rust/types"
)

func getKeysPhrase(isPk bool, isFk bool) string {
	if isPk && isFk {
		return "PK,FK"
	}

	if isPk && !isFk {
		return "PK"
	}

	if !isPk && isFk {
		return "FK"
	}

	return ""
}

func WriteToMermaidSchema(enums []types.DatabaseEnum, tables []types.DatabaseTable) {
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

	file, err := os.Create(filepath.Join("..", "..", "database.md"))
	if err != nil {
		log.Panic("error: cannot create new database.md file")
	}
	defer file.Close()

	file.WriteString("```mermaid\nerDiagram\n")

	for _, table := range tables {
		file.WriteString(fmt.Sprintf("  %s {\n", table.GetName()))

		for _, column := range table.GetColumns() {
			file.WriteString(strings.TrimRight(fmt.Sprintf("    %s %s %s", column.GetPostgresType(), column.GetName(), getKeysPhrase(column.GetPrimaryKey(), column.GetForeignKey())), " "))
			file.WriteString("\n")
		}

		file.WriteString("  }\n\n")
	}

  for _, table := range tables {
    for _, col := range table.GetColumns() {
      if col.GetForeignKey() {
        fkTableName := col.GetForeignKeyTableName()
        file.WriteString(fmt.Sprintf("    %s ||--o{ %s : links\n", fkTableName, table.GetName()))
      }
    }
  }

	file.WriteString("```\n")
}
