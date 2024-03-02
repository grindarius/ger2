use deadpool_postgres::Pool;

pub struct SharedState {
    pub pool: Pool,
    pub s3: aws_sdk_s3::Client,
}

impl SharedState {
    pub fn new(pool: Pool, s3: aws_sdk_s3::Client) -> Self {
        Self { pool, s3 }
    }
}

impl Clone for SharedState {
    fn clone(&self) -> Self {
        Self {
            pool: self.pool.clone(),
            s3: self.s3.clone(),
        }
    }
}
