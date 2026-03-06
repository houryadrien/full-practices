import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { Fleet } from "../../src/domain/fleet.domain.js";
import { Vehicle } from "../../src/domain/vehicle.domain.js";
import { Location } from "../../src/domain/location.domain.js";
import { FleetRepository } from "../../src/infra/map/fleetRepository.map.js";
import { ParkVehicleCommand } from "../../src/app/commands/parkVehicle.commands.js";
import { RegisterVehicleCommand } from "../../src/app/commands/registrerVehicle.commands.js";


let fleet;
let vehicle;
let location;
let command;
const fleetRepository = new FleetRepository();

Given("PARK - My fleet MAP", function () {
  fleet = new Fleet("fleet11", "Adh");
  command = new ParkVehicleCommand(fleetRepository);
})

Given("PARK - A vehicle MAP", function () {
  vehicle = new Vehicle("BS829RP");
});

Given("PARK - I have registered this vehicle into my fleet MAP", function () {
  fleet.registerVehicle(vehicle);
});

Given("PARK - A location MAP", function () {
  location = new Location(48.85, 2.35, 123);
});

When("PARK - I park my vehicle at this location MAP", function () {
  vehicle.park(location);
});

Then("PARK - The known location of my vehicle should verify this location MAP", function () {
  const currentLocation = vehicle.getCurrentLocation();
  assert.ok(currentLocation.equals(location));
});