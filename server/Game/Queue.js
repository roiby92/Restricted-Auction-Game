class Queue {
    constructor() {
        this.collection = [];
    }

    enqueue = function (element) {
        this.collection.push(element);
    };

    dequeue = function () {
        return this.collection.shift();
    };

    peek = function () {
        return this.collection[0];
    };

    size = function () {
        return this.collection.length;
    };

    isEmpty = function () {
        return (this.collection.length === 0);
    };

    print = function () {
        console.log(this.collection);
    };
}

module.exports = Queue;