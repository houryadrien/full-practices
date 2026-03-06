Feature: Register a vehicle

  Scenario: I can register a vehicle
    Given REGISTER - My fleet MAP
    And REGISTER - A vehicle MAP
    When REGISTER - I register this vehicle into my fleet MAP
    Then REGISTER - This vehicle should be part of my vehicle fleet MAP