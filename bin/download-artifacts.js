const cheerio = require('cheerio');
const axios = require('axios');
const { spawn } = require('child_process');

let URL = "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/"
axios.get(URL)
  .then(response => {
    const $ = cheerio.load(response.data)
    let u = URL + $("a.is-active").attr("href").replace("./", "")
    download(u, () => {
      extract('fx.tar.xz', () => {
        delFile('fx.tar.xz', () => {
          console.log("DONE")
        })
      })
    })
  })

const delFile = (file, cb) => {
  const ls = spawn('rm', ['-r', file]);
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    cb(0)
  });
}

const extract = (file, cb) => {
  const ls = spawn('tar', ['-xvf',file]);
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    cb(0)
  });
}

const download = (u, cb) => {
    const ls = spawn('wget', [u]);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      cb(0)
    });
  }