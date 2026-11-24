import {LocalDateTime, OffsetDateTime} from '#src/weburg/ghowst/date-time.js';

export class Omnibus {
    #birthtime = null;
    #sendtime = null;

    constructor() {
        Object.defineProperties(this, {
            birthtime: {
                enumerable: true,
                get: () => this.#birthtime,
                set: (value) => {
                    this.#birthtime = value === null || value instanceof LocalDateTime
                        ? value
                        : new LocalDateTime(value);
                }
            },
            sendtime: {
                enumerable: true,
                get: () => this.#sendtime,
                set: (value) => {
                    this.#sendtime = value === null || value instanceof OffsetDateTime
                        ? value
                        : new OffsetDateTime(value);
                }
            }
        });
        this.toppings = [];
        this.sides = [];
        this.onFire = false;
        this.document = null;
        this.pairing = [];
    }
}