const Node = require('./node');

class BST {
    constructor() {
        this.root = null;
    }

    insert(val, root=this.root) {
        // if the tree is empty
        if (this.root === null) {
            this.root = new Node(val);
            return;
        }

        // if the val is less than root.val
        if (val < root.val) {
            // go left
            if (root.left === null) { // if the left is empty, insert here!
                root.left = new Node(val);
            } else {                  // otherwise, insert into the left subtree
                this.insert(val, root.left);
            }
        } else { // otherwise it is greater or equal to, so
            // go right
            if (root.right === null) { // if the right is empty, insert here!
                root.right = new Node(val);
            } else {                   // otherwise, insert into the right subtree
                this.insert(val, root.right);
            }
        }
    }

    inOrderPrint(root=this.root) {
        if (root === null) return;

        this.inOrderPrint(root.left);
        console.log(root.val);
        this.inOrderPrint(root.right);
    }

    // BAD IN ORDER PRINT
    // base case is not general enough to capture nodes that have one child.
    // inOrderPrint(root=this.root) {
    //     if (root.left === null && root.right === null) {
    //         console.log(root.val);
    //         return;
    //     }
    //
    //     this.inOrderPrint(root.left);
    //     console.log(root.val);
    //     this.inOrderPrint(root.right);
    // }

    depthFirst() {
        if (this.root === null) return;

        const stack = [ this.root ]; // push, pop
        while (stack.length) {
            const node = stack.pop();
            console.log(node.val);
            if (node.right !== null) stack.push(node.right);
            if (node.left !== null)stack.push(node.left);
        }
    }

    breadthFirst() {
        if (this.root === null) return;

        const queue = [ this.root ]; // push, shift
        while (queue.length) {
            const node = queue.shift();
            console.log(node.val);
            if (node.left !== null)queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }

    depthFirstRecur(root=this.root) {
        if (root === null) return;

        console.log(root.val);
        this.depthFirstRecur(root.left);
        this.depthFirstRecur(root.right);
    }

    search(val, root=this.root) {
        if (root === null) return false;

        if (val < root.val) {
            return this.search(val, root.left);
        } else if (val > root.val) {
            return this.search(val, root.right);
        } else {
            return true;
        }
    }
}

const tree = new BST();
// tree.insert(10);
// tree.insert(5);
// tree.insert(15);
// tree.insert(3);
// tree.insert(7);
// tree.insert(13);
// tree.insert(17);

// console.log(tree.search(7)); // true
// console.log(tree.search(4)); // false
// console.log(tree.search(10)); // true

// tree.inOrderPrint();
// console.log('---')
// tree.depthFirst();

// tree.breadthFirst();


// console.log(tree);
// console.log(JSON.stringify(tree));

module.exports = BST;
