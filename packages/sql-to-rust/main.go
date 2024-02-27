package main

import (
	"github.com/grindarius/sql-to-rust/process"
	"github.com/grindarius/sql-to-rust/read"
	"github.com/grindarius/sql-to-rust/types"
	"github.com/grindarius/sql-to-rust/write"
	pg_query "github.com/pganalyze/pg_query_go/v4"
	"log"
	"path/filepath"
	"regexp"
)

func main() {
	filenamePattern := regexp.MustCompile(`V(?P<Order>\d+)__\w+\.sql`)
	migrationsPath := filepath.Join("..", "..", "migrations")

	var enums []types.DatabaseEnum
	var tables []types.DatabaseTable

	log.Println("program started")
	log.Printf("started loading files from %s", migrationsPath)

	files := read.ReadSqlFiles(migrationsPath, filenamePattern)
	log.Printf("successfully grabbed all files in %s", migrationsPath)

	for _, file := range files {
		log.Printf("started scanning file %s", file.Name())

		fileContent := write.SaveToJson(file, migrationsPath)
		log.Printf("successfully saved json's output of file %s", file.Name())

		tree, err := pg_query.Parse(string(fileContent))
		if err != nil {
			log.Panicf("error: could not parse file %s's contents to pg_query struct", file.Name())
		}

		statements := tree.GetStmts()
		if statements == nil || len(statements) == 0 {
			log.Println("finished processing file %s. No content to process", file.Name())
			continue
		}

		for _, statement := range statements {
			innerStatement := statement.GetStmt()
			if innerStatement == nil {
				log.Println("skipping nil innerStatement for file %s", file.Name())
				continue
			}

			if innerStatement.GetCreateStmt() != nil {
				log.Println("processing a create table statement")
				processedTable := process.ProcessCreateTableStatement(innerStatement.GetCreateStmt())
				tables = append(tables, processedTable)
				log.Println("successfully processed create table statement %s", processedTable.GetName())
			}

			if innerStatement.GetCommentStmt() != nil {
				log.Println("it's a comment block")
			}

			if innerStatement.GetCreateEnumStmt() != nil {
				log.Println("processing a create enum statement")
				processedEnum := process.ProcessCreateEnumStatement(innerStatement.GetCreateEnumStmt())
				enums = append(enums, processedEnum)
				log.Println("successfully processed create enum statement %s", processedEnum.GetName())
			}
		}
	}

	log.Println("finished parsing all tables and expressions to golang structs")
	log.Println("start processing golang outputs to rust and typescript types")

	write.WriteToRustTypes(enums, tables)
	write.WriteCustomEnumTypesFile(enums)
	write.WriteToKyselyTypes(filepath.Join("..", "scripts", "src", "types", "index.ts"), enums, tables)
  write.WriteToKyselyTypes(filepath.Join("..", "website", "src", "types", "database.ts"), enums, tables)

	log.Println("program finished")
}
