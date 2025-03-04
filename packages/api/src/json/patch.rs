use serde::{Deserialize, Deserializer};

/// Patch type to contain 3 states of json
///
/// - absent, meaning the key is not there
/// - null, meaning the value is null. In that case update the final value to null.
/// - value, meaning there is value to update. Update to that value.
///
/// If the null is passed into the database value that cannot be set to null, ignore that field.
#[derive(Debug, Default)]
pub enum Patch<T> {
    #[default]
    Absent,
    Null,
    Value(T),
}

impl<T> From<Option<T>> for Patch<T> {
    fn from(opt: Option<T>) -> Patch<T> {
        match opt {
            Some(v) => Patch::Value(v),
            None => Patch::Null,
        }
    }
}

impl<'de, T> Deserialize<'de> for Patch<T>
where
    T: Deserialize<'de>,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Option::deserialize(deserializer).map(Into::into)
    }
}
