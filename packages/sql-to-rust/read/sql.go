package read

import (
	"io/fs"
	"log"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

func ReadSqlFiles(path string, filenamePattern *regexp.Regexp) []fs.DirEntry {
	files, err := os.ReadDir(path)
	if err != nil {
		log.Panic("error: error happened while loading migration files")
	}

  filteredFiles := make([]fs.DirEntry, 0)

  for _, file := range files {
    if strings.HasPrefix(file.Name(), "V") {
      filteredFiles = append(filteredFiles, file)
    }
  }

	sort.Slice(filteredFiles, func(i, j int) bool {
		filenameI := filteredFiles[i].Name()
		filenameJ := filteredFiles[j].Name()

		resultI := filenamePattern.FindStringSubmatch(filenameI)
		resultJ := filenamePattern.FindStringSubmatch(filenameJ)

		fileNumberI, err := strconv.ParseInt(resultI[1], 10, 32)
		if err != nil {
			log.Panic("error: could not convert file number from string to number")
		}

		fileNumberJ, err := strconv.ParseInt(resultJ[1], 10, 32)
		if err != nil {
			log.Panic("error: could not convert file number from string to number")
		}

		return fileNumberI < fileNumberJ
	})

	return filteredFiles
}
