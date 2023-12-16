use crate::openapi::security_addon::SecurityAddon;

#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::hello_world::handler,
        crate::routes::auth::get_user::handler,
        crate::routes::auth::get_session_and_user::handler,
        crate::routes::programs::get_programs::handler,
        crate::routes::programs::get_program::handler,
        crate::routes::programs::get_program_subjects::handler
    ),
    components(
        schemas(
            crate::routes::hello_world::GetHelloWorldResponseBody,
            crate::routes::auth::get_user::GetUserRequestQueries,
            crate::routes::auth::get_user::GetUserResponseBody,
            crate::routes::auth::get_session_and_user::GetSessionAndUserRequestQueries,
            crate::routes::auth::get_session_and_user::GetSessionAndUserResponseBody,
            crate::routes::auth::get_session_and_user::GetSessionAndUserResponseBodyUser,
            crate::routes::auth::get_session_and_user::GetSessionAndUserResponseBodySession,
            crate::routes::programs::get_programs::GetProgramsResponseBody,
            crate::routes::programs::get_programs::GetProgramsResponseBodyInner,
            crate::routes::programs::get_program::GetProgramRequestParams,
            crate::routes::programs::get_program::GetProgramResponseBody,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsRequestParams,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsResponseBody,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsResponseBodyTree,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsResponseBodySubject,
            crate::errors::ErrorResponse
        )
    ),
    modifiers(&SecurityAddon),
    tags(
        (
            name = "docs", description = "Documentation redirects routes"
        ),
        (
            name = "programs", description = "Programs related routes"
        ),
        (
            name = "auth", description = "lucia auth routes"
        )
    )
)]
pub struct ApiDoc;
