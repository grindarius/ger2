use deadpool_postgres::{Config, ManagerConfig, Pool, RecyclingMethod, Runtime};
use tokio_postgres::NoTls;

use crate::envs::{
    FILE_SERVER_PG_DBNAME, FILE_SERVER_PG_HOST, FILE_SERVER_PG_PASS, FILE_SERVER_PG_PORT,
    FILE_SERVER_PG_USER, PG_DBNAME, PG_HOST, PG_PASS, PG_PORT, PG_USER,
};

pub fn create_main_pool() -> Pool {
    let mut config = Config::new();

    config.user = Some(PG_USER.to_string());
    config.password = Some(PG_PASS.to_string());
    config.host = Some(PG_HOST.to_string());
    config.port = Some(
        PG_PORT
            .parse::<u16>()
            .expect("cannot convert postgres port to u16"),
    );
    config.dbname = Some(PG_DBNAME.to_string());
    config.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });

    config
        .create_pool(Some(Runtime::Tokio1), NoTls)
        .expect("Cannot create postgres main pool from a given config")
}

pub fn create_file_server_pool() -> Pool {
    let mut config = Config::new();

    config.user = Some(FILE_SERVER_PG_USER.to_string());
    config.password = Some(FILE_SERVER_PG_PASS.to_string());
    config.host = Some(FILE_SERVER_PG_HOST.to_string());
    config.port = Some(
        FILE_SERVER_PG_PORT
            .parse::<u16>()
            .expect("cannot convert postgres port to u16"),
    );
    config.dbname = Some(FILE_SERVER_PG_DBNAME.to_string());
    config.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });

    config
        .create_pool(Some(Runtime::Tokio1), NoTls)
        .expect("Cannot create postgres file server pool from a given config")
}
