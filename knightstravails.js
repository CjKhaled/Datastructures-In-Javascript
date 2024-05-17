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
  }

  // creating the 8x8 board our knight can travel
  createBoard() {
    const newBoard = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        newBoard.push(new Node(i, j));
      }
    }

    return newBoard;
  }

  getCellFromCoordinates(coords) {
    let boardCell = null;
    for (const cell of this.board) {
      if (
        cell.getCoords()[0] === coords[0] &&
        cell.getCoords()[1] === coords[1]
      ) {
        boardCell = cell;
        break;
      }
    }

    return boardCell;
  }

  knightMoves(start, end) {
    const startNode = this.getCellFromCoordinates(start);

    // we will use a set to make sure we don't visit a node more than once
    const visited = new Set();

    visited.add(JSON.stringify(start))

    const queue = [startNode];
    
    // using BFS to find the end node iteratively
    while (queue.length > 0) {
        debugger
        const currentNode = queue.shift();
        console.log(currentNode)
        

        // iterating over the available nodes to travel to and adding them to the queue
        const availableMoves = currentNode.getMoves();
        for (const move of availableMoves) {
            // if we find the end node in the array of available moves, we end our iteration here
            if (move[0] === end[0] && move[1] === end[1]) {
                console.log('found it');
                queue = []
                break;
            }
            const nextNode = this.getCellFromCoordinates(move);
            
            // making sure to mark this node as visited
            // had to use stringify to make the set work
            const stringMove = JSON.stringify(move);
            if (!visited.has(stringMove)) {
                visited.add(stringMove);
                queue.push(nextNode);
            }
        }

        console.log(visited)
    }
  }
  
}

const board = new Board();
console.log(board.knightMoves([3, 3], [0, 0]));




