const BST = require('../binary_tree/bst');
console.log(BST);

// Write a function that accepts the root of a tree as an arg.
// The function should return the maximum sum of a path through the tree.
// For this problem, a path must begin at the root and end at a leaf.

function maxPathSum(root) {
    if (root === null) return 0;

    const lSum = maxPathSum(root.left);
    const rSum = maxPathSum(root.right);
    return root.val + Math.max(lSum, rSum);
}

const tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(17);
tree.insert(16);

//                  10
//                 /  \
//                5   15
//               / \    \
//              3   7    17
//                      /
//                     16

console.log(maxPathSum(tree.root));    // 58
