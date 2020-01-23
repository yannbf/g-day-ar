import React from 'react';
import {BoxType, Point3D} from './types';

export type GameState = {
  score: number;
  isPlaying: boolean;
  stack: BoxType[];
  currentBox: BoxType;
  currentBoxPosition?: Point3D;
};

export type GameContextType = {
  state: GameState;
  dispatch: Function;
};

export type GameAction = {
  type: 'tap';
  payload?: any;
};

export const GameStateContext = React.createContext<GameContextType>(null);

const reducer: React.Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case 'tap':
      const currentX = action.payload.currentX * -1;
      const {currentBox, stack} = state;
      const previousBox = {...currentBox};
      const newPositions = [
        currentX,
        currentBox.position[1] + currentBox.dimensions[1],
        currentBox.position[2],
      ];

      return {
        ...state,
        score: state.score + 1,
        currentBox: {
          ...currentBox,
          position: newPositions,
        },
        stack: [...stack, previousBox],
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
