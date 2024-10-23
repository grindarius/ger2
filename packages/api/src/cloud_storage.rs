use gcloud_sdk::{
    error::Error as GoogleCloudError, google_rest_apis::storage_v1::configuration::Configuration,
    GoogleRestApi,
};

use crate::environment_variables::STORAGE_EMULATOR_ENABLED;

pub async fn create_google_storage_config(
    client: &GoogleRestApi,
) -> Result<Configuration, GoogleCloudError> {
    match STORAGE_EMULATOR_ENABLED
        .clone()
        .unwrap_or(String::from("0"))
        .as_str()
    {
        "1" => Ok(Configuration {
            client: client.client.clone(),
            base_path: "http://localhost:4443/storage/v1".to_owned(),
            ..Default::default()
        }),
        "0" => client.create_google_storage_v1_config().await,
        _ => unreachable!(),
    }
}
