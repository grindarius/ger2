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
    FILE_SERVER_PG_HOST,
    FILE_SERVER_PG_PORT,
    FILE_SERVER_PG_USER,
    FILE_SERVER_PG_PASS,
    FILE_SERVER_PG_DBNAME,
    JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY
);
