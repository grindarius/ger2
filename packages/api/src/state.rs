use std::sync::LazyLock;

use deadpool_postgres::Pool;
use gcloud_sdk::{
    error::Error as GoogleCloudError, google_rest_apis::storage_v1::configuration::Configuration,
    GoogleRestApi,
};

use crate::environment_variables::STORAGE_EMULATOR_ENABLED;

#[derive(Clone)]
pub struct SharedState {
    pub pool: Pool,
    pub gcs: GoogleRestApi,
}

impl SharedState {
    pub fn new(pool: Pool, gcs: GoogleRestApi) -> Self {
        Self { pool, gcs }
    }

    pub async fn create_google_storage_config(&self) -> Result<Configuration, GoogleCloudError> {
        let emulator_enabled = LazyLock::force(&STORAGE_EMULATOR_ENABLED).as_ref();

        if emulator_enabled == Some(&String::from("1")) {
            return Ok(Configuration {
                client: self.gcs.client.clone(),
                // The default IP is `fsouza/fake-gcs-server`'s default IP.
                base_path: "http://127.0.0.1:4443/storage/v1".to_owned(),
                ..Default::default()
            });
        } else if emulator_enabled == Some(&String::from("0")) {
            return self.gcs.create_google_storage_v1_config().await;
        }

        unreachable!()
    }
}
