
import React, { useState, useEffect } from 'react';

const Square: React.FC<{ value: string | null; onClick: () => void }> = ({ value, onClick }) => (
  <button
    className="w-24 h-24 bg-slate-700 border-2 border-slate-600 text-5xl font-bold flex items-center justify-center rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-colors duration-200"
    onClick={onClick}
    aria-label={`Square ${value ? `with value ${value}` : 'empty'}`}
  >
    <span className={value === 'X' ? 'text-cyan-400' : 'text-amber-400'}>{value}</span>
  </button>
);

export const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (winner || board[i]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (board.every(Boolean)) {
      return 'Draw!';
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold mb-6 text-slate-300">{getStatus()}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, i) => (
          <Square key={i} value={board[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Reset Game
      </button>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
