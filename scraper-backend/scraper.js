const puppeteer = require('puppeteer');

async function scrapeMedium(topic) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://medium.com/search?q=${topic}`, { waitUntil: 'networkidle2' });

    const articles = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('article');

        items.forEach(item => {
            const h2Element = item.querySelector('h2');
            const h3Element = item.querySelector('h3');
            const authorElement = item.querySelector('div > div > div > a > p');
            const publicationDateElement = item.querySelector(' div > a > span');
            // const urlElement = item.querySelector('a');
            const urlDiv = item.querySelector('div[role="link"]');
            const urlElement = urlDiv ? urlDiv.getAttribute('data-href') : null;

            const publicationDateText = publicationDateElement ? publicationDateElement.textContent.trim() : null;
            const fullURL = urlElement ? urlElement.href : null;

            results.push({
                h2: h2Element ? h2Element.innerText : null,
                h3: h3Element ? h3Element.innerText : null,
                author: authorElement ? authorElement.innerText : null,
                publicationDate: publicationDateText ? publicationDateText : null,
                url: urlElement
            });
        });
        
        return results.slice(0, 5);
    });

    await browser.close();
    return articles;
}

module.exports = scrapeMedium;
