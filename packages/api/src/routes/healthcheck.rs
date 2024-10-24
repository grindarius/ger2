use axum::Json;
use serde::Serialize;
use utoipa::ToSchema;

use crate::errors::{ErrorResponse, EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE};

#[derive(Serialize, ToSchema)]
pub struct GetHealthcheckResponseBody {
    message: &'static str,
}

#[utoipa::path(
    get,
    path = "/",
    tag = "misc",
    operation_id = "healthcheck",
    responses(
        (
            status = 200,
            description = "If server is up. This should always be served.",
            body = GetHealthcheckResponseBody,
            example = json!({ "message": "ger2 api running" })
        ),
        (
            status = "5XX",
            description = "Something goes wrong",
            body = ErrorResponse,
            example = json!(*EXAMPLE_INTERNAL_SERVER_ERROR_RESPONSE)
        )
    )
)]
pub async fn handler() -> Json<GetHealthcheckResponseBody> {
    Json(GetHealthcheckResponseBody {
        message: "ger2 api is up and running",
    })
}
