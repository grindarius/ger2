/// Macro to load multiple required environment variables into the program. The macro generates the code
/// that will crash the program when the environment variable is not found.
///
/// You would write this code in a file to load environment variable
/// ```rust
/// // envs.rs
/// use macros::required_envs;
///
/// required_envs!(API_URL);
/// ```
///
/// Then you can import them like
/// ```rust
/// use envs::API_URL;
/// ```
macro_rules! required_envs {
    ($($env_name: ident), *) => {
        $(
            pub static $env_name: ::std::sync::LazyLock<::std::string::String> = ::std::sync::LazyLock::new(|| {
                ::std::env::var(stringify!($env_name)).expect(format!("Could not get required environment variable \"{}\"", stringify!($env_name)).as_str())
            });
        )*
    }
}

/// Pretty much the same as [`crate::macros::required_envs`] but allows for optinoal environment
/// variable.
macro_rules! optional_envs {
    ($($env_name: ident), *) => {
        $(
            pub static $env_name: ::std::sync::LazyLock<::std::option::Option<::std::string::String>> = ::std::sync::LazyLock::new(|| {
                ::std::env::var(stringify!($env_name)).ok()
            });
        )*
    }
}

/// Create example error response for swagger api
///
/// # Params:
/// - `$name`: Put the name of the example variable in.
/// - `$status_code`: Any imports from [`axum::http::StatusCode`].
/// - `$message`: String literal you want to put as error message of the response.
///
/// # Example:
/// ```rust
/// use crate::macros::error_example;
///
/// error_example!(INVALID_SWAGGER_KEY, BAD_REQUEST, "property \"x\" cannot be an empty string");
/// ```
///
/// Then you can import that in other module as `crate::EXAMPLE_INVALID_SWAGGER_KEY_RESPONSE`
macro_rules! error_example {
    ($name: ident, $status_code: ident, $message: stmt) => {
        ::paste::paste! {
            pub static [<EXAMPLE_ $name _RESPONSE>]: ::std::sync::LazyLock<$crate::errors::ErrorResponse> = ::std::sync::LazyLock::new(|| $crate::errors::ErrorResponse {
                status_code: ::axum::http::StatusCode::$status_code.as_u16(),
                error: ::axum::http::StatusCode::$status_code.canonical_reason().unwrap_or("Unknown Canonical Reason").to_string(),
                message: $message.to_string(),
            });
        }
    }
}

pub(crate) use error_example;
pub(crate) use optional_envs;
pub(crate) use required_envs;
