// ============================================================================
// Implementation Exercise: Stack
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Stack and all of its methods below!
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

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);
        
        let next = this.top;
        this.top = newNode;
        newNode.next = next;
        
        if (this.length === 0) {
            this.bottom = newNode;
        }

        this.length++;
        return this.length;
    }

    pop() {
        if(this.length === 0) return null;

        let popped = this.top;
        this.top = this.top.next;

        if(this.length === 1) {
            this.bottom = null;
        }

        this.length--;
        return popped.value;
    }

    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.Stack = Stack;
