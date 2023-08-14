use actix_web::HttpResponse;

use crate::envs;

pub async fn handler() -> HttpResponse {
    HttpResponse::PermanentRedirect()
        .insert_header((
            "Location",
            format!("{}/documentation/", *envs::FULL_API_LINK),
        ))
        .finish()
}
