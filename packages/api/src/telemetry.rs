use std::time::Duration;

use axum::{
    extract::{OriginalUri, Request},
    response::Response,
};
use once_cell::sync::Lazy;
use tracing::{field, Span};
use tracing_appender::non_blocking::WorkerGuard;
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_subscriber::{prelude::__tracing_subscriber_SubscriberExt, EnvFilter, Registry};

use crate::environment_variables::APP_NAME;

pub fn init_telemetry() -> WorkerGuard {
    let env_filter = EnvFilter::try_from_default_env().unwrap_or(
        format!(
            "{}=debug,tower_http=info,axum::rejection=trace",
            Lazy::force(&APP_NAME)
        )
        .into(),
    );
    let (non_blocking_writer, guard) = tracing_appender::non_blocking(std::io::stdout());
    let formatting_layer =
        BunyanFormattingLayer::new(Lazy::force(&APP_NAME).into(), non_blocking_writer);

    let subscriber = Registry::default()
        .with(env_filter)
        .with(JsonStorageLayer)
        .with(formatting_layer);

    tracing::subscriber::set_global_default(subscriber)
        .expect("Failed to install tracing subscriber");

    guard
}

pub fn make_span(request: &Request) -> Span {
    let uri = if let Some(path) = request.extensions().get::<OriginalUri>() {
        path.0.path()
    } else {
        request.uri().path()
    };
    let method = request.method();

    tracing::info_span!("http-request", %uri, %method, elapsed_nanoseconds = field::Empty)
}

pub fn on_request(request: &Request, _span: &Span) {
    tracing::info!("request: {} {}", request.method(), request.uri().path());
}

pub fn on_response(response: &Response, latency: Duration, span: &Span) {
    let nanos = latency.as_nanos();
    span.record("elapsed_nanoseconds", nanos);
    tracing::info!("response: {}", response.status());
}
