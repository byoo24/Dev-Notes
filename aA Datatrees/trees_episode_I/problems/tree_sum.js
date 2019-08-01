const BST = require('../binary_tree/bst');

// Write a function that accepts the root of a tree as an arg.
// The function should return the total sum of all node values in the tree.

function treeSum(root) {
    // TODO :)
}

const tree = new BST();
tree.insertRecur(10);
tree.insertRecur(5);
tree.insertRecur(15);
tree.insertRecur(3);
tree.insertRecur(7);
tree.insertRecur(17);
tree.insertRecur(16);

//                  10
//                 /  \
//                5   15
//               / \    \
//              3   7    17
//                      /
//                     16

console.log(treeSum(tree.root));    // 73
