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
                this.headNode.setNextNode(this.tailNode)
            }
        }

        this.length++
    }

    prepend(data) {
        if (this.length === 0) {
            this.headNode = new Node(data);
        } else {
            const newNode = new Node(data);
            newNode.setNextNode(this.headNode)
            this.headNode = newNode
        }

        this.length++
    }

    toString() {
        let resultString = ''
        let currentNode = this.headNode;
        for (let i = 0; i < this.length; i++) {
            resultString += `( ${currentNode.getNodeData()} ) -> `
            currentNode = currentNode.getNextNode();
            
            if (currentNode === null) {
                resultString += 'null'
            }
        }

        console.log(resultString)
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

    getNextNode() {
        return this.nextNode;
    }

    getNodeData() {
        return this.data
    }
}

let test = new LinkedList()
test.append(4)
test.append(5)
test.prepend(6)
test.toString()