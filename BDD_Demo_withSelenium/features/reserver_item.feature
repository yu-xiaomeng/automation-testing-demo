Feature: reserver item
   I can reserve something from freewheelers website

Scenario: reserver an item on home page
  Given I have logged in
  And I am on the home page
  When I click Reserve Item button
  Then I can see Item Reserved!

   