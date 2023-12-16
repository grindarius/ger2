use std::time::Duration;

use axum::{
    extract::{OriginalUri, Request},
    response::Response,
};
use once_cell::sync::Lazy;
use opentelemetry::global;
use opentelemetry_sdk::{propagation::TraceContextPropagator, runtime::Tokio};
use tower_http::classify::ServerErrorsFailureClass;
use tracing::{field, Span};
use tracing_appender::non_blocking::WorkerGuard;
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_subscriber::{prelude::__tracing_subscriber_SubscriberExt, EnvFilter, Registry};
use ulid::Ulid;

use crate::environment_variables::APP_NAME;

pub fn init_telemetry() -> WorkerGuard {
    global::set_text_map_propagator(TraceContextPropagator::new());
    let tracer = opentelemetry_jaeger::new_agent_pipeline()
        .with_service_name(Lazy::force(&APP_NAME))
        .install_batch(Tokio)
        .expect("Failed to install Opentelemetry tracer");

    let env_filter = EnvFilter::try_from_default_env().unwrap_or(
        format!(
            "{}=debug,tower_http=debug,axum::rejection=trace",
            Lazy::force(&APP_NAME)
        )
        .into(),
    );
    let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);
    let (non_blocking_writer, guard) = tracing_appender::non_blocking(std::io::stdout());
    let formatting_layer =
        BunyanFormattingLayer::new(Lazy::force(&APP_NAME).into(), non_blocking_writer);

    let subscriber = Registry::default()
        .with(env_filter)
        .with(telemetry)
        .with(JsonStorageLayer)
        .with(formatting_layer);

    tracing::subscriber::set_global_default(subscriber)
        .expect("Failed to install tracing subscriber");

    guard
}

pub fn make_span(request: &Request) -> Span {
    let request_id = Ulid::new();
    let uri = if let Some(path) = request.extensions().get::<OriginalUri>() {
        path.0.path()
    } else {
        request.uri().path()
    };
    let method = request.method();

    tracing::info_span!("http-request", %request_id, %uri, %method, latency = field::Empty)
}

pub fn on_request(request: &Request, _span: &Span) -> () {
    tracing::info!("request: {} {}", request.method(), request.uri().path());
}

pub fn on_response(response: &Response, latency: Duration, span: &Span) -> () {
    let nanos = latency.as_nanos();
    span.record("latency", nanos);

    tracing::info!("response: {}", response.status());
}

pub fn on_failure(error: ServerErrorsFailureClass, latency: Duration, span: &Span) -> () {
    let nanos = latency.as_nanos();
    span.record("latency", nanos);

    tracing::error!("error: {}", error);
}
