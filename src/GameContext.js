import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');
  const [winner, setWinner] = useState(null);

  return (
    <GameContext.Provider value={{ squares, setSquares, nextValue, setNextValue, winner, setWinner }}>
      {children}
    </GameContext.Provider>
  );
}