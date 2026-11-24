import {assertValidDate, formatOffsetDateTime} from './date-time-format.js';

export class OffsetDateTime {
    #date;

    constructor(date) {
        assertValidDate(date);
        this.#date = new Date(date.getTime());
        Object.freeze(this);
    }

    toJSON() {
        return formatOffsetDateTime(this.#date);
    }

    toString() {
        return this.toJSON();
    }
}
