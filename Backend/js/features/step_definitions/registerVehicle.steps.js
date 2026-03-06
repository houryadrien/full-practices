import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { Fleet } from "../../src/domain/fleet.domain.js";
import { Vehicle } from "../../src/domain/vehicle.domain.js";
import { FleetRepository } from "../../src/infra/map/fleetRepository.map.js";
import { RegisterVehicleCommand } from "../../src/app/commands/registrerVehicle.commands.js";


let fleet;
let vehicle;
let repository = new FleetRepository();
let command = new RegisterVehicleCommand(repository);

Given("REGISTER - My fleet MAP", async function () {
  fleet = new Fleet("fleet1", "user1");
  await repository.save(fleet);;
})

Given("REGISTER - A vehicle MAP", function () {
  vehicle = new Vehicle("AA123BB");
})

When("REGISTER - I register this vehicle into my fleet MAP", async function () {
    await command.save(fleet.fleetId, vehicle.plateNumber)

})

Then("REGISTER - This vehicle should be part of my vehicle fleet MAP", async function () {
  const savedFleet = await repository.getById("fleet1");
  assert(savedFleet.getVehicle(vehicle.plateNumber));
})