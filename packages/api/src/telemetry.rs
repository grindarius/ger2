use once_cell::sync::Lazy;
use opentelemetry::{global, runtime::Tokio, sdk::propagation::TraceContextPropagator};
use tracing_appender::non_blocking::WorkerGuard;
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_subscriber::{prelude::__tracing_subscriber_SubscriberExt, EnvFilter, Registry};

use crate::envs::APP_NAME;

pub fn init_telemetry() -> WorkerGuard {
    global::set_text_map_propagator(TraceContextPropagator::new());
    let tracer = opentelemetry_jaeger::new_agent_pipeline()
        .with_service_name(Lazy::force(&APP_NAME))
        .install_batch(Tokio)
        .expect("Failed to install Opentelemetry tracer.");

    let env_filter = EnvFilter::try_from_default_env().unwrap_or(EnvFilter::new("info"));
    let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);
    let (non_blocking_writer, guard) = tracing_appender::non_blocking(std::io::stdout());
    let bunyan_formatter =
        BunyanFormattingLayer::new(Lazy::force(&APP_NAME).into(), non_blocking_writer);

    let subscriber = Registry::default()
        .with(env_filter)
        .with(telemetry)
        .with(JsonStorageLayer)
        .with(bunyan_formatter);

    tracing::subscriber::set_global_default(subscriber)
        .expect("Failed to install tracing subscriber.");

    guard
}
