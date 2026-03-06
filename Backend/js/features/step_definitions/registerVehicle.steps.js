import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { Fleet } from "../../src/domain/fleet.domain.js";
import { Vehicle } from "../../src/domain/vehicle.domain.js";

let fleet;
let vehicle;

Given("REGISTER - My fleet MAP", function () {
  fleet = new Fleet("fleet1", "user1");
})

Given("REGISTER - A vehicle MAP", function () {
  vehicle = new Vehicle("AA123BB");
})

When("REGISTER - I register this vehicle into my fleet MAP", function () {
  fleet.registerVehicle(vehicle);
})

Then("REGISTER - This vehicle should be part of my vehicle fleet MAP", function () {
  const registeredVehicle = fleet.getVehicle("AA123BB");
  assert.ok(registeredVehicle);
})