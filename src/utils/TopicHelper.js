export function ToggleVisibility(topics, visibility) {
    topics.forEach(topic => {
        topic.is_visible = visibility;
    });
    return topics
}