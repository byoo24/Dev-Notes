// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const { TreeNode } = require('./tree_node.js');


function buildTree(preorder, inorder) {
    if (!preorder.length && !inorder.length) return null;

    let root = new TreeNode(preorder[0]);
    let rootIdx = inorder.indexOf(preorder[0]);

    let leftInorder = inorder.slice(0, rootIdx);
    let rightInorder = inorder.slice(rootIdx + 1);

    let leftPreorder = preorder.slice(1, leftInorder.length + 1);
    let rightPreorder = preorder.slice(leftPreorder.length + 1);
    // let leftPreorder = preorder.filter(val => leftInorder.indexOf(val) > -1);
    // let rightPreorder = preorder.filter(val => rightInorder.indexOf(val) > -1);

    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);

    return root;
}
