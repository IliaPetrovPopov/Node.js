import fs from "fs";
import superAgent from "superagent";

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("There is something wrong!");
      }
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject("There is something wrong!");
      }
      resolve("Great success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise("./dog.txt");
    console.log(`Breed is ${data}`);

    const result = await superAgent.get(
      "https://dog.ceo/api/breeds/image/random"
    );

    console.log(await writeFilePromise("dog-img.txt", result.body.message));
  } catch (error) {
    console.error(error);
  }
};

console.log("1");
await getDogPic();
console.log("3");

console.log("123");
