const { Given, When, Then, After, AfterAll } = require('cucumber')
const { Builder, By, Capabilities, Key } = require('selenium-webdriver')
const { expect } = require('chai')

require("chromedriver")
//setup
const capabilities = Capabilities.chrome()
capabilities.set('chromeOptions', { "w3c": false })
const driver = new Builder().withCapabilities(capabilities).build()

Given('I am on the create account page', async () => {
    await driver.get('http://localhost:8080/account/create')
})

Given("the users with email 'user@example.com' exist", async ()=>{
    return true
})

When('I fill in all the required field', async () => {
    const email = await driver.findElement(By.id("fld_email"))
    const password = await driver.findElement(By.id("fld_password"))
    const name = await driver.findElement(By.id("fld_name"))
    const phoneNumber = await driver.findElement(By.id("fld_phoneNumber"))
    const street1 = await driver.findElement(By.id("fld_street1"))
    const street2 = await driver.findElement(By.id("fld_street2"))
    const city = await driver.findElement(By.id("fld_city"))
    const stateProvince = await driver.findElement(By.id("fld_stateProvince"))
    const postCode = await driver.findElement(By.id("fld_postCode"))
    const country = await driver.findElement(By.id("fld_country"))

    email.sendKeys(Math.floor(Math.floor((Math.random()*10)+1)) + 'webdriver@webdriver.com', Key.ENTER)
    password.sendKeys('123456', Key.ENTER)
    name.sendKeys('webdriver7', Key.ENTER)
    phoneNumber.sendKeys('12345678',Key.ENTER)
    street1.sendKeys('London',Key.ENTER)
    street2.sendKeys('London',Key.ENTER)
    city.sendKeys('London',Key.ENTER)
    stateProvince.sendKeys('London',Key.ENTER)
    postCode.sendKeys('2050',Key.ENTER)
    country.sendKeys('UK', Key.ENTER)
})

When('I create a new account using this taken email', async () => {
    const email = await driver.findElement(By.id("fld_email"))
    const password = await driver.findElement(By.id("fld_password"))
    const name = await driver.findElement(By.id("fld_name"))
    const phoneNumber = await driver.findElement(By.id("fld_phoneNumber"))
    const street1 = await driver.findElement(By.id("fld_street1"))
    const street2 = await driver.findElement(By.id("fld_street2"))
    const city = await driver.findElement(By.id("fld_city"))
    const stateProvince = await driver.findElement(By.id("fld_stateProvince"))
    const postCode = await driver.findElement(By.id("fld_postCode"))
    const country = await driver.findElement(By.id("fld_country"))

    email.sendKeys('user@example.com', Key.ENTER)
    password.sendKeys('123456', Key.ENTER)
    name.sendKeys('user', Key.ENTER)
    phoneNumber.sendKeys('12345678',Key.ENTER)
    street1.sendKeys('London',Key.ENTER)
    street2.sendKeys('London',Key.ENTER)
    city.sendKeys('London',Key.ENTER)
    stateProvince.sendKeys('London',Key.ENTER)
    postCode.sendKeys('2050',Key.ENTER)
    country.sendKeys('UK', Key.ENTER)
})

When('I accept the Terms and Conditions', async()=>{
    const TC = await driver.findElement(By.id("fld_termsAndConditions"))
    TC.click()
})

When('I click the create button', async () => {
    const submit_btn = await driver.findElement(By.id("createAccount"))
    submit_btn.click()
})

Then('I can see the success message on top',  {timeout: 60 * 1000}, async () => {
    const message = await driver.findElement(By.className("page-success-message")).getText()
    expect(message).to.contains("Hello")   
})

Then('I can see the error message on top',  {timeout: 60 * 1000}, async () => {
    const message = await driver.findElement(By.id("resultsMessage")).getText()
    expect(message).to.contains("There were errors.")   
})

