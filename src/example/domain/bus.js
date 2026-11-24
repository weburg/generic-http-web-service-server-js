export class Bus {
    #callsign;

    color = 'yellow';

    constructor(callsign) {
        this.#callsign = callsign;
    }

    get callsign() {
        return this.#callsign;
    }
}
