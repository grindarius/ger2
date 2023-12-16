package errors

import "errors"

var (
	ColumnNameUndefined  = errors.New("column name is empty string or nil")
	ColumnTypesUndefined = errors.New("column postgres types are undefined")
	StringUndefined      = errors.New("GetString returns nil")
)
