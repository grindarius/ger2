#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::auth::signin::handler,
        crate::routes::docs::redirect::handler,
        crate::routes::curriculums::get_curriculums::handler
    ),
    components(
        schemas(
            crate::routes::auth::signin::SigninRequestBody,
            crate::routes::auth::signin::SigninResponseBody,
            crate::routes::curriculums::get_curriculums::GetCurriculumsResponseBody,
            crate::routes::curriculums::get_curriculums::GetCurriculumsResponseBodyInner,
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
            name = "curriculums"
        )
    )
)]
pub struct ApiDoc;
