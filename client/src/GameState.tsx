import React from 'react';
import {BoxType, Point3D} from './types';
import { getRandomColor } from './Game';

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

const inRange = (box1: BoxType, box2X: number) => {
  const box1Left = box1.position[0];
  const box1Right = box1.position[0] + box1.dimensions[0];
  const isInRange = box2X >= box1Left && box2X <= box1Right;

  return isInRange;
};

const reducer: React.Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case 'tap':
      const currentX = action.payload.currentX * -1;
      const {currentBox, stack, isPlaying} = state;
      const previousBox = {...currentBox};
      const newPositions = [
        currentX,
        currentBox.position[1] + currentBox.dimensions[1],
        currentBox.position[2],
      ];
      const topBox = stack[stack.length - 1];
      const isInRange = inRange(topBox, currentX);

      return {
        ...state,
        score: state.score + 1,
        isPlaying: state.score < 8,
        currentBox: {
          ...currentBox, 
          color: getRandomColor(),
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
