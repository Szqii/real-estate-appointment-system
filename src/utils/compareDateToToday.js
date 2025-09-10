function compareDateToToday(dateString) {
    const now = new Date();
    const targetDate = new Date(dateString);

    const diffMs = targetDate - now;

    if (diffMs <= 0) {
        return {status: "Completed", left: null};
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    let left = "";

    if (diffDays > 0) {
        left = `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
        left = `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    } else {
        left = `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    }

    return {status: "Upcoming", left};
}

export default compareDateToToday;
