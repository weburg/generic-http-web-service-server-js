import {LocalDateTime} from '#src/weburg/ghowst/local-date-time.js';
import {OffsetDateTime} from '#src/weburg/ghowst/offset-date-time.js';
import {Bus} from '#src/example/domain/bus.js';

export class Omnibus extends Bus {
    #birthtime = null;
    #sendtime = null;

    constructor() {
        super('omni-58-87');
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