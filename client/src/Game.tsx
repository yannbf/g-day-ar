import React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
} from 'react-viro';
import useWSServer from './useWSServer';

const Game: React.FC = () => {
  const {sendMessage, data} = useWSServer();
  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />
      <ViroBox
        // dragType="FixedToWorld"
        onDrag={(coords) => {
          sendMessage({coords});
        }}
        height={1}
        length={1}
        width={1}
        position={[0, 2, -2]}
        scale={[0.1, 0.1, 0.1]}
        materials={['green']}
        physicsBody={{
          type: 'Dynamic',
          mass: 0.1,
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
});

export default Game;
