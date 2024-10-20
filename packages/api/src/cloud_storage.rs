use gcloud_sdk::google_rest_apis::storage_v1::buckets_api::StoragePeriodBucketsPeriodListParams;
use gcloud_sdk::google_rest_apis::storage_v1::

use crate::environment_variables::STORAGE_EMULATOR_ENABLED;

pub async fn init_google_cloud_storage() -> GoogleRestApi {
    if STORAGE_EMULATOR_ENABLED.unwrap_or(String::from("0")) == "1" {
        // Using unwrap here to hard throw when client is failed to create.
        let client = GoogleRestApi::new().await.unwrap();
        return client;
    }

    StoragePeriodBucketsPeriodListParams

    

}
