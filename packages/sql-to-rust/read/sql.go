package read

import (
	"io/fs"
	"log"
	"os"
	"regexp"
	"sort"
	"strconv"
)

func ReadSqlFiles(path string, filenamePattern *regexp.Regexp) []fs.DirEntry {
	files, err := os.ReadDir(path)
	if err != nil {
		log.Panic("error: error happened while loading migration files")
	}

	sort.Slice(files, func(i, j int) bool {
		filenameI := files[i].Name()
		filenameJ := files[j].Name()

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

	return files
}
