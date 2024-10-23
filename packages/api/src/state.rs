use deadpool_postgres::Pool;
use gcloud_sdk::GoogleRestApi;

#[derive(Clone)]
pub struct SharedState {
    pub pool: Pool,
    pub gcs: GoogleRestApi,
}

impl SharedState {
    pub fn new(pool: Pool, gcs: GoogleRestApi) -> Self {
        Self { pool, gcs }
    }
}
