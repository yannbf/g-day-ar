import React from 'react';
import {BoxType} from './types';

export type GameState = {
  score: number;
  isPlaying: boolean;
  stack: BoxType[];
  currentBox: BoxType;
};

export type GameContextType = {
  state: GameState;
  dispatch: Function;
};

export type GameAction = {
  type: 'tap';
};

export const GameStateContext = React.createContext<GameContextType>(null);

const reducer: React.Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case 'tap':
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      return state;
  }
};

export const GameStateProvider: React.FC<{initialState: GameState}> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GameStateContext.Provider value={{state, dispatch}}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => React.useContext(GameStateContext);
