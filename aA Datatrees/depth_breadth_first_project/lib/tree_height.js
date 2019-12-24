function treeHeight(root) {
    if(!root) return -1;

    let left = treeHeight(root.left) + 1;
    let right = treeHeight(root.right) + 1;
    return Math.max(left, right);
}


module.exports = {
    treeHeight
};