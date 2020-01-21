import WebSocket, {AddressInfo} from "ws";
import ip from "ip";

const wss = new WebSocket.Server({ port: 8080 });
console.log((wss.address() as AddressInfo).port);
console.log(`The host IP is: ${ip.address()}`);

type PlayerStat = {
    score: number;
    done: boolean;
}

type GameState = {
    [key: string]: PlayerStat | boolean;
};

const gameState: GameState = {  };
let playersCount = 0;

wss.on("connection", (ws: WebSocket) => {
    const player = `player ${++playersCount}`;
    gameState[player] = {
        score: 0,
        done: false
    };
    ws.send(createServerMessage({ player }));
    console.log(`${player} connected`);
    ws.on("message", (data: string) => {
        const msg = JSON.parse(data);
        console.log("received: %s", msg);
        update(msg);
        console.log('---> gameState ', gameState);
        broadcast(ws, gameState);
    });

    ws.on("close", () => {
        console.log(`${player} disconnected`);
        delete gameState[player];
        playersCount--;
    });
});

function broadcast(ws: any, data: any) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(createServerMessage(data));
        }
    });
}

function createServerMessage(message: any) {
    return JSON.stringify({
        id: "server",
        deviceName: `${ip.address()}`,
        message
    });
}

function update(msg: any) {
    if (msg.gameStarted) {
        gameState.gameStarted = true;
    }
  if (msg.hit) {
      (gameState[msg.player] as PlayerStat).score += 1;
  }
  if (msg.done) {
      (gameState[msg.player] as PlayerStat).done = true;
      playersCount--;
      if (playersCount === 0) {
          gameState.done = true;
      }
  }
}
