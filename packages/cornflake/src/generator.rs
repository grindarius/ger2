use crate::Cornflake;

pub struct Generator {
    previous: Option<Cornflake>,
}

impl Generator {
    pub fn new() -> Self {
        Self { previous: None }
    }

    // If previous exists => generate new from the old one, put in place instead of the old one.
    // If not => generate new, put in place instead of none.
    pub fn next(&mut self) -> Cornflake {
        if let Some(prev) = self.previous {
            let current = Cornflake::from_previous(prev);
            self.previous = Some(current);
            return current;
        }

        let current = Cornflake::new();
        self.previous = Some(current);
        current
    }
}

impl Default for Generator {
    fn default() -> Self {
        Self { previous: None }
    }
}
