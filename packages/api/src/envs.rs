macro_rules! load_envs {
    ($($env_name: ident),*) => {
        $(
            pub static $env_name: ::once_cell::sync::Lazy<::std::string::String> = ::once_cell::sync::Lazy::new(|| {
                dotenvy::var(stringify!($env_name)).expect(format!("Could not get environment variable \"{}\"", stringify!($env_name)).as_str())
            });
        )*
    };
}

load_envs!(APP_NAME, WEBSITE_URL, API_LINK);
