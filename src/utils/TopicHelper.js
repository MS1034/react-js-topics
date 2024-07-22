export function ToggleVisibility(topics, visibility) {
    if (topics.length > 0)
        topics.forEach(topic => {
            topic.is_visible = visibility;
        });
    return topics
}