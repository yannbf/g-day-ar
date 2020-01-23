import React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
} from 'react-viro';
import {StyleSheet} from 'react-native';

const initialPosition = [0, -0.5, -1];
const baseDimensions = {
  height: 0.1,
  length: 0.3,
  width: 0.3
};

const Game: React.FC = () => {

  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />
      
      <ViroBox
        dragType="FixedToPlane"
        dragPlane={{
          planePoint: [0, -1.5, 0],
          planeNormal: [0, 1, 0],
          maxDistance: 10,
        }}
        {...baseDimensions}
        position={initialPosition}
        materials={['green']}
        physicsBody={{
          type: 'Static',
          restitution: 1,
          shape: {
            type: 'Sphere',
            params: [0.3],
          },
        }}
      />
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
