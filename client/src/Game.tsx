import React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
} from 'react-viro';

const Game: React.FC = () => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />
      <ViroBox
        // dragType="FixedToWorld"
        // onDrag={() => {}}
        height={1}
        length={1}
        width={1}
        position={[0, 0, -1]}
        scale={[0.1, 0.1, 0.1]}
        materials={['green']}
        // physicsBody={{
        //   type: 'Dynamic',
        //   mass: 0.0001,
        // }}
      />
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  green: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'green',
  },
});

export default Game;
