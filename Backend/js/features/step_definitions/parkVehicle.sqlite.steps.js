import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { Fleet } from "../../src/domain/fleet.domain.js";
import { Vehicle } from "../../src/domain/vehicle.domain.js";
import { Location } from "../../src/domain/location.domain.js";
import { SqliteFleetRepository } from "../../src/infra/bdd/sqlite/sqlite.bdd.js";
import { connectDb } from "../../database/sqlite/sqlite.bdd.js";
import { ParkVehicleCommand } from "../../src/app/commands/parkVehicle.commands.js";
import { RegisterVehicleCommand } from "../../src/app/commands/registrerVehicle.commands.js";


let fleet;
let vehicle;
let location;
let repository;
let command;
let commandRegister;
const TEMP_DB_IN_MEMORY = ":memory:";

Before(async function () {
  const db = await connectDb(TEMP_DB_IN_MEMORY);
  repository = new SqliteFleetRepository(db);
  command = new ParkVehicleCommand(repository);
  commandRegister = new RegisterVehicleCommand(repository);
});

Given("PARK - My fleet SQLITE", async function () {
  fleet = new Fleet("fleet1", "user1");
  await repository.save(fleet);
});

Given("PARK - A vehicle SQLITE", function () {
  vehicle = new Vehicle("AA123BB");
});;

Given("PARK - A location SQLITE", function () {
  location = new Location(48.8566, 2.3522, 123)
});

Given("PARK - I have registered this vehicle into my fleet SQLITE", async function () {
  await commandRegister.save(fleet.fleetId, vehicle.plateNumber)
});

When("PARK - I park my vehicle at this location SQLITE", async function () {
   await command.save(
    fleet.fleetId,
    vehicle.plateNumber,
    location.lat,
    location.lng,
    location.alt
  );
})

Then("PARK - The known location of my vehicle should verify this location SQLITE", async function () {
    const savedFleet = await repository.getById("fleet1");
    const vehiucle = savedFleet.getVehicle(vehicle.plateNumber);
    assert(vehiucle.location.equals(location))
  }
)