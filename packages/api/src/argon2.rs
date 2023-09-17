use argon2::{Algorithm, Argon2, Params, Version};
use once_cell::sync::Lazy;

pub static ARGON2_INSTANCE: Lazy<Argon2> = Lazy::new(|| {
    Argon2::new(
        Algorithm::Argon2id,
        Version::V0x13,
        Params::new(20_000, 2, 1, Some(64)).expect("cannot create new argon2 parameter instance"),
    )
});
