import React, {useEffect, useRef, useState} from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  ViroSphere,
  ViroText,
} from 'react-viro';
import useWSServer from './useWSServer';
import {StyleSheet} from 'react-native';

const initialPosition = [Math.random() * 0.1, -1.5, -2];

const Game: React.FC = () => {
  const {sendMessage, data} = useWSServer();
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const sphereInstance = useRef(null);
  useEffect(() => {
    if (data && data.gameStarted) {
      setGameStarted(true);
    }
    if (data && data.player) {
      setPlayerName(data.player);
    }
  }, [data]);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />

      {gameStarted && (
        <ViroSphere
          viroTag="ball"
          ref={sphereInstance}
          // dragType="FixedToWorld"
          id="ball"
          // onDrag={cords => {
          //   console.log('---> cords ', cords);
          //   //
          // }}
          // onTransformUpdate={(cords) => {
          //   sendMessage({...(data ? data : {}), ballCords: cords});
          // }}
          height={1}
          length={1}
          width={1}
          position={[0, 1.5, -2]}
          scale={[0.3, 0.3, 0.3]}
          materials={['red']}
          physicsBody={{
            type: 'Dynamic',
            mass: 0.3,
            restitution: 1,
          }}
        />
      )}

      {gameStarted &&
        Object.entries(data).map(([key, value], index) => {
          if ((key as string).includes('player')) {
            const {score, done, deviceName} = value;
            return (
              <ViroText
                key={index}
                width={1}
                text={`${deviceName || key}: ${score}`}
                scale={[0.5, 0.5, 0.5]}
                position={[-1, -0.5 * index, -3]}
                style={[
                  styles.helloWorldTextStyle,
                  {color: done ? 'red' : 'white'},
                ]}
                onClick={() => {
                  sendMessage({
                    gameStarted: true,
                  });
                }}
              />
            );
          }
          return null;
        })}
      {!gameStarted && (
        <ViroText
          text="Start game"
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
          onClick={() => {
            sendMessage({
              gameStarted: true,
            });
          }}
        />
      )}

      <ViroBox
        dragType="FixedToPlane"
        dragPlane={{
          planePoint: [0, -1.5, 0],
          planeNormal: [0, 1, 0],
          maxDistance: 10,
        }}
        onCollision={() => {
          sendMessage({
            player: playerName,
            hit: true,
          });
        }}
        onDrag={() => {}}
        height={0.1}
        length={0.3}
        width={0.3}
        position={initialPosition}
        // scale={[0.1, 0.1, 0.1]}
        materials={['green']}
        // rotation={[-10, 0, 0]}
        physicsBody={{
          type: 'Static',
          restitution: 1,
          shape: {
            type: 'Sphere',
            params: [0.3],
          },
        }}
      />

      <ViroBox
        id="ground"
        onCollision={() => {
          sendMessage({
            player: playerName,
            done: true,
          });
        }}
        height={0.1}
        length={50}
        width={50}
        position={[0, -2, -2.5]}
        // scale={[0.1, 0.1, 0.1]}
        materials={['black']}
        physicsBody={{
          type: 'Static',
          restitution: 0.5,
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
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Game;
