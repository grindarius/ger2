#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::auth::signin::handler
    ),
    components(
        schemas(
            crate::errors::ErrorResponse
        )
    ),
    tags(
        (
            name = "auth"
        )
    )
)]
pub struct ApiDoc;
