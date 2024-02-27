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
    tag = "misc",
    operation_id = "hello_world",
    responses(
        (
            status = 200,
            description = "If server is up. This should always be served.",
            body = GetHelloWorldResponseBody,
            example = json!({ "message": "ger2 api running" })
        )
    )
)]
pub async fn handler() -> Json<GetHelloWorldResponseBody> {
    Json(GetHelloWorldResponseBody {
        message: "ger axum api is running",
    })
}
