function mergeSort(array) {
  // we return an array with one element, since it's sorted
  if (array.length === 1) {
    return array;
  }

  // we will split our arrays by halves
  // always assume left is lower if odd
  const midIndex = Math.floor(array.length / 2);
  const left = array.slice(0, midIndex);
  const right = array.slice(midIndex, array.length);

  // Sort both halves, and marge them together
  return merge(mergeSort(left), mergeSort(right));
}

function merge(leftArray, rightArray) {
  // we will merge the array by comparing the first element in each array, and putting the lower one in the result
  const result = [];
  let indexLeftArray = 0;
  let indexRightArray = 0;
  while (
    indexLeftArray < leftArray.length &&
    indexRightArray < rightArray.length
  ) {
    if (leftArray[indexLeftArray] < rightArray[indexRightArray]) {
      result.push(leftArray[indexLeftArray]);
      indexLeftArray++;
    } else {
      result.push(rightArray[indexRightArray]);
      indexRightArray++;
    }
  }

  // edge cases
  while (indexLeftArray < leftArray.length) {
    result.push(leftArray[indexLeftArray]);
    indexLeftArray++;
  }

  while (indexRightArray < rightArray.length) {
    result.push(rightArray[indexRightArray]);
    indexRightArray++;
  }

  return result;
}

// removing potential duplicates as they break our tree
function removeDuplicates(array) {
    return [...new Set(array)];
}

class Node {
  constructor(data) {
    this.leftChild = null;
    this.rightChild = null;
    this.data = data;
  }

  setLeftChild(node) {
    this.leftChild = node;
  }

  setRightChild(node) {
    this.rightChild = node;
  }

  getLeftChild() {
    return this.leftChild;
  }

  getRightChild() {
    return this.rightChild;
  }
}

// assuming array is not sorted
class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
  }

  buildTree(start = 0, end = this.array.length - 1) {
    if (start > end) return null;
    const mid = (start + end) / 2;
    const rootNode = new Node(this.array[mid]);

    rootNode.setLeftChild(this.buildTree(start, mid - 1));
    rootNode.setRightChild(this.buildTree(mid + 1, end));

    return rootNode;
  }
}

const test = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(test.buildTree());
