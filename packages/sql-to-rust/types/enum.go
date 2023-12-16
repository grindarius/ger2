package types

import "github.com/ettle/strcase"

type DatabaseEnum struct {
	Name   string
	Values []string
}

func (x DatabaseEnum) GetName() string {
	return x.Name
}

func (x DatabaseEnum) GetPascalName() string {
	return strcase.ToPascal(x.Name)
}

func (x DatabaseEnum) GetValues() []string {
	return x.Values
}
