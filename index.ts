import { $ } from "bun";
import * as cheerio from "cheerio";

let URL = "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/";

async function main() {
  const html = await (await fetch(URL)).text();
  const $html = cheerio.load(html);
  const link = $html("a.is-active").attr("href")?.replace("./", "");
  const downloadLink = URL + link;
  await $`wget ${downloadLink}`;
  await $`tar -xvf fx.tar.xz`;
  await $`rm -rf fx.tar.xz`;
  console.log(link);
}

await main();
