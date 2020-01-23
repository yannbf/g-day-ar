import React from 'react';
import {ViroARSceneNavigator} from 'react-viro';
import {GameContainer} from './Game';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{scene: GameContainer}}
      autofocus
      hdrEnabled
    />
  );
};

export default App;
