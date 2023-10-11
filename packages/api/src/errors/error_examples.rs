use crate::macros::example_error_response;

example_error_response!(
    BAD_REQUEST,
    BAD_REQUEST,
    "property \"x\" cannot be an empty string"
);
example_error_response!(NOT_FOUND, NOT_FOUND, "\"x\" not found");
example_error_response!(
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR,
    "our server got fried"
);
example_error_response!(PROGRAM_DATA_NOT_FOUND, NOT_FOUND, "program data not found");
