import assert from 'node:assert';
import test from 'node:test';
import {Omnibus} from '#src/example/domain/omnibus.js';
import {LocalDateTime} from '#src/weburg/ghowst/local-date-time.js';
import {OffsetDateTime} from '#src/weburg/ghowst/offset-date-time.js';

test('Omnibus setters wrap dates in their declared GHoWSt types', () => {
    const omnibus = new Omnibus();
    const birthtime = new Date(2016, 4, 11, 12, 0, 0, 0);
    const sendtime = new Date('2026-11-23T20:40:37.993Z');

    omnibus.birthtime = birthtime;
    omnibus.sendtime = sendtime;
    omnibus.customField = {value: 'preserved'};

    assert.ok(omnibus.birthtime instanceof LocalDateTime);
    assert.ok(omnibus.sendtime instanceof OffsetDateTime);
    assert.equal(Object.hasOwn(Omnibus.prototype, 'toJSON'), false);
    assert.deepEqual(JSON.parse(JSON.stringify(omnibus)), {
        birthtime: '2016-05-11T12:00:00.000000',
        sendtime: '2026-11-23T20:40:37.993000+00:00',
        toppings: [],
        sides: [],
        onFire: false,
        document: null,
        pairing: [],
        customField: {value: 'preserved'}
    });
});

test('Omnibus preserves null dates', () => {
    const omnibus = new Omnibus();
    assert.equal(JSON.parse(JSON.stringify(omnibus)).birthtime, null);
    assert.equal(JSON.parse(JSON.stringify(omnibus)).sendtime, null);
});

test('Omnibus setters accept already-wrapped values and reject invalid dates', () => {
    const omnibus = new Omnibus();
    const birthtime = new LocalDateTime(new Date(2016, 4, 11, 12, 0, 0, 0));
    const sendtime = new OffsetDateTime(new Date('2026-11-23T20:40:37.993Z'));

    omnibus.birthtime = birthtime;
    omnibus.sendtime = sendtime;

    assert.strictEqual(omnibus.birthtime, birthtime);
    assert.strictEqual(omnibus.sendtime, sendtime);
    assert.throws(() => {
        omnibus.birthtime = new Date(Number.NaN);
    }, TypeError);
    assert.throws(() => {
        omnibus.sendtime = '2026-11-23T20:40:37Z';
    }, TypeError);
});
