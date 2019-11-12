# Traditional Approach w/ Cypress

This project is the pure Cypress approach. It was fun working with the demo app since it was clearly designed to test the limits of a functional testing framework. I think my 

## Running the Tests

In order to execute the tests, you can rely on the documentation found [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements)

An overview of the necessary commands can be found below:
```
// Installs to your ./node_modules directory
npm install cypress

// Executes your tests through the command line
npx cypress run

// Alternatively, open the Cypress application and test
npx cypress open
```

## Version 1 Test Results

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Traditional/Images/terminal-test-v1.png"></p>

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Traditional/Images/traditional-full-run.png"></p>

## Version 2 Test Results

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Traditional/Images/terminal-test-v2.png"></p>

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Traditional/Images/traditional-run-v2.png"></p>

## Challenges

You can see above that the second version of the app was not kind to my tests. The breaking changes to the application do exist deliberately, so this is a good sign that the Cypress tests are picking up on some things that are wrong, but there are also errors that it did not find. The biggest issue is the consideration of the amount of time it would take to maintain and improve these tests each time a breaking change is introduced to the application. I'll talk a little more about that in the Applitools directory.

This test suite is made up of the following five tests, each with their own unique challenges:

### Login Page UI Elements Test
This test was designed to verify that all the elements on the first version of the app exist and display properly.
- This type of test takes a lot of grunt work. Each element needs to be identified, accessed, and evaluated against acceptance criteria. It isn't so bad when every element has it's own unique identifier but that rarely happens. Additionally, verifying certain fields such as the placeholder text for inputs is extremely fragile.
- The test fails on version 2 for a multitude of reasons. Some elements have been removed completely such as the LinkedIn, username, and password icons. The placeholder text has been changed for input fields. The page is incorrectly titled the *Logout Form*. The Password label text was used to locate the element since it shares a selector with the remember me, and the test fails since the text has changed.
- My test for the *Remember Me* toggle passes, although visually the element is not formatted properly. We'll catch this later with Applitools.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Traditional/Images/login-v2.png"></p>
    
### Data-Driven Test
Different combinations of inputs are used to test authentication. It's a simple app and will succeed with any username and password, but only if both are provided.
- It was trivial to create a test like this with Cypress and an example of a test that still relies on interaction with the application. On each attempt the test verifies the text of a hopefully displayed error message, but this text is just as fragile as any. To make matters worse, the unique identifier for the error is randomly generated, making it difficult to isolate without relying on the brittle message.
- The test fails on version 2 because one of the error messages has changed and the previous substring identifier cannot find the element. Several of the login attempts still succeeding in finding an validating the error message, although they help identify another issue. 
- In several cases, although the test passes, the style and placement of the error message is obviously wrong, but not to the functional test. More examples of things we'll catch later on.
    
### Table Sort Test
This was the largest challenge of the project to work through with remaining sanity. The task is sort a table in ascending order of the amount column and then verify the arrangement and data of each row. 
- I spent a long time trying to find the best way to do this in Cypress alone. I know that it can be done in a much cleaner way than I have designed it, but I found myself looking forward to the convenience of validating the entire table in one call to Applitools. Each element of each row contains a diverse combination of classes, ids, inline styles, image sources, and colors. My eventual solution was to create a table (an array of arrays) and validate each element of each row sequentially, repeated for every row.
- The solution works well for this data set but would be useless with any changes or additions. The test does identify the issue with sorting in version 2 of the app, but the code used to get there is hardly readable and unmaintainable in light of an alternative solution like Applitools.

<p align="center"><img src="https://github.com/erdavids/Applitools-Hackathon-2019/blob/master/Traditional/Images/table-unsorted.png"></p>
    
### Canvas Chart Test
I assumed when I started this project that there would be a specification that couldn't be tested functionally. This was the one, in the form of a bar graph displayed within an inaccessible canvas element. I'm sure that there might be some way to access the chart that I am not aware of, but I spent little time here and moved on. 
- The test passes in version 1 and 2 simply because it confirms that the canvas is visible and clicks to add an additional dataset. No useful verification takes place as anything could be inside the canvas element.

### Dynamic Content Test
This test is used to check for two flashing advertisements. I think this test was designed to showcase the customizable regions for the applitools test.
- The Cypress test was able to detect the lack of the first flashing advertisement.
