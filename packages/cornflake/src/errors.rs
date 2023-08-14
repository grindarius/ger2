#[derive(thiserror::Error, Debug)]
pub enum CornflakeError {
    #[error("backward duration while getting unix timestamp with {0} millisecond difference")]
    BackwardDuration(u128),
}
