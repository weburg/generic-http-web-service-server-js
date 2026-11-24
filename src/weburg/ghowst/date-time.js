function assertValidDate(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        throw new TypeError('Expected a valid Date');
    }
}

function pad(value, length = 2) {
    return String(value).padStart(length, '0');
}

function formatDateTime(date, getters, offset) {
    assertValidDate(date);

    const [year, month, day, hours, minutes, seconds, milliseconds] =
        getters.map((getter) => date[getter]());

    return `${pad(year, 4)}-${pad(month + 1)}-${pad(day)}`
        + `T${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        + `.${pad(milliseconds, 3)}000${offset}`;
}

export function formatLocalDateTime(date) {
    return formatDateTime(date, [
        'getFullYear',
        'getMonth',
        'getDate',
        'getHours',
        'getMinutes',
        'getSeconds',
        'getMilliseconds'
    ], '');
}

export function formatOffsetDateTime(date) {
    return formatDateTime(date, [
        'getUTCFullYear',
        'getUTCMonth',
        'getUTCDate',
        'getUTCHours',
        'getUTCMinutes',
        'getUTCSeconds',
        'getUTCMilliseconds'
    ], '+00:00');
}

function withDateTimeSerialization(date, format) {
    assertValidDate(date);
    const wrappedDate = new Date(date.getTime());
    Object.defineProperty(wrappedDate, 'toJSON', {
        configurable: true,
        value() {
            return format(wrappedDate);
        }
    });
    return wrappedDate;
}

export function asLocalDateTime(date) {
    return withDateTimeSerialization(date, formatLocalDateTime);
}

export function asOffsetDateTime(date) {
    return withDateTimeSerialization(date, formatOffsetDateTime);
}
