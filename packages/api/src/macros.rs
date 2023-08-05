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

pub(crate) use load_envs;
pub(crate) use openapi_enum_default;
