class Queue {
    constructor() {
        this.queue = [];
    };
    enqueue = (element) => this.queue.push(element);
    dequeue = () => this.queue.shift();
    peek = () => this.queue[0];
    size = () => this.queue.length;
    isEmpty = () => this.queue.length === 0;
    print = () => console.log(this.queue);
};
module.exports = Queue;