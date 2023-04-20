const { Builder,By } = require('selenium-webdriver');

require('chromedriver');

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
})

afterAll(async () => {
    await driver.sleep(1 * 1000);
    await driver.close();
})

let alertButton = 'body > button';
let inputAlertTab = 'a[href="#example-1-tab-2"]';

test('Alert test', async () => {

    //We give webdriver the URL to go to
    await driver.get('https://www.way2automation.com/way2auto_jquery/alert.php#load_box');
    await driver.sleep(1 * 1000);

    //First we click the first alert button
    await driver.findElement(By.css(alertButton)).click();

    //We display the alert text in the console
    let text = await driver.switchTo().alert().getText();
    console.log('The alert says: \"' + text + '\"');

    //Then we accept the alert
    await driver.switchTo().alert().accept();

    //After that we switch the tab to the Input Alert
    await driver.findElement(By.css(inputAlertTab)).click();

    //We click the button again
    await driver.findElement(By.css(alertButton)).click();
    
    //We display the alert text in the console
    text = await driver.switchTo().alert().getText();
    console.log('The alert says: \"' + text + '\"');
    
    //We write our name in the input field
    await driver.switchTo().alert().sendKeys('Alexandru Lucian Frunza');

    //Then we accept the alert
    await driver.switchTo().alert().accept();
})