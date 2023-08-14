//! Cornflake.rs
//! My simple id generator for the ger project that I am creating!
//!
//! Format:
//! First 48 bits: timestamp milisecond precision
//! Second 16 bits: sequence data
//! ```

use std::{
    fmt::Display,
    time::{Duration, SystemTime, UNIX_EPOCH},
};

pub mod errors;
mod generator;

pub use generator::Generator;

#[derive(Copy, Clone)]
pub struct Cornflake(u64);

impl Display for Cornflake {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl Cornflake {
    pub const TIME_BITS: u8 = 48;
    pub const SEQUENCE_BITS: u8 = 16;

    pub fn from_previous(previous: Cornflake) -> Cornflake {
        let (prev_time, mut prev_sequence): (u64, u16) = previous.into();
        let time = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or(Duration::ZERO)
            .as_millis() as u64;

        if prev_time == time {
            prev_sequence += 1;
            return Cornflake::from((time, prev_sequence));
        }

        Cornflake::from((time, 1u16))
    }

    pub fn new() -> Cornflake {
        // This won't fail until your CMOS battery goes bad.
        let time: u128 = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or(Duration::ZERO)
            .as_millis();

        // get last 48 bits. The program would just not producing new timestamp after some 10000 AD.
        let time: u64 = (time & 0xFFFFFFFFFFFF as u128) as u64;
        let sequence: u16 = 1;

        Cornflake::from((time, sequence))
    }

    pub fn to_be_bytes(&self) -> [u8; 8] {
        self.0.to_be_bytes()
    }

    pub fn time(self) -> u64 {
        self.0 >> Self::SEQUENCE_BITS
    }

    pub fn sequence(self) -> u16 {
        (self.0 & u64::from(u16::MAX)) as u16
    }
}

impl From<(u64, u16)> for Cornflake {
    fn from((time, seq): (u64, u16)) -> Self {
        Cornflake(time << 16 | u64::from(seq))
    }
}

impl Into<(u64, u16)> for Cornflake {
    fn into(self) -> (u64, u16) {
        (self.time(), self.sequence())
    }
}
