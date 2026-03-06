// Create vehicle class

import { Vehicle } from "../../domain/vehicle.domain.js";

export class CreateVehicleCommand {

  constructor(
    vehicleRepository
  ) {
    this.vehicleRepository = vehicleRepository;
  }

  save(plateNumber) {
    this.vehicleRepository.getById(plateNumber);
    const vehicle = new Vehicle(plateNumber);
    this.vehicleRepository.save(vehicle);
  }

}