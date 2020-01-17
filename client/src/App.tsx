import React from 'react';
import {ViroARSceneNavigator} from 'react-viro';
import Game from './Game';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <ViroARSceneNavigator initialScene={{scene: Game}} autofocus hdrEnabled />
  );
};

export default App;
