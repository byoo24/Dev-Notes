/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function buildTree(preorder, inorder) {
    if (preorder.length === 0) {
        return null;
    }

    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    const mid = inorder.indexOf(rootVal);

    const leftIn = inorder.slice(0, mid);
    // const leftPre = preorder.slice(1, mid);
    // const leftPre = preorder.slice(1, leftIn.length + 1);
    // const leftPre = preorder.filter(val => leftIn.includes(val));

    const rightIn = inorder.slice(mid + 1);
    // const rightPre = preorder.slice(mid + 1);
    // const rightPre = preorder.slice(leftPre.length + 1);
    // const rightPre = preorder.filter(val => rightIn.includes(val));

    root.left = buildTree(leftPre, leftIn);
    root.right = buildTree(rightPre , rightIn);

    return root;
}
