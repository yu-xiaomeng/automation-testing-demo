const { Given, When, Then, After, AfterAll } = require('cucumber')
const { Builder, By, Capabilities, Key } = require('selenium-webdriver')
const { expect } = require('chai')

require('chromedriver')

//setup
const capabilities = Capabilities.chrome()
capabilities.set('chromeOptions', { "w3c": false })
const driver = new Builder().withCapabilities(capabilities).build()

When("我在登陆页面", async ()=> {
    await driver.get('http://localhost:8080/login')
})

When("我输入我已有的账号并点击登陆", async ()=> {
    await driver.findElement(By.name("username")).sendKeys("webdriver7@webdriver.com");
    await driver.findElement(By.name("password")).sendKeys("123456");

    await driver.findElement(By.name("submit")).click();
})

Then("我登陆成功并看到页面上的欢迎信息", {timeout: 60 * 1000}, async ()=> {
    expect(await driver.findElement(By.id("welcome")).getText()).to.contains("Welcome ")
})

AfterAll(async function () {
    await driver.quit()
})