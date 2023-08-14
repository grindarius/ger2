use crate::macros::load_envs;

load_envs!(
    APP_NAME,
    WEBSITE_URL,
    API_LINK,
    FULL_API_LINK,
    SWAGGER_API_KEY_NAME,
    SWAGGER_API_KEY,
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASS,
    PG_DBNAME,
    JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY
);
