use deadpool_postgres::Pool;

pub struct SharedAppData {
    pub pool: Pool,
    pub file_server_pool: Pool,
}

impl SharedAppData {
    pub fn new(main_pool: Pool, file_server_pool: Pool) -> Self {
        Self {
            pool: main_pool,
            file_server_pool,
        }
    }
}
