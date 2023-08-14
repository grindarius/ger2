use deadpool_postgres::Pool;

pub struct SharedAppData {
    pub pool: Pool,
}

impl SharedAppData {
    pub fn new(pool: Pool) -> Self {
        Self { pool }
    }
}
