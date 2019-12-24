function maxValue(node, visited=new Set()) {
    if(visited.has(node.val)) return node.val;

    visited.add(node.val);
    const values = node.neighbors.map(neighbor => maxValue(neighbor, visited));
    
    return Math.max(node.val, ...values);
}

module.exports = {
    maxValue
};