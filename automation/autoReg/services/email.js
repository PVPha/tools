const auto = require("./auto");
const puppeteer = require('puppeteer-extra')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

class email extends auto {
    constructor(name, url) {
        super(name, url)
    }
    async waitElement() {
        const ele = await this.page.focus('input#lastName');
        if (ele) {
            return ele;
        } else {
            this.waitElement();
        }
    }
    async start() {
        // await this.init();
        console.log('start email');
        // const page = await this.browser.newPage()
        // await page.setViewport({ width: 100, height: 100 })
        await this.page.goto(this.URL)
        //select option open account
        await this.page.click('#m2 > div > div > div._column_vqvmf_125._content_djoel_40._fixedRightPadding_djoel_91 > div._container_b2skv_227._body_b2skv_2._lg_b2skv_29._body_djoel_100 > div > gws-dropdown-button');
        await this.page.click('#m2 > div > div > div._column_vqvmf_125._content_djoel_40._fixedRightPadding_djoel_91 > div._container_b2skv_227._body_b2skv_2._lg_b2skv_29._body_djoel_100 > div > gws-dropdown-button > a:nth-child(3)');
        //fill name 
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        await this.page.type('input#firstName', 'test input');
        await this.page.click('#collectNameNext > div > button');
        //fill birthday
        await this.page.waitForSelector('input#day', { visible: true });
        await this.delay(2000);
        await this.page.type('input#day', '29');
        await this.page.select('#month', '3');
        await this.page.type('input#year', '1999');
        await this.page.select('#gender', '1');
        await this.delay(1000);
        await this.page.click('#birthdaygenderNext > div > button');
        //fill username
        await this.page.waitForSelector('#yDmH0d > c-wiz > div > div.UXFQgc > div > div > div > form > span > section > div > div > div.myYH1.v5IR3e.V9RXW > div.Hy62Fc > div > span > div:nth-child(3)', { visible: true });
        await this.delay(1000);
        await this.page.click('#yDmH0d > c-wiz > div > div.UXFQgc > div > div > div > form > span > section > div > div > div.myYH1.v5IR3e.V9RXW > div.Hy62Fc > div > span > div:nth-child(3)');
        await this.delay(1000);
        await this.page.type('#yDmH0d > c-wiz > div > div.UXFQgc > div > div > div > form > span > section > div > div > div.BvCjxe > div.AFTWye > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input', 'testinput');
        await this.delay(1000);
        await this.page.click('#next > div > button')
        await this.delay(1000);
        const isErrorUserName = await this.page.focus('#yDmH0d > c-wiz > div > div.UXFQgc > div > div > div > form > span > section > div > div > div.BvCjxe > div.AFTWye > div > div.LXRPh > div.dEOOab.RxsGPe > div');
        await this.delay(1000);
        // await this.page.type('input#username', 'testinput');
        // this.delay(1000);
        // await page.waitForNetworkIdle({ concurrency: 0, idleTime: 3000 });
        // await this.waitElement();
        // await page.type('input#day', '20');
        // await page.waitForTimeout(2000)
        await this.page.screenshot({ path: `${this.name}.png`, fullPage: true })

        // console.log(`Testing the stealth plugin..`)
        // await page.goto('https://bot.sannysoft.com')
        // await page.waitForTimeout(5000)
        // await page.screenshot({ path: 'stealth.png', fullPage: true })

        console.log(`All done, check the screenshots. ✨`)
        await this.browser.close()
    }
}

const test = new email('name', 'https://www.google.com/intl/vi/gmail/about/');
