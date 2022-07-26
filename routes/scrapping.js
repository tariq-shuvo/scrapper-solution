var express = require('express');
const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
var router = express.Router();

router.post('/loan', async (req, res, next) => {
  const {url} = req.body

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.setViewport({ width: 1440, height: 744 });
    await navigationPromise;

    // await page.waitForSelector('.mb-1 .bg-yawwwtwo-blue-700', {timeout: 10000});

    // console.log(page)
    // await page.waitForSelector('ul li h3 a');

    // let jobTitles = await page.$$eval('ul li h3 a', titles => {
    //   return titles.map(title => title.innerText);
    // });

    // const $ = cheerio.load(body);
    // console.log($.html())
    // console.log(`Job Titles on first page of Workable are: ${jobTitles.join(', ')}`);
    
    await browser.close();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
