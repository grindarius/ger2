#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::auth::signin::handler,
        crate::routes::docs::redirect::handler,
        crate::routes::programs::get_programs::handler,
        crate::routes::programs::get_program::handler
    ),
    components(
        schemas(
            crate::routes::auth::signin::SigninRequestBody,
            crate::routes::auth::signin::SigninResponseBody,
            crate::routes::programs::get_programs::GetProgramsResponseBody,
            crate::routes::programs::get_programs::GetProgramsResponseBodyInner,
            crate::routes::programs::get_program::GetProgramRequestParams,
            crate::routes::programs::get_program::GetProgramResponseBody,
            crate::constants::Role,
            crate::errors::error_response::ErrorResponse
        )
    ),
    tags(
        (
            name = "auth"
        ),
        (
            name = "docs"
        ),
        (
            name = "programs"
        )
    )
)]
pub struct ApiDoc;
