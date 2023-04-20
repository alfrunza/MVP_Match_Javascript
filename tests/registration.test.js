//Automated completion of a Registration form

//Page-Oriented Programming wasn't used just because I am not knowledgeable in how to use the technique
//I know the overall principle of the technique so I used that mentality to declare CSS selectors as global variables
//This helps me to dry the code up
//For validation of some specific steps we will use console.log() so that we know they were clicked
//The strategy is reliable to an extent because of selenium's capabilities (i.e. if chromedriver cannot find an element, it will fail the test)
//If the test is failed, webdriver will not move on with the console.log(). It means that if the console.log() is correct, the step was successfully executed
//All the CSS selectors used in the following test were verified before this was written using the Google DevTools Console, using document.querySelectorAll()


//To run the test, simply write the following command in the Terminal: nmp test registration



const { Builder,By } = require('selenium-webdriver');

require('chromedriver');

let driver;

// beforeAll(async () => {
//     await 
// })

jest.setTimeout(10 * 1000);

beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
})

afterAll(async () => {
    await driver.sleep(1 * 1000);
    await driver.close();
})

const firstNameField = 'input[name="name"]';
const lastNameField = '.fieldset > p > input:not(input[name="name"])';
const radioSelector = '.radio_wrap:not(.padding-bottom > div) > label';
const checkboxSelector = '.padding-bottom > .radio_wrap > label';
const phoneField = 'fieldset > input[name="phone"]';
const usernameField = 'fieldset > input[name="username"]';
const emailField = 'fieldset > input[name="email"]';
const aboutField = 'fieldset > textarea[rows="5"]';
const passwordField = 'fieldset > input[name="password"]';
const confirmPasswordField = 'fieldset > input[name="c_password"]';

test('Input forms', async () => {

    //Here we get the URL and go on the specified page
    await driver.get('https://www.way2automation.com/way2auto_jquery/registration.php#load_box');

    //Here we click on the First Name input field and after that we write our first name
    await driver.findElement(By.css(firstNameField)).click();
    await driver.findElement(By.css(firstNameField)).sendKeys('Alexandru Lucian');

    //Here we click on the Last Name input field and after that we write our last name
    await driver.findElement(By.css(lastNameField)).click();
    await driver.findElement(By.css(lastNameField)).sendKeys('Frunza');

    //Here we create an array with the set of radio buttons
    let radio = await driver.findElements(By.css(radioSelector));

    //Because we cannot use a foreach loop asynchronously, we opt for a for ... of loop
    //In this loop we will click each radio button and call a console.log with the innerText so we know which buttons were clicked
    for await (const button of radio) {
        await button.click();
        await driver.sleep(0.5 * 1000);
        await expect(button.isSelected()).toBeTruthy();
        console.log(await button.getText() + ' was clicked and verified');
    }

    //Here we create an array with the set of checkboxes
    let checkboxes = await driver.findElements(By.css(checkboxSelector));

    //We use the same strategy for these checkboxes just like we did with the radio buttons
    for await (const button of checkboxes) {
        await button.click();
        await driver.sleep(0.5 * 1000);
        await expect(button.isSelected()).toBeTruthy();
        console.log(await button.getText() + ' was clicked and verified');
    }

    //For the all the dropdown items in the form we will create an array (for each item) and we will click each element in that array
    //As validation, we will console.log the item's index as well as the innerText

    //We begin with the Country dropdown

    // await driver.findElement(By.css('fieldset:nth-child(4) select')).click();
    // await driver.sleep(1 * 1000);
    // const country = await driver.findElements(By.css('fieldset:nth-child(4) select > option'));
    // for(let i = 0; i <= country.length; i++) {
    //     let x = country[i].getText();
    //     console.log(x + ' is element number ' + i+1);
    // }

    //For some reason, my code doesn't work and I have no clue about why this could be happening
    //I have worked with dropdowns before but this time my approach seems to be faulty


    //We continue the form using the same strategy for the input fields

    //Phone number field
    await driver.findElement(By.css(phoneField)).click();
    await driver.findElement(By.css(phoneField)).sendKeys('+40729616744');

    //Username field
    await driver.findElement(By.css(usernameField)).click();
    await driver.findElement(By.css(usernameField)).sendKeys('testUsername');

    //Email field
    await driver.findElement(By.css(emailField)).click();
    await driver.findElement(By.css(emailField)).sendKeys('frunza.luci@gmail.com');

    //About Yourself field
    let aboutInfo = 'Experienced Tester with a demonstrated history of working in the Software Testing industry.'
    await driver.findElement(By.css(aboutField)).click();
    await driver.findElement(By.css(aboutField)).sendKeys(aboutInfo);

    //Password and Confirm Password fields
    let password = 'testPassword@123'
    await driver.findElement(By.css(passwordField)).click();
    await driver.findElement(By.css(passwordField)).sendKeys(password);
    await driver.findElement(By.css(confirmPasswordField)).click();
    await driver.findElement(By.css(confirmPasswordField)).sendKeys(password);

    //After some research, I wasn't able to figure out how to handle file uploads in the Your Profile Picture field
})
