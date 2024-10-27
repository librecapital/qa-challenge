Feature: The application works only with the Sepolia network

    Scenario: The user accesses the page with Metamask connected to Sepolia network
        Given A randomly generated user with installed Metamask accesses the app page
        When the user accepts connection notifications
        Then the page shows the account address
        And the page shows the input address field
        And the page doesnt show a network error message

    Scenario: The user accesses the page with Metamask connected to Mainnet network
        Given A user swithces network to "Ethereum"
        And A randomly generated user with installed Metamask accesses the app page
        When the user accepts connection notifications
        Then the page shows a network error message
        And the page shows the switch network button
        And the page doesnt show the input address field

    Scenario: The user accesses the page with Metamask connected to Mainnet network and uses the switch network button
        Given A user swithces network to "Ethereum"
        And A randomly generated user with installed Metamask accesses the app page
        When the user accepts connection notifications
        And the user clicks the switch network button
        And the user confirms the switch network
        Then the page shows the input address field
        And the page doesnt show a network error message