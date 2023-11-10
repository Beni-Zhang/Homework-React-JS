import React, { useState } from 'react';
import { GameProvider } from './GameContext';
import { useGame } from './GameContext';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');
  const [winner, setWinner] = useState(null);

  function selectSquare(square) {
    if (squares[square] || winner) {
      return;
    }

    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);

    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setNextValue(calculateNextValue(newSquares));
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div>STATUS: {calculateStatus(winner, squares, nextValue)}</div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

function calculateWinner(squares) {
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

function calculateNextValue(squares) {
  const xCount = squares.filter((square) => square === 'X').length;
  const oCount = squares.filter((square) => square === 'O').length;
  return xCount <= oCount ? 'X' : 'O';
}

function calculateStatus(winner, squares, nextValue) {
  if (winner) {
    return `Winner: ${winner}`;
  } else if (squares.every((square) => square)) {
    return `Scratch: Cat's game`;
  } else {
    return `Next player: ${nextValue}`;
  }
}

export { calculateWinner, calculateNextValue, calculateStatus };

function Game() {
  const { setSquares, setNextValue, setWinner } = useGame();

  const restart = () => {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setWinner(null);
  };

  return (
    <div>
      <div>
        <Board />
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;