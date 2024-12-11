export default class Car {
    #advanceNumber = 0;

    constructor(name) {
        this.name = name;
    }

    getName() { 
        return this.name;
    }

    getAdvanceNumber() {
        return this.#advanceNumber;
    }

    advance() {
        this.#advanceNumber++;
    }
}