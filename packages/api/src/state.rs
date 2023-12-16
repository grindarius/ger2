use deadpool_postgres::Pool;

pub struct SharedState {
    pub pool: Pool,
}

impl SharedState {
    pub fn new(pool: Pool) -> Self {
        Self { pool }
    }
}

impl Clone for SharedState {
    fn clone(&self) -> Self {
        Self {
            pool: self.pool.clone(),
        }
    }
}
