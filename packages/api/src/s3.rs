use std::sync::LazyLock;

use aws_credential_types::Credentials;
use aws_sdk_s3::{Client, Config};
use aws_types::region::Region;

use crate::environment_variables::{
    AWS_ACCESS_KEY_ID, AWS_ENDPOINT_URL, AWS_REGION, AWS_SECRET_ACCESS_KEY,
};

pub fn init_s3() -> aws_sdk_s3::Client {
    let s3_credentials = Credentials::from_keys(
        LazyLock::force(&AWS_ACCESS_KEY_ID),
        LazyLock::force(&AWS_SECRET_ACCESS_KEY),
        None,
    );

    let config = match LazyLock::force(&AWS_ENDPOINT_URL) {
        Some(endpoint_url) => Config::builder()
            .credentials_provider(s3_credentials)
            .region(Region::new(LazyLock::force(&AWS_REGION)))
            .endpoint_url(endpoint_url)
            .build(),
        None => Config::builder()
            .credentials_provider(s3_credentials)
            .region(Region::new(LazyLock::force(&AWS_REGION)))
            .build(),
    };

    Client::from_conf(config)
}
