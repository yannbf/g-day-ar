import React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
} from 'react-viro';
import {StyleSheet} from 'react-native';
import { Box } from './components/Box';
import { Point3D } from './types';

const initialPosition: Point3D = [0, -0.5, -1];
const baseDimensions: Point3D = [0.2, 0.05, 0.15];

const Game: React.FC = () => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />
      <Box dimensions={baseDimensions} position={[0, -0.5, -1]} />
      <Box dimensions={baseDimensions} position={[0.1, -0.45, -1]} />
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

export default Game;
