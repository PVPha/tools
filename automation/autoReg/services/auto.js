const { TargetType, Target } = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')


module.exports = class auto {
    browser;
    page;
    URL = "https://www.google.com";
    name = '';
    global = '';
    duration = '';
    bitsLoaded = '';
    speedBps = '';
    speedKbps = '';
    speedMbps = '';
    constructor(name, URL) {
        console.log('from auto', URL);
        this.URL = URL;
        this.name = name;
        this.global = 'global'
        this.init();
    }
    async init() {
        puppeteer.use(StealthPlugin())
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
        const browser = await puppeteer.launch({ headless: false }).then(async browser => {
            this.browser = browser;
            this.page = await this.browser.newPage()
            this.start();
        })
    }
    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    async start() {
        // const page = await this.browser.newPage()
        // // await page.setViewport({ width: 100, height: 100 })

        // console.log(`Testing adblocker plugin..`)
        // await page.goto(this.URL)

        // await page.click('#m2 > div > div > div._column_vqvmf_125._content_djoel_40._fixedRightPadding_djoel_91 > div._container_b2skv_227._body_b2skv_2._lg_b2skv_29._body_djoel_100 > div > gws-dropdown-button');

        // await page.click('#m2 > div > div > div._column_vqvmf_125._content_djoel_40._fixedRightPadding_djoel_91 > div._container_b2skv_227._body_b2skv_2._lg_b2skv_29._body_djoel_100 > div > gws-dropdown-button > a:nth-child(3)');
        // await page.waitForNavigation({ waitUntil: 'networkidle0' });
        // await page.type('input#firstName', 'test input');
        // await page.click('#collectNameNext > div > button');
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
        // await this.delay(5000)
        // // await page.waitForNavigation({ timeout: 'networkidle2' });
        // // await page.type('input#day', '20');
        // // await page.waitForTimeout(2000)
        // await page.screenshot({ path: `${this.name}.png`, fullPage: true })

        // console.log(`Testing the stealth plugin..`)
        // await page.goto('https://bot.sannysoft.com')
        // await page.waitForTimeout(5000)
        // await page.screenshot({ path: 'stealth.png', fullPage: true })

        console.log(`All done, check the screenshots. ✨`)
        await this.browser.close()
    }
    test() {
        console.log('this global');
    }
    async getNetWorkSpeed() {
        const page = await this.browser.newPage()
        await page.evaluate(() => {
            var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Bloemen_van_adderwortel_%28Persicaria_bistorta%2C_synoniem%2C_Polygonum_bistorta%29_06-06-2021._%28d.j.b%29.jpg";
            var downloadSize = 7300000; //bytes
            var startTime, endTime;
            var download = document.createElement("img");
            download.onload = () => {
                endTime = (new Date()).getTime();
                console.log(endTime);
                this.test();
                showResults();
            }

            // download.onerror = (err, msg) => {
            //     console.log(err, msg);
            // }

            startTime = (new Date()).getTime();
            var cacheBuster = "?nnn=" + startTime;
            download.src = imageAddr + cacheBuster;

            const showResults = () => {
                this.duration = (endTime - startTime) / 1000;
                this.bitsLoaded = downloadSize * 8;
                this.speedBps = (this.bitsLoaded / this.duration).toFixed(2);
                this.speedKbps = (this.speedBps / 1024).toFixed(2);
                this.speedMbps = (this.speedKbps / 1024).toFixed(2);
                // ShowProgressMessage([
                //     "Your connection speed is:",
                //     speedBps + " bps",
                //     speedKbps + " kbps",
                //     speedMbps + " Mbps"
                // ]);
            }
        })
        console.log('end func check network speed');
        console.log({ duration: this.duration, bitsLoaded: this.bitsLoaded, speedBps: this.speedBps, speedKbps: this.speedKbps, speedMbps: this.speedMbps });

    }
}
