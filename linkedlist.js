class LinkedList {
    constructor() {
        this.headNode = null;
        this.tailNode = null;
        this.length = 0;
    }

    append(data) {
        if (this.length === 0) {
            this.tailNode = new Node(data);
        } else {
            if (this.tailNode !== null) {
                const prevNode = this.tailNode;
                const newNode = new Node(data);
                prevNode.setNextNode(newNode);
                this.tailNode = newNode;
            } else {
                this.tailNode = new Node(data);
            }
        }

        length++
    }

    prepend(data) {
        if (this.length === 0) {
            this.headNode = new Node(data);
        } else {
            const newNode = new Node(data);
            newNode.setNextNode(this.headNode)
            this.headNode = newNode
        }

        length++
    }
}


class Node {
    constructor(data) {
        this.data = data;
        this.nextNode = null;
    }

    setNextNode(node) {
        this.nextNode = node
    }
}