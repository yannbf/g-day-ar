import React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
} from 'react-viro';

const Game: React.FC = () => {
  return null;
};

ViroMaterials.createMaterials({
  green: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'green',
  },
});

export default Game;
