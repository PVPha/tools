const auto = require("./auto");
const puppeteer = require('puppeteer-extra')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class email extends auto {
    constructor(name, url) {
        console.log('from email', url);
        super(name, url)
    }
    async start() {
        // await this.init();
        await this.getNetWorkSpeed();
        console.log('start email');

        console.log({ duration: this.duration, bitsLoaded: this.bitsLoaded, speedBps: this.speedBps, speedKbps: this.speedKbps, speedMbps: this.speedMbps });


        const page = await this.browser.newPage()
        // await page.setViewport({ width: 100, height: 100 })

        await page.goto(this.URL)
        //select option open account
        await page.click('#m2 > div > div > div._column_vqvmf_125._content_djoel_40._fixedRightPadding_djoel_91 > div._container_b2skv_227._body_b2skv_2._lg_b2skv_29._body_djoel_100 > div > gws-dropdown-button');
        await page.click('#m2 > div > div > div._column_vqvmf_125._content_djoel_40._fixedRightPadding_djoel_91 > div._container_b2skv_227._body_b2skv_2._lg_b2skv_29._body_djoel_100 > div > gws-dropdown-button > a:nth-child(3)');
        //fill name 
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.type('input#firstName', 'test input');
        await page.click('#collectNameNext > div > button');

        // await (async () => {
        //     try {
        //         const checkDom = setInterval(() => {
        //             const test = page.$('#day');
        //             if (test) {
        //                 console.log('tim thay');
        //                 clearInterval(checkDom);
        //                 return Promise.resolve()
        //             }
        //         }, 1000);
        //     } catch (error) {
        //         console.log('khong tim thay');
        //     }
        // })()
        await this.delay(5000)
        // await page.waitForNavigation({ timeout: 'networkidle2' });
        // await page.type('input#day', '20');
        // await page.waitForTimeout(2000)
        await page.screenshot({ path: `${this.name}.png`, fullPage: true })

        // console.log(`Testing the stealth plugin..`)
        // await page.goto('https://bot.sannysoft.com')
        // await page.waitForTimeout(5000)
        // await page.screenshot({ path: 'stealth.png', fullPage: true })

        // console.log(`All done, check the screenshots. ✨`)
        // await this.browser.close()
    }
}

const test = new email('name', 'https://www.google.com/intl/vi/gmail/about/');
(async () => {
    // await test.init();
    // test.start();
    // test.getNetWorkSpeed()
})()