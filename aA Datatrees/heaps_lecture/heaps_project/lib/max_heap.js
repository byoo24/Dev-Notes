class MaxHeap {
    constructor(){
        this.array = [null];
    }

    getParent(idx) {
        return Math.floor(idx / 2);
    }

    getLeftChild(idx) {
        return idx * 2;
    }

    getRightChild(idx) {
        return idx * 2 + 1;
    }

    insert(val) {
        this.array.push(val);
        this.siftUp(this.array.length - 1);
    }

    siftUp(idx){
        const { array } = this;
        let parentIdx = this.getParent(idx);

        while(idx > 1 && array[idx] > array[parentIdx]) {
            [array[idx], array[parentIdx]] = [array[parentIdx], array[idx]];
            idx = parentIdx;
            parentIdx = this.getParent(idx);
        }

        return array;
    }

    

    siftDown(idx) {
        const { array } = this;
        if(!array[idx]) return this;
        
        while(idx < array.length) {
            let leftIdx = this.getLeftChild(idx);
            let rightIdx = this.getRightChild(idx);
            let leftVal = array[leftIdx] ? array[leftIdx] : -Infinity;
            let rightVal = array[rightIdx] ? array[rightIdx] : -Infinity;

            if(array[idx] > leftVal && array[idx] > rightVal) return;
            
            if(leftVal < rightVal) {
                var swapIdx = rightIdx;
            } else {
                var swapIdx = leftIdx;
            }

            [array[idx], array[swapIdx]] = [array[swapIdx], array[idx]];
            idx = swapIdx;
        }
    }

    deleteMax() {
        const { array } = this;
        if(array.length === 2) return array.pop();
        if(array.length === 1) return null;

        const max = array[1];
        array[1] = array.pop();
        this.siftDown(1);

        return max;
    }
}

module.exports = {
    MaxHeap
};