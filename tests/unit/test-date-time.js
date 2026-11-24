import assert from 'node:assert';
import test from 'node:test';
import {LocalDateTime} from '#src/weburg/ghowst/local-date-time.js';
import {OffsetDateTime} from '#src/weburg/ghowst/offset-date-time.js';

test('LocalDateTime serializes using local date and time fields', () => {
    const dateTime = new LocalDateTime(new Date(2016, 4, 11, 12, 0, 0, 0));

    assert.equal(JSON.stringify(dateTime), '"2016-05-11T12:00:00.000000"');
});

test('OffsetDateTime serializes in UTC with an explicit offset', () => {
    const dateTime = new OffsetDateTime(new Date('2026-11-23T20:40:37.993Z'));

    assert.equal(JSON.stringify(dateTime), '"2026-11-23T20:40:37.993000+00:00"');
});

test('date-time types serialize automatically when nested in arbitrary objects', () => {
    const value = {
        nested: {
            local: new LocalDateTime(new Date(2016, 4, 11, 12, 0, 0, 0)),
            offset: new OffsetDateTime(new Date('2026-11-23T20:40:37.993Z'))
        }
    };

    assert.equal(JSON.stringify(value),
        '{"nested":{"local":"2016-05-11T12:00:00.000000","offset":"2026-11-23T20:40:37.993000+00:00"}}');
});

test('date-time types reject values other than valid Date objects', () => {
    assert.throws(() => new LocalDateTime(new Date(Number.NaN)), TypeError);
    assert.throws(() => new OffsetDateTime(null), TypeError);
});
