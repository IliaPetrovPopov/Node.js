import fs from "fs";
import "crypto";

process.env.UV_THREADPOOL_SIZE = 8;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished "));

// fs.readFile("test-file.txt", () => {
//   console.log("I/O finished");
//   console.log("-------------------");
//   setTimeout(() => console.log("Timer 2 finished"), 0);
//   setTimeout(() => console.log("Timer 3 finished"), 3000);
//   setImmediate(() => console.log("Immediate 2 finished "));
//   process.nextTick(() => console.log("nextTick"));
// });

setTimeout(() => console.log("Timer 4 finished"), 0);
console.log("Hello from the top-level code");
