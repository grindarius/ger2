use criterion::{criterion_group, criterion_main, Criterion};

fn bench_generate_cornflake(c: &mut Criterion) {
    c.bench_function("generate cornflake", |b| {
        let mut cornflake = cornflake::Generator::new();
        b.iter(|| {
            cornflake.next();
        })
    });
}

criterion_group!(benches, bench_generate_cornflake);
criterion_main!(benches);
