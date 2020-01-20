import WebSocket from "ws";
import ip from "ip";

const wss = new WebSocket.Server({ port: 8080 });
console.log(wss.address().port);
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

function broadcast(ws, msg) {
    console.log("foo", { clients: wss.clients });
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(createServerMessage(`received a msg from ${msg.id}`));
        }
    });
}

function createServerMessage(message) {
    return JSON.stringify({
        id: "server",
        deviceName: `${ip.address()}`,
        message
    });
}
