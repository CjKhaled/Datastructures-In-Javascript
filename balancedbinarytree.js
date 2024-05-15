// Sorting algorithm taken from my recursive practice repository
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
const removeDuplicates = (array) => {
  return [...new Set(array)];
};

const removeValue = (array, value) => {
  return array.filter((element) => element !== value);
};

// visualizing the tree to help with debugging. Taken from the Odin project curriculum.
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.getRightChild() !== null) {
    prettyPrint(
      node.getRightChild(),
      `${prefix}${isLeft ? "│   " : "    "}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.getLeftChild() !== null) {
    prettyPrint(
      node.getLeftChild(),
      `${prefix}${isLeft ? "    " : "│   "}`,
      true
    );
  }
};

// a method for our driver script
const getRandomNumbers = (size) => {
  const numbers = [];
  for (let i = 0; i < size; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return numbers;
};

// another helper function for our deleteNode method
const minValue = (node) => {
  let minValue = node.getNodeData();
  // Everything to the left of the current node should be less than it
  while (node.getLeftChild() !== null) {
    minValue = node.getLeftChild().getNodeData();
    node = node.getLeftChild();
  }

  return minValue;
};

class Node {
  constructor(data) {
    this.leftChild = null;
    this.rightChild = null;
    this.data = data;
  }

  getNodeData() {
    return this.data;
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

// assuming array is not sorted and has duplicates
class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.rootNode = this.buildTree(this.array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const rootNode = new Node(array[mid]);

    rootNode.setLeftChild(this.buildTree(array, start, mid - 1));
    rootNode.setRightChild(this.buildTree(array, mid + 1, end));

    return rootNode;
  }

  insert(value, node = this.rootNode) {
    // not allowing duplicates
    if (value in this.array) {
      console.log("Can not add duplicate values.");
      return false;
    }

    // base case - adding a new leaf
    if (node == null) {
      node = new Node(value);
      this.array.push(value);
      return node;
    }

    if (node.getNodeData() > value) {
      node.setLeftChild(this.insert(value, node.getLeftChild()));
    } else if (node.getNodeData() < value) {
      node.setRightChild(this.insert(value, node.getRightChild()));
    }

    // reflecting the changes in our array
    this.array = removeValue(this.array, value);
    return node;
  }

  deleteItem(value, node = this.rootNode) {
    if (!this.array.includes(value)) {
      console.log("Data not found in array.");
      return false;
    }
    // base case
    if (node === null) {
      return node;
    }

    // recursing to find the node to be deleted
    if (value < node.getNodeData()) {
      node.setLeftChild(this.deleteItem(value, node.getLeftChild()));
    } else if (value > node.getNodeData()) {
      node.setRightChild(this.deleteItem(value, node.getRightChild()));
    } else {
      // Leaf nodes will return null effectively deleting them
      // Single child nodes will return their chiildren, effectively deleting themselves
      if (node.getLeftChild() === null) {
        return node.getRightChild();
      } else if (node.getRightChild() === null) {
        return node.getLeftChild();
      }

      // For nodes with two children, we get the smallest in the right subtree and delete it
      node.data = minValue(node.getRightChild());
      node.setRightChild(
        this.deleteItem(node.getNodeData(), node.getRightChild())
      );
    }
    return node;
  }

  find(value, node = this.rootNode) {
    // base case
    if (node === null) {
      return node;
    }

    if (node.getNodeData() === value) {
      return node;
    }

    // Recurse through the tree to find the value
    let foundNode = this.find(value, node.getLeftChild());
    if (foundNode === null) {
      foundNode = this.find(value, node.getRightChild());
    }

    // return the found node when complete - null means we couldn't find it.
    return foundNode;
  }

  levelOrder(node = this.rootNode, callback = [], queue = [this.rootNode]) {
    // base case
    if (node === null) {
      return node;
    }

    if (queue.length === 0) {
      return null;
    }

    queue.shift();

    //   if a callback isn't passed, we will just push values into the array
    if (typeof callback === "function") {
      callback(node.getNodeData());
    } else {
      callback.push(node.getNodeData());
    }
    // add children to the queue
    if (node.getLeftChild() !== null) {
      queue.push(node.getLeftChild());
    }

    if (node.getRightChild() !== null) {
      queue.push(node.getRightChild());
    }

    // then dequeue
    this.levelOrder(queue[0], callback, queue);

    // returning array if function isn't provided
    if (typeof callback !== "function") {
      return callback;
    }
  }

  preOrder(node = this.rootNode, callback = []) {
    // base case
    if (node === null) {
      return node;
    }
    // with preOrder, we first access a nodes data
    if (typeof callback === "function") {
      callback(node.getNodeData());
    } else {
      callback.push(node.getNodeData());
    }

    // Then we travel left
    this.preOrder(node.getLeftChild(), callback);
    // Then we travel right
    this.preOrder(node.getRightChild(), callback);

    // returning array if function isn't provided
    if (typeof callback !== "function") {
      return callback;
    }
  }

  inOrder(node = this.rootNode, callback = []) {
    // base case
    if (node === null) {
      return node;
    }

    // with inOrder, the first option is to go left
    this.inOrder(node.getLeftChild(), callback);

    // Then we access a nodes data
    if (typeof callback === "function") {
      callback(node.getNodeData());
    } else {
      callback.push(node.getNodeData());
    }

    // then we go right
    this.inOrder(node.getRightChild(), callback);

    // returning array if function isn't provided
    if (typeof callback !== "function") {
      return callback;
    }
  }

  postOrder(node = this.rootNode, callback = []) {
    // base case
    if (node === null) {
      return node;
    }

    // in postOrder traversal, we go to the left child first
    this.postOrder(node.getLeftChild(), callback);

    // then we go to the right child
    this.postOrder(node.getRightChild(), callback);

    // finally we access the data of the node
    if (typeof callback === "function") {
      callback(node.getNodeData());
    } else {
      callback.push(node.getNodeData());
    }

    // returning array if function isn't provided
    if (typeof callback !== "function") {
      return callback;
    }
  }

  height(node = this.rootNode) {
    // The height of a node is the number of edges in the longest path
    // From the node to a leaf node

    // base case - we need to return -1 since we add one in later call
    if (node === null) {
      return -1;
    }

    // To find the height, we need to get the height of the left subtree
    let leftSubtreeHeight = this.height(node.getLeftChild());

    // And the right
    let rightSubtreeHeight = this.height(node.getRightChild());

    // Then get the highest value and add one to it
    return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
  }

  depth(data, node = this.rootNode, depth = 0) {
    // The depth of a node is the number of edges in the path from
    // the root node to that node

    // base case
    if (node === null) {
      return node;
    }

    if (node.getNodeData() === depth) {
      return node;
    }

    // if the data is greater than the current node, go right to find it
    if (data > node.getNodeData()) {
      return this.depth(data, node.getLeftChild(), depth + 1);
    } else {
      return this.depth(data, node.getLeftChild(), depth + 1);
    }
  }

  isBalanced(node = this.rootNode) {
    // a tree is balanced if the difference in height between the left/right
    // subtrees is no more than 1

    // base case
    if (node === null) {
      return node;
    }

    // getting left and right subtree height
    // we add one since we start counting from the roots children
    let leftSubtreeHeight = this.height(node.getLeftChild()) + 1;
    let rightSubtreeHeight = this.height(node.getRightChild()) + 1;

    // finally we check the height difference
    if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1) {
      return true;
    } else return false;
  }

  rebalance(node = this.rootNode) {
    if (this.isBalanced(node)) {
      console.log("Tree is already balanced!");
      return false;
    }
    // first, we need a new sorted array from the given bst
    // we use the inOrder function as it saves us from sorting
    const newArray = this.inOrder(node);

    // then we provide it to our buildTree method, which should give us a balanced tree
    const rootNode = this.buildTree(newArray);
    if (!this.isBalanced(node)) {
      this.rootNode = rootNode;
    }
    return rootNode;
  }
}

// Driver script to test out functionality
const numbers = getRandomNumbers(10); // an array of unsorted random numbers
const tree = new Tree(numbers); // our object should automatically sort the passed in array and create a tree
console.log(tree.isBalanced()); // the tree is balanced
console.log(prettyPrint(tree.rootNode)); // visualizer to confirm

// printing out in all orders
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

// unbalancing the tree
const newNumbers = getRandomNumbers(9);
newNumbers.forEach((number) => {
  tree.insert(number);
});
console.log(tree.isBalanced()); // confirming the tree is unbalanced
console.log(prettyPrint(tree.rootNode)); // updating visualizer

// balancing the tree and confirming it worked
tree.rebalance();
console.log(tree.isBalanced());
console.log(prettyPrint(tree.rootNode));

// printing out in all orders again
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
