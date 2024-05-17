// creating the 8x8 board our knight can travel
const createBoard = () => {
  const newBoard = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      newBoard.push([i, j]);
    }
  }

  return newBoard;
};

class Node {
  constructor(row, col) {
    this.currentCoords = [row, col];
  }
}

const findPossibleMoves = (row, col) => {
  // the knight has at most 8 possible moves it can do
  // it can either move two steps forward and one step to the side
  // or vice cersa
  // so we will keep an array that
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

const knightMoves = (start, end) => {};

const board = createBoard();
console.log(findPossibleMoves(0, 0))
console.log(board[0]);
