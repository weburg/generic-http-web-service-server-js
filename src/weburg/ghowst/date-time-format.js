export function assertValidDate(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        throw new TypeError('Expected a valid Date');
    }
}

function pad(value, length = 2) {
    return String(value).padStart(length, '0');
}

function formatDateTime(date, useUtc, offset) {
    const get = (localMethod, utcMethod) => date[`get${useUtc ? utcMethod : localMethod}`]();
    const year = get('FullYear', 'UTCFullYear');
    const month = get('Month', 'UTCMonth');
    const day = get('Date', 'UTCDate');
    const hours = get('Hours', 'UTCHours');
    const minutes = get('Minutes', 'UTCMinutes');
    const seconds = get('Seconds', 'UTCSeconds');
    const milliseconds = get('Milliseconds', 'UTCMilliseconds');

    return `${pad(year, 4)}-${pad(month + 1)}-${pad(day)}`
        + `T${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        + `.${pad(milliseconds, 3)}000${offset}`;
}

export function formatLocalDateTime(date) {
    assertValidDate(date);
    return formatDateTime(date, false, '');
}

export function formatOffsetDateTime(date) {
    assertValidDate(date);
    return formatDateTime(date, true, '+00:00');
}
