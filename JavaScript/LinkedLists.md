# Linked List
A Linked List data structure represents a linear sequence of "vertices" (or "nodes"), and tracks three important properties.

| Property | Description |
| --- | --- |
| `head` | The first node in the list. |
| `tail` | The last node in the list. |
| `length` | THe number of nodes in the list; the list's length |


# Node instances track

| Property | Description |
| --- | --- |
| `value` | The actual value this node represents. |
| `next` | The next node in the list (relative to this node). |
| `previous` | The previous node in the list (relative to this node). |


# Depth-First Search

```javascript
function depthFirst(root) {
    let stack = [ root ];
    while (stack.length) {
        let node = stack.pop();
        console.log(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
}

function depthFirstRecur(root) {
    if (!root) return;
    console.log(root.val);
    depthFirstRecur(root.left);
    depthFirstRecur(root.right);
}

```