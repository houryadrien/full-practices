import { Fleet } from "../../../domain/fleet.domain.js";
import { Vehicle } from "../../../domain/vehicle.domain.js";
import { Location } from "../../../domain/location.domain.js";

const GET_REQUEST = "SELECT * FROM fleets WHERE id = ?";
const INSERT_REQUEST = "INSERT OR REPLACE INTO fleets(id) VALUES (?)";

export class SqliteFleetRepository {

  constructor(db) {
    this.db = db;
  }

  async save(fleet) {
    await this.db.run(
      "INSERT OR IGNORE INTO fleets(id) VALUES (?)",
      fleet.fleetId
    );
    for (const vehicle of fleet.vehicles.values()) {
      await this.db.run(
        "INSERT OR IGNORE INTO vehicles(plate_number, fleet_id) VALUES (?, ?)",
        vehicle.plateNumber,
        fleet.fleetId
      );
      if (vehicle.location) {
        await this.db.run(
          "INSERT OR REPLACE INTO locations(plate_number, lat, lng, alt) VALUES (?, ?, ?, ?)",
          vehicle.plateNumber,
          vehicle.location.lat,
          vehicle.location.lng,
          vehicle.location.alt
        );
      }
    }
  }

  async getById(fleetId) {
    const row = await this.db.get(
      "SELECT * FROM fleets WHERE id = ?",
      fleetId
    );
    if (!row) return null;
    const fleet = new Fleet(row.id);
    const vehicles = await this.db.all(
      "SELECT * FROM vehicles WHERE fleet_id = ?",
      fleetId
    );
    for (const v of vehicles) {
      const vehicle = new Vehicle(v.plate_number);
      const location = await this.db.get(
        "SELECT * FROM locations WHERE plate_number = ?",
        v.plate_number
      );
      if (location) {
        vehicle.location = new Location(
          location.lat,
          location.lng,
          location.alt
        );
      }
      fleet.vehicles.set(vehicle.plateNumber, vehicle);
    }
    return fleet;
  }

}