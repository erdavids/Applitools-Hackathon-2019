/// <reference types="cypress" />


/////////////
/*
** URLS USED
*/
/////////////

// Version 1 (Working Versions)
// const main_app = 'https://demo.applitools.com/hackathon.html'
// const ad_page = 'https://demo.applitools.com/hackathon.html?showAd=true'

// Version 2 (Broken Versions)
const main_app = 'https://demo.applitools.com/hackathonV2.html'
const ad_page = 'https://demo.applitools.com/hackathonV2.html?showAd=true'

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

    it('has a logo', () => {
        cy.get('.logo-w > a > img')
            .should('be.visible')
    })
    it('has a Login Form header', () => {
        cy.get('.auth-header')
            .should('be.visible')
            .should('contain', 'Login Form')
    })
    it('has a username field', () => {
        cy.get('#username')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Enter your username')
    })

    it('has a password field', () => {
        cy.get('#password')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Enter your password')
    })

    it('has a Log In button', () => {
        cy.get('#log-in')
            .should('be.visible')
    })

    it('has a Remember Me option', () => {
        cy.get('.form-check-label')
            .should('be.visible')
    })

    it('has a Twitter social media link', () => {
        cy.get('[style="display: inline-block; margin-bottom:4px;"] > img')
            .should('be.visible')
            .should('have.attr', 'src', 'img/social-icons/twitter.png')
    })  

    it('has a Facebook social media link', () => {
        cy.get(':nth-child(2) > img')
            .should('be.visible')
            .should('have.attr', 'src', 'img/social-icons/facebook.png')
    })

    it('has a LinkedIn social media link', () => {
        cy.get(':nth-child(3) > img')
            .should('be.visible')
            .should('have.attr', 'src', 'img/social-icons/linkedin.png')
    })
})

// Test different login attempts
describe('Data-Driven Test', function() {
    it('fails login without username or password provided', () => {
        cy.login('', '')

        cy.contains('must be present')
            .should('be.visible')
            .should('have.text', 'Both Username and Password must be present ')
    })

    it('fails login with only username provided', () => {
        cy.login('test-username', '')

        cy.contains('must be present')
            .should('be.visible')
            .should('have.text', 'Password must be present')
    })

    it('fails login with only password provided', () => {
        cy.login('', 'test-password')

        cy.contains('must be present')
            .should('be.visible')
            .should('have.text', 'Username must be present')
    })

    it('successfully logs in with both username and password', () => {
        cy.login('test-username', 'test-password')

        // URL is technically accessible without authentication
        cy.url().should('be', 'https://demo.applitools.com/hackathonApp.html')
    })
})


