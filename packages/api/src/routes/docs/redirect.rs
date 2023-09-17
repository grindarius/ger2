use actix_web::HttpResponse;

use crate::envs;

#[utoipa::path(
    get,
    path = "/documentation",
    tag = "docs",
    operation_id = "documentation_redirect",
    responses(
        (
            status = 301,
            description = "redirect to correct docs route"
        )
    )
)]
pub async fn handler() -> HttpResponse {
    HttpResponse::PermanentRedirect()
        .insert_header((
            "Location",
            format!("{}/documentation/", *envs::FULL_API_LINK),
        ))
        .finish()
}
