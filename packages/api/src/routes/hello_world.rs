use axum::Json;
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Serialize, ToSchema)]
pub struct GetHelloWorldResponseBody {
    message: &'static str,
}

#[utoipa::path(
    get,
    path = "/",
    operation_id = "hello_world",
    responses(
        (
            status = 200,
            description = "If server is up. This should always be served.",
            body = GetHelloWorldResponseBody
        )
    )
)]
pub async fn handler() -> Json<GetHelloWorldResponseBody> {
    Json(GetHelloWorldResponseBody {
        message: "ger2 axum api is running",
    })
}
