use crate::macros::{optional_envs, required_envs};

required_envs!(
    APP_NAME,
    API_URL,
    FULL_API_URL,
    SWAGGER_API_KEY_NAME,
    SWAGGER_API_KEY,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DBNAME,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION
);

optional_envs!(AWS_ENDPOINT_URL, STORAGE_EMULATOR_ENABLED);
