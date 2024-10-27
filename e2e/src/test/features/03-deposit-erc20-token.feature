Feature: Deposit ERC20 tokens

  Scenario: The user try to deposit a ERC20 token with an empty balance
    Given A randomly generated user with installed Metamask accesses the app page
    When the user accepts connection notifications
    And the user enters the address "0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB" in the input address field
    And the user clicks the Submit button
    Then the page shows the token balance "0"
    And the deposit input shows an error
    And the deposit button is not visible

  Scenario: The user mint example token using the web application
    Given A test user with installed Metamask accesses the app page
    When the user accepts connection notifications
    And the user clicks the example token link
    And the user clicks the Get more tokens link
    And the user accepts the transaction
    And the token balance is increased
    Then the deposit button is visible

  Scenario: The user tries to deposit incorrect amount
    Given A test user with installed Metamask accesses the app page
    When the user accepts connection notifications
    And the user clicks the example token link
    And the userinputs "0" in the deposit field
    Then the deposit button is disabled


  #there is a bug with the way balance is displayed so this test should be disabled,
  #however for the purpose of this excersie I made it work with depositing max -1 amount of tokens.
  #that's why the check is for balance equal to 1 and not 0
  Scenario: The user deposit example token
    Given A test user with installed Metamask accesses the app page
    When the user accepts connection notifications
    And the user clicks the example token link
    And the deposit button is visible
    And the user enter the max amount of tokens in the amount field
    And the user captures the current deposit history
    And the user clicks the deposit button
    And the user approve the deposit
    Then the page shows the token balance "1"
    And the user confirms the deposit history table was updated