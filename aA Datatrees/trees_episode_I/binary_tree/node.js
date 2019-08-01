class Node { // Binary Node
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

module.exports = Node;

// for an arbitrary number of children
// class Node {
//     constructor(val) {
//         this.val = val;
//         this.children = [];
//     }
// }
