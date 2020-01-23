import React from 'react';
import {ViroARSceneNavigator, ViroAnimations} from 'react-viro';
import {GameContainer} from './Game';

declare var global: {HermesInternal: null | {}};

const registerAnimations = () => {
  ViroAnimations.registerAnimations({
    moveRight: {properties: {positionX: "+=0.25"}, duration: 500},
    moveLeft: {properties: {positionX: "-=0.25"}, duration: 500},
    moveRightAndLeft: [
      ["moveRight", "moveLeft"]
    ],
    moveLeftAndRight: [
      ["moveLeft", "moveRight"]
    ],
    spring: [
      ["moveLeftAndRight", "moveRightAndLeft"]
    ]
  })
}

const App = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{scene: GameContainer}}
      autofocus
      hdrEnabled
    />
  );
};

registerAnimations();

export default App;
