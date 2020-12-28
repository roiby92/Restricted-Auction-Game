class Queue {
    constructor() {
        this.queue = [];
    };

    enqueue = (element) => {
        this.queue.push(element);
    };

    dequeue = () => {
        return this.queue.shift();
    };

    peek = () => {
        return this.queue[0];
    };

    size = () => {
        return this.queue.length;
    };

    isEmpty = () => {
        return (this.queue.length === 0);
    };

    print = () => {
        console.log(this.queue);
    };
};

module.exports = Queue;