export class Queue {
    constructor(optElements) {
        if (optElements instanceof Array) {
            this.items = optElements;
            this.length = optElements.length;
        }
        else {
            this.items = [];
            this.length = 0;
        }
    }

    enqueue (item) {
        this.length += 1;
        return this.items.push(item);
    }

    dequeue() {
        if(this.length > 0) {
            this.length -= 1;
          }
          return this.items.shift();
    }

    recent() {
        if(this.length > 0) {
            return this.items[this.length - 1];
        }
        return undefined;
    }

};

export class Stack {
    constructor() {
        this.items = [];
        this.length = this.items.length;
    }

    push(item) {
        this.length += 1;
        return this.items.push(item);
    }

    pop() {
        if(this.length > 0) {
            this.length -= 1;
        }
        return this.items.pop();
    }

    top() {
        if(this.length > 0) {
            return this.items[this.length -1];
        }
        return undefined;
    }
}
