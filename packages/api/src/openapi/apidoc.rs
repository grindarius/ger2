#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::auth::signin::handler
    ),
    components(
        schemas(
            crate::routes::auth::signin::SigninRequestBody,
            crate::routes::auth::signin::SigninResponseBody,
            crate::constants::Role,
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
