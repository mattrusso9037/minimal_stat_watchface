export class AbstractMetric {
    constructor() {
        if (this.constructor === AbstractMetric) {
            throw new Error('Abstract classes can\'t be instantiated.');
        }
    }

    onStart() {
        throw new Error('onStart must be implemented.');
    }

    onStop() {
        throw new Error('onStop must be implemented.');
    }
}