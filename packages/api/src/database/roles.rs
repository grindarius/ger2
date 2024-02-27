use std::collections::HashMap;

use once_cell::sync::Lazy;

pub static FORUM_ROLES: Lazy<[&'static str; 5]> =
    Lazy::new(|| ["owner", "admin", "moderator", "member", "guest"]);

pub static ROLE_PERMISSIONS: Lazy<HashMap<&'static str, Vec<&'static str>>> = Lazy::new(|| {
    let mut role_permissions: HashMap<&'static str, Vec<&'static str>> = HashMap::new();

    let guest_permissions: Vec<&'static str> = vec![
        "forum:read-timeline",
        "forum:read-post",
        "forum:update-post-interaction",
        "forum:create-post-comment",
        "forum:upvote-comment",
        "forum:downvote-comment",
        "forum:create-post",
    ];
    let member_permissions: Vec<&'static str> = vec![];

    role_permissions.insert("guest", guest_permissions);

    role_permissions
});
