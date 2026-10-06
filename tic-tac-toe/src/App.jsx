
import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winner = winningCombinations.find((combination) =>
    combination.every(
      (index) =>
        board[index] && board[index] === board[combination[0]]
    )
  );

  const winningPlayer = winner ? board[winner[0]] : null;
  const isDraw = !winningPlayer && board.every((cell) => cell !== "");

  function handleClick(index) {
    if (board[index] || winningPlayer || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function restartGame() {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  }

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
        }

        .app {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 20px;
        }

        .game-container {
          width: 100%;
          max-width: 420px;
          padding: 35px 25px;
          text-align: center;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        h1 {
          font-size: 36px;
          color: #25234a;
        }

        .subtitle {
          color: #777;
          margin: 10px 0 25px;
        }

        .status {
          font-size: 20px;
          font-weight: 600;
          color: #5b50d6;
          margin-bottom: 22px;
          min-height: 28px;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 25px;
        }

        .cell {
          aspect-ratio: 1;
          border: none;
          border-radius: 14px;
          background: #f0efff;
          font-size: 48px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }

        .cell:enabled:hover {
          background: #e1deff;
          transform: scale(1.04);
        }

        .cell.x {
          color: #635bdb;
        }

        .cell.o {
          color: #ed6995;
        }

        .cell.winning-cell {
          background: #c6f6d5;
          color: #166534;
        }

        .restart-btn {
          padding: 14px 30px;
          border: none;
          border-radius: 12px;
          background: #635bdb;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .restart-btn:hover {
          background: #4d44c4;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .game-container {
            padding: 25px 18px;
          }

          h1 {
            font-size: 30px;
          }

          .cell {
            font-size: 40px;
          }
        }
      `}</style>

      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <p className="subtitle">The classic game of X and O</p>

        <div className="status">
          {winningPlayer
            ? `🎉 Player ${winningPlayer} wins!`
            : isDraw
            ? "It's a draw!"
            : `Player ${isXTurn ? "X" : "O"}'s turn`}
        </div>

        <div className="board">
          {board.map((value, index) => (
            <button
              key={index}
              className={`cell ${value.toLowerCase()} ${
                winner?.includes(index) ? "winning-cell" : ""
              }`}
              onClick={() => handleClick(index)}
              disabled={!!value || !!winningPlayer || isDraw}
            >
              {value}
            </button>
          ))}
        </div>

        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;
