package write

import (
	"bytes"
	"encoding/json"
	"fmt"
	pg_query "github.com/pganalyze/pg_query_go/v4"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func SaveToJson(file fs.DirEntry, migrationsPath string) []byte {
	fileContent, err := os.ReadFile(filepath.Join(migrationsPath, file.Name()))
	if err != nil {
		log.Panicf("error: could not load file %s from the disk", file.Name())
	}

	jsonOutput, err := pg_query.ParseToJSON(string(fileContent))
	if err != nil {
		log.Panicf("error: could not parse file %s's contents to pg_query json content", file.Name())
	}

	jsonFilename := fmt.Sprintf("%s.json", strings.TrimSuffix(file.Name(), filepath.Ext(file.Name())))
	jsonFile, err := os.Create(filepath.Join(".", "file-outputs", jsonFilename))
	if err != nil {
		log.Panic("error: cannot create new file to save pg_query json output to")
	}

	defer jsonFile.Close()

	jsonBytes := []byte(jsonOutput)
	prettifiedJsonBuffer := &bytes.Buffer{}

	if err := json.Indent(prettifiedJsonBuffer, jsonBytes, "", "  "); err != nil {
		log.Panic("error: cannot convert json output from pg_query to prettified json bytes")
	}

	_, err = jsonFile.WriteString(prettifiedJsonBuffer.String())
	if err != nil {
		log.Panic("error: cannot write pg_query json output to new file")
	}

	return fileContent
}
