Feature: Park a vehicle

Scenario: Successfully park a vehicle

  Given PARK - My fleet SQLITE
  And PARK - A vehicle SQLITE
  And PARK - I have registered this vehicle into my fleet SQLITE
  And PARK - A location SQLITE
  When PARK - I park my vehicle at this location SQLITE
  Then PARK - The known location of my vehicle should verify this location SQLITE