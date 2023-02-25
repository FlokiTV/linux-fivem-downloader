const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

axios
  .get("https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla")
  .then((response) => {
    const $ = cheerio.load(response.data);
    $("pre").each((i, el) => {
      let txt = $(el).text();
      if (txt.includes("endpoint_add_tcp")) {
        fs.writeFile("server.cfg", txt, () => {
          console.log("DONE");
        });
        let start = `start ./artifacts/FXServer.exe +exec server.cfg`;
        fs.writeFile("start.bat", start, () => {
          console.log("DONE");
        });
      }
    });
  });
