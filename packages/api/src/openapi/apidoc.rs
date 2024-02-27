use crate::openapi::security_addon::SecurityAddon;

#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::hello_world::handler,
        crate::routes::programs::get_programs::handler,
        crate::routes::programs::get_program::handler,
        crate::routes::programs::get_program_subjects::handler
    ),
    components(
        schemas(
            crate::routes::hello_world::GetHelloWorldResponseBody,
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
            name = "programs", description = "Programs related routes"
        ),
        (
            name = "misc", description = "path that I don't yet know where to put"
        )
    )
)]
pub struct ApiDoc;
