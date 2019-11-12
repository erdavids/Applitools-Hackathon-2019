# Applitools Hackathon 2019

This project represents a complete submission for the [Applitools Visual AI Rockstar Hackathon](https://applitools.com/hackathon).

## Tools

**Applitools** is an amazing tool that allows you to find visual differences between screenshots of an application. At some point you will set a *baseline*, or expected image, for a particular view. On future test runs, you'll compare *checkpoints* against the baseline. Applitools will show you issues that can be found with other tools, but also issues that would have been missed otherwise.

You can find out more about Applitools [here](https://applitools.com/).

**Cypress** is the greatest end-to-end testing framework for web applications that I've used. Period. It's easy to configure, executes quickly, and gives you complete control over the application running in the browser.

You can find out more about Cypress [here](https://www.cypress.io/).

## The Contest

The purpose of the hackathon is to spread the word about all the benefits Applitools can provide to existing testing frameworks. I've listed a few benefits I've seen from Applitools below:

- **Applitools lets you test the application like a user.** Functional tests are an extremely important part of the pipeline but they generally involve much greater information about the system that the user will never have. There can be a bit of a disconnect and Applitools allows you to design tests with no more information than what the user can see. A change may occur in the code that alters a view but doesn't break any tests. Applitools will pick up on the change.

- **Applitools can quickly be integrated with existing test frameworks.** This project involves a combination of Applitools and Cypress which happened easily with around 3 terminal commands and a few lines of code.

- **Applitools creates a common ground for Quality Engineers, Software Developers, and Business Owners.** While it can be hard communicating the details of unfamiliar frameworks, Applitools lets you visually point out the issues and quickly identify solutions.

## This Submission

I've done my best to create well written tests to the specifications of the contest. My project contains two directories with two differing test suites.

- **Traditional**: This suite uses only Cypress to test the demo application provided by Applitools. Cypress is an amazing tool, but the application is designed to highlight some of the pitfalls of relying on one tool.

- **Applitools**: This suite also uses Cypress but in more of a navigational capacity. Although I could have added the code to utilize Applitools while preserving the Cypress, they are designed for this project to only rely on visual validation.

I've included more documentation on each of these approaches inside their respective directories. 
