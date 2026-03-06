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
command = new ParkVehicleCommand(fleetRepository);  
let commandRegister = new RegisterVehicleCommand(fleetRepository);

Given("PARK - My fleet MAP", async function () {
  fleet = new Fleet("fleet11", "Adh");
  fleetRepository.save(fleet);
})

Given("PARK - A vehicle MAP", function () {
  vehicle = new Vehicle("BS829RP");
});

Given("PARK - A location MAP", function () {
  location = new Location(48.85, 2.35, 123);
});

Given("PARK - I have registered this vehicle into my fleet MAP", async function () {
    await commandRegister.save(fleet.fleetId, vehicle.plateNumber)
});

When("PARK - I park my vehicle at this location MAP", async function () {
  await command.save(
      fleet.fleetId,
      vehicle.plateNumber,
      location.lng,
      location.lat,
      location.alt
    );
});

Then("PARK - The known location of my vehicle should verify this location MAP", async function () {
  const savedFleet = await fleetRepository.getById("fleet11");
  const vehicule = savedFleet.getVehicle(vehicle.plateNumber);
  assert(vehicule.location.equals(location))
});