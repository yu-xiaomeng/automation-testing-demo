Feature: create a new account

   I need to create a new account so that I can use freewheelers

  Scenario: I can't create a new account by using a taken email
     Given the users with email 'user@example.com' exist
     And I am on the create account page
     When I create a new account using this taken email
     And I accept the Terms and Conditions
     And I click the create button
     Then I can see the error message on top

  #  Scenario: create a new account
  #    Given I am on the create account page
  #    When I fill in all the required field
  #    And I accept the Terms and Conditions
  #    And I click the create button
  #    Then I can see the success message on top


     


