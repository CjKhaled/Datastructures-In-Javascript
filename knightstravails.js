const findPossibleMoves = (row, col) => {
  // the knight has at most 8 possible moves it can do
  // it can either move two steps forward and one step to the side
  // or vice versa in either direction
  const totalMoves = [
    [row - 2, col + 1],
    [row - 1, col + 2],
    [row - 2, col - 1],
    [row - 1, col - 2],
    [row + 1, col - 2],
    [row + 2, col - 1],
    [row + 1, col + 2],
    [row + 2, col + 1],
  ];

  const validMoves = [];

  for (const move of totalMoves) {
    if (move[0] > 8 || move[0] < 0) {
    } else if (move[1] > 8 || move[1] < 0) {
    } else {
      validMoves.push(move);
    }
  }

  return validMoves;
};

// We have a Node that we can use to traverse
class Node {
  constructor(row, col) {
    this.coords = [row, col];
    this.moves = findPossibleMoves(row, col);
  }

  getCoords() {
    return this.coords;
  }

  getMoves() {
    return this.moves;
  }
}

class Board {
  constructor() {
    this.board = this.createBoard();
    this.adjacencyList = this.createAdjacencyList();
  }

  // creating the 8x8 board our knight can travel
  createBoard() {
    const newBoard = [];
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        newBoard.push(new Node(i, j));
      }
    }

    return newBoard;
  }

  createAdjacencyList() {
    // the node objects will be our nodes, and the edges will be their potential moves
    const adjacencyList = new Map();

    for (const node of this.board) {
      // can't use arrays as keys
      adjacencyList.set(node.getCoords().toString(), node);
    }

    return adjacencyList;
  }

  getCellFromCoordinates(coords) {
    return this.adjacencyList.get(coords.toString());
  }

  knightMoves(start, end) {
    const startNode = this.getCellFromCoordinates(start);
    // we use a set to ensure we don't visit the same node twice
    const visited = new Set();
    visited.add(start.toString());
    const queue = [startNode];

    // we use a map to log the path we are taking for each node, starting with the start node
    const paths = new Map();
    paths.set(startNode.getCoords().toString(), [start]);

    while (queue.length > 0) {
      debugger;
      const currentNode = queue.shift();
      // keeping track of our current path
      const currentPath = paths.get(currentNode.getCoords().toString());

      // getting all possible moves and adding them to the queue
      const possibleMoves = currentNode.getMoves();

      for (const move of possibleMoves) {
        if (move[0] === end[0] && move[1] === end[1]) {
            // once we find the move, our path is complete
            // the path with the end parameter as the key is the correct path
          paths.set(move.toString(), currentPath.concat([move]));
          const correctPath = paths.get(end.toString());
          return `You made it in ${correctPath.length - 1} moves! Here is your path: ` + correctPath.join(' -> ')
        }
        // we will only enqueue if we haven't visited that node
        // using a string since arrays don't work in sets
        if (!visited.has(move.toString())) {
          queue.push(this.getCellFromCoordinates(move));
          visited.add(move.toString());
          // adding
          paths.set(move.toString(), currentPath.concat([move]));
        }
      }
    }
  }
}

const board = new Board();
console.log(board.knightMoves([0, 0], [3, 3]));
console.log(board.knightMoves([3, 3], [0, 0]));
console.log(board.knightMoves([3, 3], [4, 3]));
console.log(board.knightMoves([0, 0], [7, 7]));
