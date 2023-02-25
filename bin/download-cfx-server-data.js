const { spawn } = require("child_process");
const decompress = require("decompress");
const fs = require("fs");

const url =
  "https://codeload.github.com/citizenfx/cfx-server-data/zip/refs/heads/master";

const extract = (file, cb) => {
  decompress(file, ".")
    .then((files) => {
      console.log(files);
      cb();
    })
    .catch((error) => {
      console.log(error);
    });
};

const download = (u, cb) => {
  const ls = spawn("curl", [u, "--output", "data.zip"]);

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    setTimeout(() => {
      cb(0);
    }, 1000);
  });
};

download(url, () => {
  extract("./data.zip", () => {
    fs.unlinkSync('./data.zip');
    console.log("Extract done");
    fs.cp(
      "./cfx-server-data-master/resources",
      "./resources/[cfx]",
      { recursive: true },
      (err) => {
        if (err) console.error(err);
        else
          fs.rmSync("cfx-server-data-master", { recursive: true, force: true });
        console.log("DONE");
      }
    );
  });
});
