const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.cyclingstage.com/tour-de-france-2018/riders-tdf-2018/');
  // const textContent = await page.evaluate(() => document.querySelector('p').textContent);
  // const innerText = await page.evaluate(() => document.querySelector('p').innerText);
  const textArray = await page.evaluate(() => [...document.querySelectorAll('article > p')].map(elem => elem.innerText)); //.join('\n')

  // console.log(textContent);
  // console.log(innerText);
  console.log(textArray);

  await browser.close();
})();