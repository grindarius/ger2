use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header};
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};

use crate::{
    constants::Role,
    envs::{JWT_PRIVATE_KEY, JWT_PUBLIC_KEY},
};

pub static HEADER: Lazy<Header> = Lazy::new(|| {
    let mut header = Header::new(Algorithm::RS256);
    header.kid = Some("ger2".to_string());
    header
});

pub static ENCODING_KEY: Lazy<EncodingKey> = Lazy::new(|| {
    EncodingKey::from_rsa_pem(JWT_PRIVATE_KEY.as_bytes())
        .expect("cannot create new jwt encoding key")
});

pub static DECODING_KEY: Lazy<DecodingKey> = Lazy::new(|| {
    DecodingKey::from_rsa_pem(JWT_PUBLIC_KEY.as_bytes())
        .expect("cannot create new jwt decoding key")
});

/// 15 minutes in seconds
pub const EXPIRES: i64 = 900;

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub exp: usize,
    pub iat: usize,
    pub aud: String,
    pub usr: String,
    pub ema: String,
    pub rle: Role,
}

impl Claims {
    pub fn new(username: String, email: String, role: Role) -> Self {
        let reference_time = time::OffsetDateTime::now_utc();

        // These won't fail for some generations...
        let iat: usize = reference_time.unix_timestamp().try_into().unwrap();
        let exp: usize = (reference_time + time::Duration::new(EXPIRES, 0))
            .unix_timestamp()
            .try_into()
            .unwrap();

        Claims {
            exp,
            iat,
            aud: "ger2".to_string(),
            usr: username,
            ema: email,
            rle: role,
        }
    }
}
