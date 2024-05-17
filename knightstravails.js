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
    this.adjacencyList = this.createAdjacencyList()
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

  createAdjacencyList() {
    // the node objects will be our nodes, and the edges will be their potential moves
    const adjacencyList = new Map();

    for (const node of this.board) {
        adjacencyList.set(node.getCoords(), node.getMoves());
    }

    return adjacencyList;
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
    
  }
  
}

const board = new Board();
board.createAdjacencyList()
// console.log(board.knightMoves([3, 3], [0, 0]));




