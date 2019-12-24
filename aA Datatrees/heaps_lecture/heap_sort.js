function heapSort(array) {
    // heapify the tree from the bottom up
    // into a MaxHeap
    for (let i = array.length - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }

    // until the heap is empty, continue to "delete max"
    for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
        // swap the root of the heap with the last element of the heap,
        // this effectively shrinks the heap by one and grows the sorted array by one
        swap(array, endOfHeap, 0);

        // sift down the new root, but not past the end of the heap
        heapify(array, endOfHeap, 0);
    }

    return array;
}


console.log(heapSort([54,23,12,87,54,3,2,434,654,34,2,1,765,87,97,68,986,432]));


// sift-down the node at index i until max heap property is restored
// n represents the size of the heap
function heapify(array, n, i) {
    let leftIdx = 2 * i + 1;
    let rightIdx = 2 * i + 2;

    let leftVal = array[leftIdx];
    let rightVal = array[rightIdx];

    if (leftIdx >= n) leftVal = -Infinity;
    if (rightIdx >= n) rightVal = -Infinity;

    if (array[i] > leftVal && array[i] > rightVal) return;

    let swapIdx;
    if (leftVal < rightVal) {
        swapIdx = rightIdx;
    } else {
        swapIdx = leftIdx;
    }

    swap(array, i, swapIdx);
    heapify(array, n, swapIdx);
}


function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}