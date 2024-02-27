use serde::{Deserialize, Deserializer};
use ts_rs::TS;

/// Patch type to contain 3 states of json
///
/// - absent, meaning the key is not there
/// - null, meaning the value is null. In that case update the final value to null.
/// - value, meaning there is value to update. Update to that value.
///
/// If the null is passed into the database value that cannot be set to null, ignore that field.
#[derive(Debug)]
pub enum Patch<T> {
    Absent,
    Null,
    Value(T),
}

impl<T> Default for Patch<T> {
    fn default() -> Self {
        Patch::Absent
    }
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

impl<T: TS> TS for Patch<T> {
    fn name() -> String {
        unreachable!();
    }

    fn name_with_type_args(args: Vec<String>) -> String {
        assert_eq!(
            args.len(),
            1,
            "called Patch::name_with_type_args with {} args",
            args.len()
        );
        format!("{} | null | undefined", args[0])
    }

    fn inline() -> String {
        format!("{} | null | undefined", T::inline())
    }

    fn dependencies() -> Vec<ts_rs::Dependency>
    where
        Self: 'static,
    {
        vec![]
    }

    fn transparent() -> bool {
        true
    }
}
