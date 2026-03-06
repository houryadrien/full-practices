Feature: Register a vehicle

  Scenario: I can register a vehicle
    Given REGISTER - My fleet SQLITE
    And REGISTER - A vehicle SQLITE
    When REGISTER - I register this vehicle into my fleet SQLITE
    Then REGISTER - This vehicle should be part of my vehicle fleet SQLITE