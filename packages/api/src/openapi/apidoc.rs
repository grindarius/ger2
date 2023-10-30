#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::auth::signin::handler,
        crate::routes::docs::redirect::handler,
        crate::routes::programs::get_programs::handler,
        crate::routes::programs::get_program::handler,
        crate::routes::programs::get_program_subjects::handler,
        crate::routes::files::upload_files::handler
    ),
    components(
        schemas(
            crate::routes::auth::signin::SigninRequestBody,
            crate::routes::auth::signin::SigninResponseBody,
            crate::routes::programs::get_programs::GetProgramsResponseBody,
            crate::routes::programs::get_programs::GetProgramsResponseBodyInner,
            crate::routes::programs::get_program::GetProgramRequestParams,
            crate::routes::programs::get_program::GetProgramResponseBody,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsRequestParams,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsResponseBody,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsResponseBodySubject,
            crate::routes::programs::get_program_subjects::GetProgramSubjectsResponseBodyTree,
            crate::routes::files::upload_files::UploadFilesRequestBody,
            crate::routes::files::upload_files::UploadFilesResponseBody,
            crate::routes::files::upload_files::FileMetadata,
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
        ),
        (
            name = "files"
        )
    )
)]
pub struct ApiDoc;
