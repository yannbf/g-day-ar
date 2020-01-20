import React, {useEffect, useState} from 'react';
import {ViroARSceneNavigator} from 'react-viro';
import Game from './Game';
import {setupWebSocket, MessageType} from './WebSocketController';

declare var global: {HermesInternal: null | {}};

const wsPromise = setupWebSocket();

const wsContext = React.createContext();

const WebSocketProvider = ({children}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('useEffect');
    wsPromise.then(ws => {
      console.log('wsPromise');
      ws.onmessage = function incoming(msg) {
        const data = JSON.parse(msg.data);
        console.log({data});
        setData(data.message);
      };
    });
  }, []);

  const {Provider} = wsContext;

  return <Provider value={data}>{children}</Provider>;
};

const App = () => {
  return (
    <WebSocketProvider>
      <ViroARSceneNavigator initialScene={{scene: Game}} autofocus hdrEnabled />
    </WebSocketProvider>
  );
};

export default App;
