const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type Player = "X" | "O";

export interface GameState {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | "draw" | null;
  winLine: number[] | null;
  scores: { X: number; O: number; draw: number };
}

export function createGameState(): GameState {
  return {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    winLine: null,
    scores: { X: 0, O: 0, draw: 0 },
  };
}

export function makeMove(state: GameState, index: number): GameState {
  if (state.board[index] || state.winner) {
    return state;
  }

  const board = [...state.board];
  board[index] = state.currentPlayer;

  const result = checkWin(board);

  if (result) {
    const scores = { ...state.scores };

    if (result.winner === "draw") {
      scores.draw++;
    } else {
      scores[result.winner]++;
    }

    return {
      ...state,
      board,
      winner: result.winner,
      winLine: result.winLine,
      scores,
    };
  }

  return {
    ...state,
    board,
    currentPlayer: state.currentPlayer === "X" ? "O" : "X",
  };
}

export function resetBoard(state: GameState): GameState {
  return {
    ...state,
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    winLine: null,
  };
}

function checkWin(board: (Player | null)[]): { winner: Player | "draw"; winLine: number[] } | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winLine: pattern };
    }
  }

  if (board.every((cell) => cell !== null)) {
    return { winner: "draw", winLine: [] };
  }

  return null;
}
