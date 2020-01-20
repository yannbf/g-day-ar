import WebSocket, {AddressInfo} from "ws";
import ip from "ip";

const wss = new WebSocket.Server({ port: 8080 });
console.log((wss.address() as AddressInfo).port);
console.log(`The host IP is: ${ip.address()}`);

const PLAYERS = new Map();
let count = 1;

wss.on("connection", (ws: WebSocket) => {
    const player = `player ${count++}`;
    PLAYERS.set(ws, player);
    console.log(`${player} connected`);
    ws.on("message", (data: string) => {
        const msg = JSON.parse(data);
        console.log("received: %s", msg);
        broadcast(ws, msg);
    });

    ws.on("close", () => {
        console.log(`${player} disconnected`);
    });
});

function broadcast(ws: any, msg: {id: string}) {
    console.log("foo", { clients: wss.clients });
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(createServerMessage(msg));
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
