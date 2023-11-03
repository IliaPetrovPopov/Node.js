import fs, { read } from "fs";
import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  // fs.readFile("test-file.txt", (err, data) => {
  //     if(err) {
  //         return console.log(err);
  //     }

  //     res.end(data)
  // });

  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode(500);
  //     res.end("file not found");
  //   });

  const readable = fs.createReadStream("test-path.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {});
