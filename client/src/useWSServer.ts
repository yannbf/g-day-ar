import {useEffect, useRef, useState, useCallback} from 'react';
import {setupWebSocket} from './WebSocketController';
const wsPromise = setupWebSocket();

export default () => {
  const [data, setData] = useState(null);
  const wsInstance = useRef<null | WebSocket>(null);

  useEffect(() => {
    console.log('useEffect');
    wsPromise.then(ws => {
      console.log('wsPromise');
      wsInstance.current = ws;
      ws.onmessage = function incoming(msg) {
        const data = JSON.parse(msg.data);
        console.log({data});
        setData(data.message);
      };
    });
  }, []);
  const sendMessage = useCallback(
    (data: {[key: string]: any}) =>
      wsInstance.current && wsInstance.current.send(JSON.stringify(data)),
    [wsInstance],
  );

  return {
    data,
    sendMessage,
  };
};
