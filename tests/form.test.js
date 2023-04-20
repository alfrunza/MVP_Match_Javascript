const { Builder,By } = require('selenium-webdriver');
const { DriverService } = require('selenium-webdriver/remote');

require('chromedriver');

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
})

afterAll(async () => {
    await driver.sleep(4.5 * 1000);
    await driver.close();
})

test('Basic Form Controls', async () => {
    //Go on page
    await driver.get('https://dineshvelhal.github.io/testautomation-playground/forms.html');

    //Complete the experience input field
    await driver.findElement(By.id('exp')).click();
    await driver.findElement(By.id('exp')).sendKeys('< 1 Year of experience');

    //Check the known programming languages
    //We do this by first creating an array with the checkbox items
    let checkboxItems = await driver.findElements(By.css('.form-row > div:nth-child(2) > .form-group > .form-check'));

    //Here we verify which item should be checked and we click it
    let itemText;
    for await (item of checkboxItems) {
        itemText = await item.getText();
        if(itemText == 'Java' || itemText == 'JavaScript') {
            await item.click();
        }
    }

    //Check the technology used
    await driver.findElement(By.id('rad_selenium')).click();

    //Select the Primary Skill
    await driver.findElement(By.id('select_tool')).click();
    await driver.sleep(0.5 * 1000);
    await driver.findElement(By.css('#select_tool option[value="sel"]')).click();
})