use deadpool_postgres::{
    tokio_postgres::NoTls, Config, ManagerConfig, Pool, RecyclingMethod, Runtime,
};

use crate::environment_variables::{DB_DBNAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER};

pub fn create_pool() -> Pool {
    let mut config = Config::new();

    config.user = Some(DB_USER.to_string());
    config.password = Some(DB_PASSWORD.to_string());
    config.host = Some(DB_HOST.to_string());
    config.port = Some(
        DB_PORT
            .parse::<u16>()
            .expect("cannot convert postgres port to u16"),
    );
    config.dbname = Some(DB_DBNAME.to_string());
    config.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });

    config
        .create_pool(Some(Runtime::Tokio1), NoTls)
        .expect("Cannot create postgres main pool from a given config")
}
