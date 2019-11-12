# Visual Approach w/ Applitools and Cypress

This was the fun approach. I removed the majority of the functional testing logic and relied on Cypress primarily for navigation. Applitools is used to compare screenshots from version 2 of the app against baseline images from version 1. You will quickly see how powerful Applitools can be and the relief it can provide. A true combination of the functional tests from Cypress along with the visual tests from Applitools would result in a new level of testing reliability.

## Running the Tests

In order to execute the tests, you can rely on the documentation found [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements).

An overview of the necessary commands can be found below:

```
// Installs to your ./node_modules directory
npm install cypress

// Executes your tests through the command line
npx cypress run

// Alternatively, open the Cypress application and test
npx cypress open
```

You may also need to make configurations for the Applitools SDK. You can find detailed documentation [here](https://www.npmjs.com/package/@applitools/eyes-cypress#configure-plugin-and-commands). An overview of the process can be found below:

```
// Install the SDK as a dependency
npm install --save-dev @applitools/eyes-cypress

// Let all the configurations magically happen
npx eyes-setup

// Set your API key
export APPLITOOLS_API_KEY=<your_key>
```

Keep in mind that in order to use ```npx``` you may need an updated version of npm.

## Version 1 Test Results

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/results-v1.png"></p>

## Version 2 Test Results

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/results-v2.png"></p>

## Challenges

Just like with the pure Cypress tests, we want version 2 of the application to make our tests fail but with Applitools we are catching things that Cypress missed as well as validating functionality with much less code. The Applitools tests also increase maintainability since navigating the app is much less fragile than specific validations. Once a fix has been pushed to an application, you can simply execute your tests again with hopefully minimal code changes.

This test suite is made up of the following five tests, each with their own unique challenges:

### Login Page UI Elements Test
This test was designed to verify that all the elements on the first version of the app exist and display properly.
- Using Applitools, this test was reduced from **73 lines of code** to **14 lines**. A single screenshot is used to verify every element on the page.
- You can see in the image below that Applitools identifies the errors we found earlier with Cypress as well as other issues like the formatting of the Remember Me toggle.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/login-form.png"></p>
    
### Data-Driven Test
Different combinations of inputs are used to test authentication. It's a simple app and will succeed with any username and password, but only if both are provided.
- The amount of code for this test was similar since it still relied on Cypress for login attempts.
- Applitools displays the issues found before as well as highlighting more formatting issues.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/login-form-error.png"></p>
    
### Table Sort Test
This was a breeze in Applitools. The task is sort a table in ascending order of the amount column and then verify the arrangement and data of each row. 
- Using Applitools, this test was reduced from **92 lines of code** to **19 lines**. There are two tests, one screenshot before sorting the table and one after.
- There are a lot of errors highlighted in the image below that show how incorrectly the table has been sorted. There's no need to have excessive information about each diverse element within each row.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/sorted-table.png"></p>
    
### Canvas Chart Test
I assumed when I started this project that there would be a specification that couldn't be tested functionally. This was the one, in the form of a bar graph displayed within an inaccessible canvas element.
- It was easy to validate the graph with Applitools, although I did have to add a couple hard waits in order to make sure the data was finishing rendering.
- The image below shows how Applitools found the issue with the January and July values in 2018.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/chart-with-2019.png"></p>

### Dynamic Content Test
This test is used to check for two flashing advertisements.
- I utilized a Layout Region in Applitools to indicate that I didn't care about the content of the flashing ads, only the layout. In the image below you can see that it identifies the missing ad but approves the second even though the content is different.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Applitools/Images/layout-ads.png"></p>
