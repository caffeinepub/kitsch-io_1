import React, { useState } from 'react';

type Cell = 'X' | 'O' | null;

function checkWinner(board: Cell[]): Cell | 'draw' | null {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(c => c !== null)) return 'draw';
  return null;
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Cell | 'draw' | null>(null);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = turn;
    const result = checkWinner(newBoard);
    setBoard(newBoard);
    setWinner(result);
    if (!result) setTurn(turn === 'X' ? 'O' : 'X');
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="font-display text-2xl text-primary">
        {winner
          ? winner === 'draw' ? "IT'S A DRAW!" : `PLAYER ${winner} WINS!`
          : `PLAYER ${turn}'S TURN`}
      </div>
      <div className="grid grid-cols-3 gap-2" style={{ width: 240 }}>
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 border-2 border-primary font-display text-4xl flex items-center justify-center hover:bg-primary/10 transition-colors"
            style={{ color: cell === 'X' ? '#ff3333' : '#3399ff' }}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="px-6 py-2 bg-primary text-primary-foreground font-display text-lg hover:opacity-80 transition-opacity"
      >
        RESET
      </button>
      <p className="text-muted-foreground text-sm">Two players — take turns clicking!</p>
    </div>
  );
}
