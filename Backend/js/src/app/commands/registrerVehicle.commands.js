// Register vehicle class

import { Vehicle } from "../../domain/vehicle.domain.js";

export class RegisterVehicleCommand {

  constructor(
    fleetRepository
  ) {
    this.fleetRepository = fleetRepository;
  }

  async save(fleetId, plateNumber) {
    const fleet = await this.fleetRepository.getById(fleetId);
    const vehicle = new Vehicle(plateNumber);
    fleet.registerVehicle(vehicle);
    await this.fleetRepository.save(fleet);
  }

}