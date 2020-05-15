const { Given, When, Then, After, AfterAll } = require('cucumber')
const { Builder, By, Capabilities, Key } = require('selenium-webdriver')
const { expect } = require('chai')

require("chromedriver")
//setup
const capabilities = Capabilities.chrome()
capabilities.set('chromeOptions', { "w3c": false })
const driver = new Builder().withCapabilities(capabilities).build()

Given('I have logged in', async ()=> {
    await driver.get('http://localhost:8080/login')
    await driver.findElement(By.name("username")).sendKeys("webdriver7@webdriver.com");
    await driver.findElement(By.name("password")).sendKeys("123456");

    await driver.findElement(By.name("submit")).click();
})

Given('I am on the home page', async () => {
    await driver.get('http://localhost:8080/')
})

When('I click Reserve Item button', async () => {
    await driver.findElement(By.className("reserve-button")).click()
})

Then('I can see Item Reserved!', async () => {
    const reserve_message = await driver.findElement(By.className("page-action"))
    expect(await reserve_message.getText()).to.equal("Item reserved !")
})