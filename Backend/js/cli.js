import { Fleet } from "./src/domain/fleet.domain.js";
import { FleetRepository } from "./src/infra/map/fleetRepository.map.js";
import { SqliteFleetRepository } from "./src/infra/bdd/sqlite/sqlite.bdd.js";
import { VehicleRepository } from "./src/infra/map/vehicleRepository.map.js";
import { RegisterVehicleCommand } from "./src/app/commands/registrerVehicle.commands.js";
import { ParkVehicleCommand } from "./src/app/commands/parkVehicle.commands.js";
import { CreateVehicleCommand } from "./src/app/commands/createVehicle.commands.js";

//MAP const
const CREATE_FLEET = "create-fleet";
const CREATE_VEHICLE = "create-vehicle";
const REGISTER_VEHICLE = "register-vehicle";
const LOCALIZE_VEHICLE = "localize-vehicle";
const VEHICLE_REGISTERED = "Vehicle registered";
const VEHICLE_PARKED =  "Vehicle parked";
const VEHICLE_CREATED =  "Vehicle created";
//SQLITE const
const CREATE_FLEET_SQLITE = "create-fleet";
const CREATE_VEHICLE_SQLITE = "create-vehicle";
const REGISTER_VEHICLE_SQLITE = "register-vehicle";
const LOCALIZE_VEHICLE_SQLITE = "localize-vehicle";
// GLOBAL const
const PREFIX_FLEET = "fleet-";
const DEFAULT_ERROR = "Unknow command, please retry.";

// REPO
const db = await connectDb();
const sqliteFleetRepository = new SqliteFleetRepository(db);
const fleetRepository = new FleetRepository();
const vehicleRepository = new VehicleRepository();

const args = process.argv.slice(2);
const command = args[0];

switch (command) {

  // MAP ------------------
  case CREATE_FLEET:
    const userId_map = args[1];
    const fleetId_map =  PREFIX_FLEET+ Math.floor(Math.random() * 10000);
    const fleet_map = new Fleet(fleetId_map, userId_map);
    fleetRepository.save(fleet_map);
    console.log(fleetId_map);;
    break;
   
  case CREATE_VEHICLE:
    new CreateVehicleCommand(vehicleRepository)
      .save(args[1], args[2]);
    console.log(VEHICLE_CREATED);
    break;  

  case REGISTER_VEHICLE:
    new RegisterVehicleCommand(fleetRepository).save(args[1], args[2]);
    console.log(VEHICLE_REGISTERED);
    break;

  case LOCALIZE_VEHICLE:
    new ParkVehicleCommand(fleetRepository)
      .save(
        args[1],
        args[2],
        Number(args[3]),
        Number(args[4]),
        args[5] ? Number(args[5]) : null
      );
    console.log(VEHICLE_PARKED);
    break;

  // SQLITE ---------------
  case CREATE_FLEET_SQLITE:
    const userId = args[1];
    const fleetId =  PREFIX_FLEET+ Math.floor(Math.random() * 10000);
    const fleet = new Fleet(fleetId, userId);
    sqliteFleetRepository.save(fleet);
    console.log(fleetId);;
    break;
   
  case CREATE_VEHICLE_SQLITE:
    new CreateVehicleCommand(sqliteFleetRepository)
      .save(args[1], args[2]);
    console.log(VEHICLE_CREATED);
    break;  

  case REGISTER_VEHICLE_SQLITE:
    new RegisterVehicleCommand(sqliteFleetRepository).save(args[1], args[2]);;
    console.log(VEHICLE_REGISTERED);
    break;

  case LOCALIZE_VEHICLE_SQLITE:
    new ParkVehicleCommand(sqliteFleetRepository)
      .save(
        args[1],
        args[2],
        Number(args[3]),
        Number(args[4]),
        args[5] ? Number(args[5]) : null
      );
    console.log(VEHICLE_PARKED);
    break

  default:
    console.log(DEFAULT_ERROR);

}