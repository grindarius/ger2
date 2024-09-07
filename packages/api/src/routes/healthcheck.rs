use axum::Json;
use serde::Serialize;
use utoipa::ToSchema;

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
            body = GetHelloWorldResponseBody,
            example = json!({ "message": "ger2 api running" })
        )
    )
)]
pub async fn handler() -> Json<GetHealthcheckResponseBody> {
    Json(GetHealthcheckResponseBody {
        message: "ger2 api is up and running",
    })
}
