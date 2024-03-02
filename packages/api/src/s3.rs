use crate::environment_variables::{
    AWS_ACCESS_KEY_ID, AWS_ENDPOINT_URL, AWS_REGION, AWS_SECRET_ACCESS_KEY,
};
use aws_credential_types::Credentials;
use aws_sdk_s3::{Client, Config};
use aws_types::region::Region;
use once_cell::sync::Lazy;

pub fn init_s3() -> aws_sdk_s3::Client {
    let s3_credentials = Credentials::from_keys(
        Lazy::force(&AWS_ACCESS_KEY_ID),
        Lazy::force(&AWS_SECRET_ACCESS_KEY),
        None,
    );

    let config = match *AWS_ENDPOINT_URL {
        Some(endpoint_url) => Config::builder()
            .credentials_provider(s3_credentials)
            .region(Region::new(*AWS_REGION))
            .endpoint_url(endpoint_url)
            .build(),
        None => Config::builder()
            .credentials_provider(s3_credentials)
            .region(Region::new(*AWS_REGION))
            .build(),
    };

    Client::from_conf(config)
}
