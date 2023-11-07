// https://dog.ceo/api/breed/hound/images/random
const fs = require("fs");
const superAgent = require("superagent");

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

    const result1 = superAgent.get("https://dog.ceo/api/breeds/image/random");

    const result2 = superAgent.get("https://dog.ceo/api/breeds/image/random");

    const result3 = superAgent.get("https://dog.ceo/api/breeds/image/random");

    const all = await Promise.all([result1, result2, result3]);

    const images = all.map(el => el.body.message);
    console.log(images);

    console.log(await writeFilePromise("dog-img.txt", images.join("\n")));
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  try {
    console.log("1");
    await getDogPic();
    console.log("3");
  } catch (error) {
    console.error(error);
  }
})();

/*
readFilePromise("./dog.txt")
  .then((data) => {
    console.log(`Breed is ${data}`);
    return superAgent.get("https://dog.ceo/api/breeds/image/random");
  })
  .then(result => {
    return writeFilePromise("dog-img.txt", result.body.message);
  })
  .then(() => {
    console.log("Succccesss!!!");
  })
  .catch((e) => console.error("Wrooong!"));
  */
