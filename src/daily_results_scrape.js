const puppeteer = require('puppeteer');

async function stageResults() {

	const browser = await puppeteer.launch({slowMo: 100}); // pass in: {slowMo: 200} to slow it down
	const page = await browser.newPage();

	const WINNER = '.rankingTable tbody tr:nth-child(1) > td.runner > a';

	await page.goto('https://www.letour.fr/en/rankings/stage-6');
	const st_winner = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText;
	}, WINNER);

	await page.click('.js-tabs-wrapper > ul.ranking__type > li:last-child > a');
	// page.waitFor({ waitUntil: 'networkidle0' });
	const agressive = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText;
	}, WINNER);

	await page.click('.js-tabs-wrapper > ul.ranking__tabs li:nth-child(1) > a');
	const yellow = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText;
	}, WINNER);

	await page.click('.js-tabs-wrapper > ul.ranking__type > li:nth-child(2) > a');
	const green = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText;
	}, WINNER);

	await page.click('.js-tabs-wrapper > ul.ranking__type > li:nth-child(4) > a');
	const polka = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText;
	}, WINNER);

	await page.click('.js-tabs-wrapper > ul.ranking__type > li:last-child > a');
	const white = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText;
	}, WINNER);

	let stage_results = {
		st_winner: st_winner,
		yellow: yellow,
		green: green,
		polka: polka,
		white: white,
		agressive: agressive
	};

	console.log(stage_results);

	return stage_results;

	await browser.close();

};

module.exports.stageResults = stageResults;