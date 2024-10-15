// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`

// That's it, the rest is puppeteer usage as normal 😊
puppeteer.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    await page.setViewport({ width: 800, height: 600 })
    console.log(`Testing adblocker plugin..`)
    await page.goto('https://www.vanityfair.com')
    // await page.waitForTimeout(1000)
    await page.screenshot({ path: 'adblocker.png', fullPage: true })

    console.log(`Testing the stealth plugin..`)
    await page.goto('https://bot.sannysoft.com')
    // await page.waitForTimeout(5000)
    await page.screenshot({ path: 'stealth.png', fullPage: true })

})