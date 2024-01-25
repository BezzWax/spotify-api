const { json } = require("express");
const puppeteer = require("puppeteer");
const url = "https://charts.spotify.com/home";

const getTopAlbums = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url);

	try {
		//albums
		await page.waitForSelector('.ChartsHomeCarousel__TabLinks-sc-1ozad3u-1.eQWOyV', { visible: true });
		const secondButton = await page.$('.ChartsHomeCarousel__TabLinks-sc-1ozad3u-1.eQWOyV li:nth-child(2) button');
		if (secondButton) {
			await secondButton.click();
		} else {
			console.log('Btn not found');
		}

		const loadMoreButton = await page.$(".ButtonInner-sc-14ud5tc-0.caCOMk.encore-bright-accent-set.ChartsHomeEntries__LoadMoreButton-kmpj2i-6.kXIjVu");
		for (let i = 0; i < 4; i++) {
			await loadMoreButton.click();
		}

		await page.waitForSelector(".ChartsHomeEntries__Title-kmpj2i-2.jCURRv");
		const elements = await page.$$(".ChartsHomeEntries__Title-kmpj2i-2.jCURRv");
		const data = [];

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];

			const res = await element.evaluate((item, id) => {
				const album = item.children[0].innerHTML;
				const artist = item.children[1].children[0].innerHTML;
				const linkElement = item.parentElement.querySelector(".ChartsHomeEntries__OpenSpotifyButton-kmpj2i-11");
				const link = linkElement ? linkElement.getAttribute("href") : null;

				return {
					"Id": id + 1,
					"Album": album,
					"Artist": artist,
					"Link": link,
				};
			}, i);

			data.push(res);
		}
		return data;

	} catch (err) {
		console.log(`Log: ${err}`);
	}

	await browser.close();
};

module.exports = {
	getTopAlbums,
};
