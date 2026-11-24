import {assertValidDate, formatLocalDateTime} from './date-time-format.js';

export class LocalDateTime {
    #date;

    constructor(date) {
        assertValidDate(date);
        this.#date = new Date(date.getTime());
        Object.freeze(this);
    }

    toJSON() {
        return formatLocalDateTime(this.#date);
    }

    toString() {
        return this.toJSON();
    }
}
