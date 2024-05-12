class LinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
    this.length = 0;
  }

  append(data) {
    if (this.length === 0) {
      this.headNode = new Node(data);
    } else {
      if (this.tailNode !== null) {
        const prevNode = this.tailNode;
        const newNode = new Node(data);
        prevNode.setNextNode(newNode);
        this.tailNode = newNode;
      } else {
        this.tailNode = new Node(data);
        this.headNode.setNextNode(this.tailNode);
      }
    }

    this.length++;
  }

  prepend(data) {
    if (this.length === 0) {
      this.headNode = new Node(data);
    } else {
      const newNode = new Node(data);
      newNode.setNextNode(this.headNode);
      this.headNode = newNode;
    }

    this.length++;
  }

  size() {
    console.log(this.length);
    return this.length
  }

  head() {
    console.log(this.headNode);
  }

  tail() {
    console.log(this.tailNode);
  }

  at(index) {
    let currentNode = this.headNode;
    let found = false;
    for (let i = 0; i < this.length; i++) {
      if (i == index) {
        found = true;
        console.log(currentNode);
      }

      currentNode = currentNode.getNextNode();
    }

    if (!found) console.log("Node not found.");
  }

  pop() {
    if (this.length === 0) {
      console.log("No nodes to remove.");
      return;
    }

    if (this.length === 1) {
      this.headNode = null;
      this.tailNode = null;
      this.length = 0;
      return;
    }

    let currentNode = this.headNode;
    let prevNode = null;
    // Traverse until the second last node
    while (currentNode.getNextNode() !== null) {
      prevNode = currentNode;
      currentNode = currentNode.getNextNode();
    }

    if (prevNode !== null) {
      prevNode.setNextNode(null);
      this.tailNode = prevNode;
    }

    this.length--;
  }

  contains(data) {
    if (this.length === 0) {
        console.log('No elements in array.')
    }
    let found = false;
    let currentNode = this.headNode

    for (let i = 0; i < this.length; i++) {
        if (data == currentNode.getNodeData()) {
            console.log('true')
            found = true;
            return true;
        } else {
            currentNode = currentNode.getNextNode();
        }
    }

    if (!found) {
        console.log('false')
        return false;
    }
  }

  find(data) {
    let found = false;
    let currentNode = this.headNode

    for (let i = 0; i < this.length; i++) {
        if (data == currentNode.getNodeData()) {
            console.log(i)
            found = true;
            return i;
        } else {
            currentNode = currentNode.getNextNode();
        }
    }

    if (!found) {
        console.log('Node not found.')
        return null;
    }
  }

  toString() {
    let resultString = "";
    let currentNode = this.headNode;
    for (let i = 0; i < this.length; i++) {
      resultString += `( ${currentNode.getNodeData()} ) -> `;
      currentNode = currentNode.getNextNode();

      if (currentNode === null) {
        resultString += "null";
      }
    }

    console.log(resultString);
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.nextNode = null;
  }

  setNextNode(node) {
    this.nextNode = node;
  }

  getNextNode() {
    return this.nextNode;
  }

  getNodeData() {
    return this.data;
  }
}

let test = new LinkedList();
test.append(4);
test.append(5);
test.append(6);
test.toString();
test.pop()
test.toString();
test.contains(8);
