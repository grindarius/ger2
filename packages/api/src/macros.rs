/// Load environment variable at the start of the program. Crash the program when the environment
/// variable is not found
macro_rules! load_envs {
    ($($env_name: ident),*) => {
        $(
            pub static $env_name: ::once_cell::sync::Lazy<::std::string::String> = ::once_cell::sync::Lazy::new(|| {
                dotenvy::var(stringify!($env_name)).expect(format!("Could not get environment variable \"{}\"", stringify!($env_name)).as_str())
            });
        )*
    };
}

/// Set default value of enum in swagger documentation.
macro_rules! openapi_enum_default {
    ($enum_name: ident) => {
        ::paste::paste! {
            pub struct [<$enum_name Modifier>];

            impl ::utoipa::Modify for [<$enum_name Modifier>] {
                fn modify(&self, openapi: &mut ::utoipa::openapi::OpenApi) {
                    openapi.components.as_mut().map(|v| {
                        v.schemas.get_mut(stringify!($enum_name)).map(|z| {
                            if let ::utoipa::openapi::RefOr::T(schema) = z {
                                if let ::utoipa::openapi::Schema::Object(obj) = schema {
                                    obj.default = Some(::serde_json::json!(::serde_variant::to_variant_name(&$enum_name::default()).unwrap()))
                                }
                            }
                        })
                    });
                }
            }
        }
    };
}

/// Create example error response for swagger api
///
/// # Params:
/// - `$name`: Put the name of the example variable in.
/// - `$status_code`: Any imports from [`actix_web::http::StatusCode`].
/// - `$message`: String literal you want to put as error message of the response.
///
/// # Example:
/// ```rust
/// use crate::macros::example_error_response;
///
/// example_error_response!(INVALID_SWAGGER_KEY, BAD_REQUEST, "property \"x\" cannot be an empty string");
/// ```
///
/// Then you can import that in other module as `crate::EXAMPLE_BAD_REQUEST_RESPONSE`
macro_rules! example_error_response {
    ($name: ident, $status_code: ident, $message: stmt) => {
        ::paste::paste! {
            pub static [<EXAMPLE_ $name _RESPONSE>]: ::once_cell::sync::Lazy<$crate::errors::error_response::ErrorResponse> = ::once_cell::sync::Lazy::new(|| $crate::errors::error_response::ErrorResponse {
                status_code: ::actix_web::http::StatusCode::$status_code.as_u16(),
                error: ::actix_web::http::StatusCode::$status_code.canonical_reason().unwrap_or("").to_string(),
                message: $message.to_string(),
            });
        }
    }
}

/// A macro that creates top level array export for a struct with `#[serde(transparent)]`
///
/// # Example:
/// ```rust
/// use crate::macros::top_level_array_ts_type;
/// use serde::Serialize;
/// use ts_rs::TS;
///
/// #[derive(Serialize)]
/// #[serde(transparent)]
/// pub struct ResponseBody {
///     responses: Vec<ResponseBodyInner>
/// }
///
/// #[derive(Serialize, TS)]
/// #[ts(export)]
/// pub struct ResponseBodyInner {
///     id: String,
///     name: String,
/// }
///
/// top_level_array_ts_type!(
///     ResponseBody,
///     ResponseBodyInner
/// );
/// ```
///
/// This will write the typescript output of a struct `ResponseBody` will have a type of a top
/// level array of the type `ResponseBodyInner`.
macro_rules! top_level_array_ts_type {
    ($base_struct:ty, $top_level_struct:ty) => {
        impl ts_rs::TS for $base_struct {
            const EXPORT_TO: Option<&'static str> =
                Some(concat!("bindings/", stringify!($base_struct), ".ts"));

            fn decl() -> String {
                let res = std::fmt::format(format_args!(
                    "type {0}{1} = {2};",
                    stringify!($base_struct),
                    "",
                    concat!("Array<", stringify!($top_level_struct), ">")
                ));

                res
            }

            fn name() -> String {
                stringify!($base_struct).to_owned()
            }

            fn inline() -> String {
                concat!("Vec<", stringify!($top_level_struct), ">").to_owned()
            }

            fn dependencies() -> Vec<ts_rs::Dependency> {
                let mut dependencies = Vec::new();

                if <Vec<$top_level_struct> as ts_rs::TS>::transparent() {
                    dependencies.append(&mut <Vec<$top_level_struct> as ts_rs::TS>::dependencies());
                } else {
                    if let Some(dep) = ts_rs::Dependency::from_ty::<Vec<$top_level_struct>>() {
                        dependencies.push(dep);
                    }
                }
                if <$top_level_struct as ts_rs::TS>::transparent() {
                    dependencies.append(&mut <$top_level_struct as ts_rs::TS>::dependencies());
                } else {
                    if let Some(dep) = ts_rs::Dependency::from_ty::<$top_level_struct>() {
                        dependencies.push(dep);
                    }
                }

                dependencies
            }

            fn transparent() -> bool {
                false
            }
        }

        ::paste::paste! {
            #[cfg(test)]
            #[test]
            fn [<export_bindings_ $base_struct:lower>]() {
                $base_struct::export().expect("could not export type");
            }
        }
    };
}

pub(crate) use example_error_response;
pub(crate) use load_envs;
pub(crate) use openapi_enum_default;
pub(crate) use top_level_array_ts_type;
