use std::{
    fmt::Display,
    sync::{Arc, RwLock},
};

use actix_multipart::form::{tempfile::TempFile, MultipartForm};
use actix_web::HttpResponse;
use image::{image_dimensions, imageops::FilterType, io::Reader, GenericImageView};
use serde::Serialize;
use ulid::Ulid;
use utoipa::ToSchema;

use crate::errors::HttpError;

#[derive(MultipartForm, ToSchema)]
pub struct UploadFilesRequestBody {
    #[schema(value_type = Vec<String>, format = Binary)]
    files: Vec<TempFile>,
}

#[derive(Serialize, ToSchema)]
pub struct FileMetadata {
    delete_token: String,
    file: String,
    content_type: String,
    #[schema(value_type = String, format = DateTime)]
    #[serde(with = "time::serde::iso8601")]
    created_at: time::OffsetDateTime,
}

#[derive(Serialize, ToSchema)]
pub struct UploadFilesResponseBody {
    files: Vec<FileMetadata>,
}

/// Save other files onto the disk and process incoming images into multiple sizes
///
/// # Sizes to output.
///     - Small: 0.25 of original size
///     - Medium: 0.5 of original size
///     - Large: 0.75 of original size
///     - Original: Original file
///
/// # Supported file mimes
///     - `image/png`
///     - `image/jpeg`
#[utoipa::path(
    post,
    path = "/files/upload",
    tag = "files",
    operation_id = "upload_files",
    request_body(content = UploadFilesRequestBody, content_type = "multipart/form-data"),
    responses(
        (
            status = 204,
            description = "upload files successfully",
            body = UploadFilesResponseBody
        ),
        (
            status = 422,
            description = "could be unsupported file mimes",
            body = ErrorResponse
        ),
        (
            status = "5XX",
            description = "something I don't even know",
            body = ErrorResponse
        )
    )
)]
pub async fn handler(
    MultipartForm(form): MultipartForm<UploadFilesRequestBody>,
) -> Result<HttpResponse, HttpError> {
    let mut file_group_ids: Vec<(Ulid, String)> = Vec::new();

    // Save files to new directories
    for f in form.files {
        let file_group_id = Ulid::new();
        let file_name = f.file_name.unwrap();
        let (_, file_extension) = file_name.rsplit_once(".").unwrap();

        file_group_ids.push((file_group_id, file_extension.to_string()));

        tracing::info!("saving file {} to the temporary folder", file_group_id);
        f.file
            .persist(format!("./tmp/{}.{}", file_group_id, file_extension))
            .map_err(|e| {
                return HttpError::InternalServerError {
                    cause: e.to_string(),
                };
            })?;

        tracing::info!(
            "creating new directories to move file {} to the destination folder",
            file_group_id
        );
        std::fs::create_dir_all(format!("./files/{}", file_group_id)).map_err(|e| {
            tracing::error!("{:?}", e);
            HttpError::InternalServerError {
                cause: "cannot create new directory to move files to".to_string(),
            }
        })?;
        let _ = std::fs::rename(
            format!("./tmp/{}.{}", file_group_id, file_extension),
            format!("./files/{}/original.{}", file_group_id, file_extension),
        )
        .map_err(|e| {
            tracing::error!("{:?}", e);
            HttpError::InternalServerError {
                cause: "cannot move files".to_string(),
            }
        })?;
    }

    // get files out one by one and process them to different sizes
    for (file_group_id, file_extension) in file_group_ids.iter() {
        tracing::info!(
            "loading image ./files/{}/original.{} to the program",
            file_group_id.to_string(),
            file_extension
        );
        let original_image = Reader::open(format!(
            "./files/{}/original.{}",
            file_group_id.to_string(),
            file_extension,
        ))
        .map_err(|_| HttpError::InternalServerError {
            cause: "someting wrong".to_string(),
        })?
        .decode()
        .map_err(|_| HttpError::InternalServerError {
            cause: "someting wrong".to_string(),
        })?;

        let (original_width, original_height) = original_image.dimensions();
        let new_dimensions = create_dimensions(original_width, original_height);

        let image_arc = Arc::new(original_image);

        let file_group_id_clone = file_group_id.clone();
        let file_extension_clone = file_extension.clone();

        for (width, height, size) in new_dimensions {
            let image_arc_clone = Arc::clone(&image_arc);
            let file_group_id_clone = file_group_id_clone.clone();
            let file_extension_clone = file_extension_clone.clone();

            tracing::info!(
                "spawning new thread to take care of generating new {} size of file id {}",
                size,
                file_group_id_clone
            );
            actix_web::rt::spawn(async move {
                tracing::info!(
                    "resizing new {} image size of file id {}",
                    size,
                    file_group_id_clone
                );
                let resized = image_arc_clone.resize(width, height, FilterType::Triangle);

                tracing::info!(
                    "saving new {} image size of file id {}",
                    size,
                    file_group_id_clone
                );
                resized
                    .save(format!(
                        "./files/{}/{}.{}",
                        file_group_id_clone,
                        size.to_string(),
                        file_extension_clone
                    ))
                    .unwrap();
            })
            .await
            .map_err(|e| HttpError::InternalServerError {
                cause: e.to_string(),
            })?;
        }
    }

    Ok(HttpResponse::NoContent().finish())
}

enum ImageSize {
    Small,
    Medium,
    Large,
}

impl Display for ImageSize {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            &ImageSize::Small => write!(f, "small"),
            &ImageSize::Medium => write!(f, "medium"),
            &ImageSize::Large => write!(f, "large"),
        }
    }
}

fn create_dimensions(original_width: u32, original_height: u32) -> [(u32, u32, ImageSize); 3] {
    let small_width = (original_width as f64 / 0.25).floor() as u32;
    let small_height = (original_height as f64 / 0.25).floor() as u32;

    let medium_width = (original_width as f64 / 0.5).floor() as u32;
    let medium_height = (original_height as f64 / 0.5).floor() as u32;

    let large_width = (original_width as f64 / 0.75).floor() as u32;
    let large_height = (original_height as f64 / 0.75).floor() as u32;

    [
        (small_width, small_height, ImageSize::Small),
        (medium_width, medium_height, ImageSize::Medium),
        (large_width, large_height, ImageSize::Large),
    ]
}