describe('Table Sort Test', function() {
    it('maintains data integrity with table sorted by ascending amounts', () => {
        cy.login('test.username', 'test.password')

        // Record the data in each row of the recent transactions
        var transaction_data = [
            ['status-pill smaller green', 'Complete', 'Today', 'smaller lighter', '1:52am', 'img/company1.png', 'height: 25px', 'Starbucks coffee', 'badge badge-success', 'Restaurant / Cafe', '+ 1,250.00 USD', 'text-success'],
            ['smaller red', 'Declined', 'Jan 19th', 'smaller lighter', '3:22pm', 'img/company2.png', 'height: 25px', 'Stripe Payment Processing', 'badge badge-danger', 'Finance', '+ 952.23 USD', 'text-success'],
            ['smaller yellow', 'Pending', 'Yesterday', 'smaller lighter', '7:45am', 'img/company3.png', 'height: 25px', 'MailChimp Services', 'badge badge-warning', 'Software', '- 320.00 USD', 'text-danger'],
            ['smaller yellow', 'Pending', 'Jan 23rd', 'smaller lighter', '2:7pm', 'img/company6.png', 'height: 25px', 'Shopify product', 'badge badge-primary', 'Shopping', '+ 17.99 USD', 'text-success'],
            ['smaller green', 'Complete', 'Jan 7th', 'smaller lighter', '9:51am', 'img/company4.png', 'height: 25px', 'Ebay Marketplace', 'badge badge-danger', 'Ecommerce', '- 244.00 USD', 'text-danger'],
            ['smaller yellow', 'Pending', 'Jan 9th', 'smaller lighter', '7:45pm', 'img/company7.png', 'height: 25px', ' Templates Inc', 'badge badge-primary', 'Business', '+ 340.00 USD', 'text-success']
        ]

        console.log(transaction_data[0][0])

        cy.get('#transactionsTable > tbody > tr')
            // For each row
            .each(($el, index, $list) => {

                // Status
                var test = parseInt(index)

                // Status
                cy.wrap($el).find('td > span').eq(0).should('have.class', transaction_data[index][0])
                cy.wrap($el).find('td > span').eq(1).should('have.text', transaction_data[index][1])

                // Date
                cy.wrap($el).find('td > span').eq(2).should('have.text', transaction_data[index][2])
                cy.wrap($el).find('td > span').eq(3).should('have.class', transaction_data[index][3])
                cy.wrap($el).find('td > span').eq(3).should('have.text', transaction_data[index][4])

                // Description
                cy.wrap($el).find('td > img').should('have.attr', 'src', transaction_data[index][5])
                cy.wrap($el).find('td > img').invoke('attr', 'style').should('be', transaction_data[index][6]);
                cy.wrap($el).find('td > span').eq(4).should('have.text', transaction_data[index][7])

                // Category
                cy.wrap($el).find('td > a').should('have.class', transaction_data[index][8])
                cy.wrap($el).find('td > a').should('have.text', transaction_data[index][9])
                
                // Amount
                cy.wrap($el).find('td > span').eq(5).should('have.text', transaction_data[index][10])
                cy.wrap($el).find('td > span').eq(5).should('have.class', transaction_data[index][11])


            })

        // Sort by ascending order
        cy.get('#amount').click()

        var transaction_data_sorted_by_amount = [
            ['smaller yellow', 'Pending', 'Yesterday', 'smaller lighter', '7:45am', 'img/company3.png', 'height: 25px', 'MailChimp Services', 'badge badge-warning', 'Software', '- 320.00 USD', 'text-danger'],
            ['smaller green', 'Complete', 'Jan 7th', 'smaller lighter', '9:51am', 'img/company4.png', 'height: 25px', 'Ebay Marketplace', 'badge badge-danger', 'Ecommerce', '- 244.00 USD', 'text-danger'],
            ['smaller yellow', 'Pending', 'Jan 23rd', 'smaller lighter', '2:7pm', 'img/company6.png', 'height: 25px', 'Shopify product', 'badge badge-primary', 'Shopping', '+ 17.99 USD', 'text-success'],
            ['smaller yellow', 'Pending', 'Jan 9th', 'smaller lighter', '7:45pm', 'img/company7.png', 'height: 25px', ' Templates Inc', 'badge badge-primary', 'Business', '+ 340.00 USD', 'text-success'],
            ['smaller red', 'Declined', 'Jan 19th', 'smaller lighter', '3:22pm', 'img/company2.png', 'height: 25px', 'Stripe Payment Processing', 'badge badge-danger', 'Finance', '+ 952.23 USD', 'text-success'],
            ['status-pill smaller green', 'Complete', 'Today', 'smaller lighter', '1:52am', 'img/company1.png', 'height: 25px', 'Starbucks coffee', 'badge badge-success', 'Restaurant / Cafe', '+ 1,250.00 USD', 'text-success']
        ]

        cy.get('#transactionsTable > tbody > tr')
            // For each row
            .each(($el, index, $list) => {

                // Status
                var test = parseInt(index)

                // Status
                cy.wrap($el).find('td > span').eq(0).should('have.class', transaction_data_sorted_by_amount[index][0])
                cy.wrap($el).find('td > span').eq(1).should('have.text', transaction_data_sorted_by_amount[index][1])

                // Date
                cy.wrap($el).find('td > span').eq(2).should('have.text', transaction_data_sorted_by_amount[index][2])
                cy.wrap($el).find('td > span').eq(3).should('have.class', transaction_data_sorted_by_amount[index][3])
                cy.wrap($el).find('td > span').eq(3).should('have.text', transaction_data_sorted_by_amount[index][4])

                // Description
                cy.wrap($el).find('td > img').should('have.attr', 'src', transaction_data_sorted_by_amount[index][5])
                cy.wrap($el).find('td > img').invoke('attr', 'style').should('be', transaction_data_sorted_by_amount[index][6]);
                cy.wrap($el).find('td > span').eq(4).should('have.text', transaction_data_sorted_by_amount[index][7])

                // Category
                cy.wrap($el).find('td > a').should('have.class', transaction_data_sorted_by_amount[index][8])
                cy.wrap($el).find('td > a').should('have.text', transaction_data_sorted_by_amount[index][9])
                
                // Amount
                cy.wrap($el).find('td > span').eq(5).should('have.text', transaction_data_sorted_by_amount[index][10])
                cy.wrap($el).find('td > span').eq(5).should('have.class', transaction_data_sorted_by_amount[index][11])
            })

    })
    


})

describe('Canvas Chart Test', function() {
    it('has a logo', () => {
        cy.login('test-username', 'test-password')
        cy.get('#showExpensesChart').click()

        cy.get('#canvas')
            .should('be.visible')

        // This test cannot be automated with Cypress alone
        // The chart is within an inaccessible canvas element

        // The next dataset can be added, but cannot be validated
        cy.get('#addDataset').click()
    })
})

describe('Dynamic Content Test', function() {
    it('displays the first flashing advertisement', () => {
        // Version 1 (Working Version)
        cy.visit(ad_page)

        cy.login('test-username', 'test-password')

        cy.get('#flashSale > img')
            .should('be.visible')

        cy.get('#flashSale2 > img')
            .should('be.visible')
    })
})