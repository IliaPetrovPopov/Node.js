import EventEmitter from "events";
import http from "http";

class Sales extends EventEmitter {}

const myEmmiter = new Sales();

myEmmiter.on("newSale", () => {
  console.log("There was a new Sale!");
});

myEmmiter.on("newSale", () => {
  console.log("Customer bought something");
});

myEmmiter.on("newSale", (stock) => {
  console.log(`There are ${stock} items left.`);
});

myEmmiter.emit("newSale", 9);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request received");
});

server.on("close", () => {
    console.log("Server closed");
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests");
})