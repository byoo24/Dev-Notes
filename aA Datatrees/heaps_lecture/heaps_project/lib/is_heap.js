// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx=1) {

    while(idx < array.length) {
        let current = array[idx];
        let leftChild = array[idx * 2] || -Infinity;
        let rightChild = array[idx * 2 + 1] || -Infinity;

        if(current < leftChild || current < rightChild) {
            return false;
        }
        idx++;
    }

    return true;
}


module.exports = {
    isMaxHeap
};




// Leet Code #215

// var findKthLargest = function (nums, k) {
//     const maxHeap = createMaxHeap(nums);
//     console.log(maxHeap);
//     let max = maxHeap[1];
//     for (let i = 0; i < k; i++) {
//         max = deleteMax(maxHeap);
//     }
//     return max;
// };


// var createMaxHeap = function (nums) {
//     const heap = [null];

//     nums.forEach((num) => {
//         heap.push(num);
//         siftUp(heap, heap.length - 1);
//     });

//     return heap;
// }


// var siftUp = function (array, idx) {
//     let parentIdx = Math.floor(idx / 2);

//     while (idx > 1 && array[idx] > array[parentIdx]) {
//         [array[idx], array[parentIdx]] = [array[parentIdx], array[idx]];
//         idx = parentIdx;
//         parentIdx = Math.floor(idx / 2);
//     }

//     return array;
// }

// var siftDown = function (array, idx) {

//     while (idx < array.length) {
//         let leftIdx = idx * 2;
//         let rightIdx = idx * 2 + 1;
//         let leftChild = array[leftIdx] ? array[leftIdx] : -Infinity;
//         let rightChild = array[rightIdx] ? array[rightIdx] : -Infinity;

//         if (array[idx] > leftChild && array[idx] > rightChild) return;

//         if (leftChild > rightChild) {
//             var swapIdx = leftIdx;
//         } else {
//             var swapIdx = rightIdx;
//         }

//         [array[idx], array[swapIdx]] = [array[swapIdx], array[idx]];
//         idx = swapIdx;
//     }
// }

// var deleteMax = function (array) {
//     if (array.length === 2) return array.pop();
//     if (array.length <= 1) return null;

//     let deleted = array[1];
//     array[1] = array.pop();
//     siftDown(array, 1);

//     return deleted;
// }