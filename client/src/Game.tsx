import React from 'react';
import {View, Text} from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
  ViroText,
} from 'react-viro';
import {StyleSheet} from 'react-native';
import {Box, MovingBox} from './components/Box';
import {Point3D} from './types';
import {GameStateProvider, GameState, useGameState} from './GameState';

const baseDimensions: Point3D = [0.2, 0.05, 0.15];

const color = ['green', 'blue', 'red', 'black'];
export const getRandomColor = () => [color[(Math.floor(Math.random() * 3))]]

const initialState: GameState = {
  score: 0,
  isPlaying: true,
  stack: [
    {
      dimensions: baseDimensions,
      position: [0, -0.15, -1],
      color: getRandomColor()
    },
  ],
  currentBox: {
    dimensions: baseDimensions,
    position: [0, -0.1, -1],
    color: getRandomColor()
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
  const {stack, currentBox, isPlaying} = state;
  const [currentX, setCurrentPosition] = React.useState(
    state.currentBox.position[0],
  );

  return (
    <ViroARScene
      onClick={() => {
        if (isPlaying) {
          dispatch({type: 'tap', payload: {currentX: currentX}});
        }  
      }}>
      <ViroText
        width={1}
        text={`Score:${state.score}`}
        position={[0, -1.5, -3]}
        style={styles.text}
      />
      <ViroAmbientLight color="#aaaaaa" />
      <MovingBox
        {...currentBox}
        onTransformUpdate={position => {
          setTimeout(() => {
            setCurrentPosition(position[0]);
          }, 100);
        }}
        isPlaying={isPlaying}
      />
      {stack.map(box => (
        <Box {...box} />
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
