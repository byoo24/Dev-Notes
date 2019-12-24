class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}


class BST {
   constructor() {
       this.root = null;
   }

   insert(val, root=this.root) {
       const newNode = new TreeNode(val);
       if(!this.root) {
           this.root = newNode;
           return;
       }

       // go left
       if(val < root.val) {
            if(!root.left) {
                root.left = newNode;
            } else {
                this.insert(val, root.left);
            }
       } else {
           if(!root.right) {
               root.right = newNode;
           } else {
               this.insert(val, root.right);
           }
       }
   }

   searchRecur(val, root=this.root) {
        if(!root) return false;

        if(root.val === val) return true;

        if(val < root.val) {
            return this.searchRecur(val, root.left);
        } else {
            return this.searchRecur(val, root.right);
        }
   }

   searchIter(val) {
       if(!this.root) return false;
       
       const queue = [this.root];

        while(queue.length) {
            const node = queue.shift();

            if(node.val === val) return true;
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        return false;
   }
}

module.exports = {
    TreeNode,
    BST
};