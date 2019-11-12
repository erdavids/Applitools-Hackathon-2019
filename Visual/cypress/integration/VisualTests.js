/// <reference types="cypress" />


/////////////
/*
** URLS USED
*/
/////////////

// Version 1 (Working Versions)
const main_app = 'https://demo.applitools.com/hackathon.html'
const ad_page = 'https://demo.applitools.com/hackathon.html?showAd=true'

// Version 2 (Broken Versions)
// const main_app = 'https://demo.applitools.com/hackathonV2.html'
// const ad_page = 'https://demo.applitools.com/hackathonV2.html?showAd=true'

/////////////
/* 
** CUSTOM COMMANDS
*/
/////////////

// Adding a cypress function for easier logins (Accepts empty strings)
Cypress.Commands.add('login', (username, password) => {
    if (username != '') {
        cy.get('#username')
            .type(username)
    }

    if (password != '') {
        cy.get('#password')
            .type(password)
    }

    cy.get('#log-in')
        .click()
})

// Clears the input fields for username and password
Cypress.Commands.add('clearauth', () => {
    cy.get('#username')
        .clear()

    cy.get('#password')
        .clear()
})


//////////////
/*
** TRADITIONAL TESTS
*/
//////////////

// Open the application before every test
beforeEach(() => {
    cy.visit(main_app)
})

// Verify the Login Page's Appearance
describe('Login Page UI Elements Test', function() {

    it('displays all elements on the authentication page', () => {

        cy.eyesOpen({
            appName: 'Applitools Hackathon Demo App',
            testName: 'Login Page UI Elements Test',
            browser: { width: 800, height: 600 },
        });

        cy.eyesCheckWindow('Authentication Page');

        cy.eyesClose();
    })
})

// Test different login attempts
describe('Data-Driven Test', function() {
    it('fails authentication without both username and password', () => {
        cy.eyesOpen({
            appName: 'Applitools Hackathon Demo App',
            testName: 'Data-Driven Test',
            browser: { width: 800, height: 600 },
        });

        cy.login('', '')
        cy.eyesCheckWindow('Authentication Attempt - No Username, No Password')
        cy.clearauth()

        cy.login('', 'test-password')
        cy.eyesCheckWindow('Authentication Attempt - No Username')
        cy.clearauth()

        cy.login('test-username', '')
        cy.eyesCheckWindow('Authentication Attempt - No Password')
        cy.clearauth()

        cy.login('test-username', 'test-password')
        cy.eyesCheckWindow('Successful Authentication Attempt')

        cy.eyesClose();
    })
})

// Verify table data after sorting by amount column
describe('Table Sort Test', function() {
    it('maintains data integrity with table sorted by ascending amounts', () => {
        cy.eyesOpen({
            appName: 'Applitools Hackathon Demo App',
            testName: 'Table Sort Test',
            browser: { width: 800, height: 600 },
        });

        cy.login('test.username', 'test.password')

        cy.eyesCheckWindow('Recent Transactions - Unsorted');

        // Sort by ascending order
        cy.get('#amount').click();

        cy.eyesCheckWindow('Recent Transactions - Sorted by Ascending Amount');

        cy.eyesClose();
    })
})

// Verify the data of the expenses bar chart
describe('Canvas Chart Test', function() {
    it('displays an expenses chart with the option to add on', () => {
        cy.login('test-username', 'test-password')
        cy.get('#showExpensesChart').click()

        cy.eyesOpen({
            appName: 'Applitools Hackathon Demo App',
            testName: 'Canvas Chart Test',
            browser: { width: 800, height: 600 },
        });

        cy.wait(2000)

        cy.eyesCheckWindow('Expenses Comparison (2017, 2018)')

        // This test cannot be automated with Cypress alone
        // The chart is within an inaccessible canvas element

        // The next dataset can be added, but cannot be validated
        cy.get('#addDataset').click()

        cy.wait(2000)

        cy.eyesCheckWindow('Expenses Comparison (2017, 2018, 2019)')

        cy.eyesClose();
    })
})

// Verify the displayed flashing advertisements
describe('Dynamic Content Test', function() {
    it('displays both flashing advertisements', () => {
        cy.eyesOpen({
            appName: 'Applitools Hackathon Demo App',
            testName: 'Dynamic Content Test',
            browser: { width: 800, height: 600 },
        });

        cy.visit(ad_page)

        cy.login('test-username', 'test-password');

        cy.eyesCheckWindow('Two Flashing Advertisements')

        cy.eyesClose();
    })
})
