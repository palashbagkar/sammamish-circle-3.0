import { COMMUNITY_EVENTS, CommunityEvent } from '@/config/events';

/**
 * Returns the current month-long event whose date range contains `now`,
 * or null if no month-long event is active.
 */
export function getActiveMonth(now: Date = new Date()): CommunityEvent | null {
    const today = stripTime(now);

    return (
        COMMUNITY_EVENTS.find(
            (e) =>
                e.type === 'month-long' &&
                new Date(e.startDate + 'T00:00:00') <= today &&
                new Date(e.endDate + 'T00:00:00') >= today
        ) ?? null
    );
}

/**
 * Returns the next `count` upcoming events (single-day or multi-day)
 * whose endDate is >= today, sorted ascending by startDate.
 * Month-long awareness events are excluded to keep the list actionable.
 */
export function getUpcomingEvents(
    now: Date = new Date(),
    count: number = 7
): CommunityEvent[] {
    const today = stripTime(now);

    return COMMUNITY_EVENTS
        .filter((e) => {
            // Exclude month-long awareness events — those go in the activeMonth slot
            if (e.type === 'month-long') return false;
            // Keep events that haven't fully passed
            return new Date(e.endDate + 'T00:00:00') >= today;
        })
        .sort(
            (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        .slice(0, count);
}

/** Strip hours/minutes/seconds so comparisons are date-only. */
function stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
