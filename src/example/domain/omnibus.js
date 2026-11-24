import {asLocalDateTime, asOffsetDateTime} from '#src/weburg/ghowst/date-time.js';

export class Omnibus {
    constructor() {
        this.birthtime = null;
        this.sendtime = null;
        this.toppings = [];
        this.sides = [];
        this.onFire = false;
        this.document = null;
        this.pairing = [];
    }

    toJSON() {
        return Object.fromEntries(Object.entries(this).map(([field, value]) => {
            if (value === null) {
                return [field, value];
            }

            if (field === 'birthtime') {
                return [field, asLocalDateTime(value)];
            }
            if (field === 'sendtime') {
                return [field, asOffsetDateTime(value)];
            }
            return [field, value];
        }));
    }
}