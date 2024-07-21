export function durationStr(
    time,
) {
    return `${Math.floor(time / 60)} hr ${Math.floor(time % 60)} min`
}

export function ayncSleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}