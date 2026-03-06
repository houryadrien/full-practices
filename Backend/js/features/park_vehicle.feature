Feature: Park a vehicle

Scenario: Successfully park a vehicle
  Given PARK - My fleet MAP
  And PARK - A vehicle MAP
  And PARK - I have registered this vehicle into my fleet MAP
  And PARK - A location MAP
  When PARK - I park my vehicle at this location MAP
  Then PARK - The known location of my vehicle should verify this location MAP