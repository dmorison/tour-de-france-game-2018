const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.cyclingstage.com/tour-de-france-2018/riders-tdf-2018/');
  const name = await page.evaluate(() => document.querySelector('article').innerHTML);
  console.log(name);
  await browser.close();
})();