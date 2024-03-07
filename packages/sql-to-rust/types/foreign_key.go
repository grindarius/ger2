package types

type DatabaseForeignKey struct {
	OriginalColumnName   string
	ReferencesTableName  string
	ReferencesColumnName string
}

func (x DatabaseForeignKey) GetOriginalColumnName() string {
  return x.OriginalColumnName
}

func (x DatabaseForeignKey) GetReferencesTableName() string {
	return x.ReferencesTableName
}

func (x DatabaseForeignKey) GetReferencesColumnName() string {
	return x.ReferencesColumnName
}
