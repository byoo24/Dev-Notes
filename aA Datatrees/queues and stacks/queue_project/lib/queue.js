// ============================================================================
// Implementation Exercise: Queue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Queue and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    enqueue(val) {
        const newNode = new Node(val);

        if (this.back) {
            let last = this.back;
            last.next = newNode;
        }

        this.back = newNode;

        if(this.length === 0) {
            this.front = newNode;
        }
        
        this.length++;
        return this.length;
    }

    dequeue() {
        if(this.length <= 0) return null;

        const dequeued = this.front;

        this.front = this.front.next;

        if(this.length === 1) {
            this.back = null;
        }

        this.length--;
        return dequeued.value;
    }

    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.Queue = Queue;