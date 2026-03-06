import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { Fleet } from "../../src/domain/fleet.domain.js";
import { Vehicle } from "../../src/domain/vehicle.domain.js";
import { Location } from "../../src/domain/location.domain.js";
import { SqliteFleetRepository } from "../../src/infra/bdd/sqlite/sqlite.bdd.js";
import { connectDb } from "../../database/sqlite/sqlite.bdd.js";
import { RegisterVehicleCommand } from "../../src/app/commands/registrerVehicle.commands.js";

let fleet;
let vehicle;
let location;
let repository;
let command;

const TEMP_DB_IN_MEMORY = ":memory:";

Before(async function () {
  const db = await connectDb(TEMP_DB_IN_MEMORY);
  repository = new SqliteFleetRepository(db);
  command = new RegisterVehicleCommand(repository);
});

Given("REGISTER - My fleet SQLITE", async function () {
  fleet = new Fleet("fleet1", "user1");
  await repository.save(fleet);;
});

Given("REGISTER - A vehicle SQLITE", function () {
  vehicle = new Vehicle("AA-123-BB");
});

When("REGISTER - I register this vehicle into my fleet SQLITE", async function () {
  await command.save(fleet.fleetId, vehicle.plateNumber)
});

Then("REGISTER - This vehicle should be part of my vehicle fleet SQLITE", async function () {
  const savedFleet = await repository.getById("fleet1");
  assert(savedFleet.getVehicle(vehicle.plateNumber));
});