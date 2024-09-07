use aws_sdk_s3::Client;
use deadpool_postgres::Pool;

#[derive(Clone)]
pub struct SharedState {
    pub pool: Pool,
    pub s3: Client,
}

impl SharedState {
    pub fn new(pool: Pool, s3: aws_sdk_s3::Client) -> Self {
        Self { pool, s3 }
    }
}
