var express = require('express');
const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
var router = express.Router();

router.post('/loan', async (req, res, next) => {
  const {url} = req.body

  const result = {} 

  try {
    const browser = await puppeteer.launch(
      {
        headless: true,
        ignoreHTTPSErrors: true,
      }
    );
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto(url, {
      waitLoad: true, 
      waitNetworkIdle: true // defaults to false
    });
    await page.setViewport({ width: 1440, height: 744 });
    await navigationPromise;

    await page.waitForSelector('div>.items-start', {timeout: 30000, waitNetworkIdle: true});

    const content = await page.content();

    const $ = cheerio.load(content);

    let titles = ['howrare', 'moonrank']
    let titles_two = ['funding', 'duration', 'LTF']

    $('.flex > div > .flex > .font-semibold').slice(0, 2).each((idx, elem) => {
      const value = $(elem).text();
      result[titles[idx]] = value;
    })

    $('.mt-4 div .font-semibold').slice(0, 1).each((idx, elem) => {
      const value = $(elem).text();
      result[titles_two[idx]] = value;
    })

    $('.mt-4 > div > .text-base').slice(0, 1).each((idx, elem) => {
      const value = $(elem).text();
      result[titles_two[idx + 1]] = value;
    })

    $('.mt-4 > div > .text-red-500').slice(0, 1).each((idx, elem) => {
      const value = $(elem).text();
      result[titles_two[idx + 2]] = value;
    })

    res.status(200).json(result);

    // close everything
    await page.close();

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
    res.status(400).json({
      errors: [
        {
          msg: "provided url is not valid for scrapping"
        }
      ]
    });
    console.log(error);
  }
});

module.exports = router;
