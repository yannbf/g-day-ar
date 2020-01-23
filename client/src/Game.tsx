import React from 'react';
import {ViroARScene, ViroAmbientLight, ViroMaterials, ViroAnimations} from 'react-viro';
import {StyleSheet} from 'react-native';
import {Box, MovingBox} from './components/Box';
import {Point3D} from './types';
import {GameStateProvider, GameState, useGameState} from './GameState';

const baseDimensions: Point3D = [0.2, 0.05, 0.15];

const initialState: GameState = {
  score: 0,
  isPlaying: false,
  stack: [
    {
      dimensions: baseDimensions,
      position: [0, -0.15, -1],
    },
  ],
  currentBox: {
    dimensions: baseDimensions,
    position: [0, -0.10, -1],
  },
};

export const GameContainer: React.FC = () => {
  return (
    <GameStateProvider initialState={initialState}>
      <Game />
    </GameStateProvider>
  );
};


export const Game: React.FC = () => {
  const {state, dispatch} = useGameState();
  const {stack, currentBox} = state;
  const [currentX, setCurrentPosition] = React.useState(state.currentBox.position[0]);

  return (
    <ViroARScene
      onClick={() => {
        dispatch({type: 'tap', payload: { currentX: currentX }});
      }}>
      <ViroAmbientLight color="#aaaaaa" />
      <MovingBox {...currentBox} onTransformUpdate={(position) => {
        setTimeout(() => {
          setCurrentPosition(position[0]);
        }, 100);
      }}/>
      {stack.map(box => (
        <Box dimensions={box.dimensions} position={box.position} />
      ))}
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  green: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'green',
  },
  blue: {diffuseTexture: require('./res/grid_bg.jpg'), diffuseColor: 'blue'},
  red: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'red',
  },
  black: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'transparent',
  },
});

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
