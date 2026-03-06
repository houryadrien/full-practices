// parkVehicle class

import { Location } from "../../domain/location.domain.js";

export class ParkVehicleCommand {

  VEHICULE_NOT_IN_FLEET = "Vehicle not registered in this fleet";

  constructor(
    fleetRepository
  ) {
    this.fleetRepository = fleetRepository;
  }

  async save(fleetId, plateNumber, lat, lng, alt = null) {
    const fleet = await this.fleetRepository.getById(fleetId);
    const vehicle = fleet.getVehicle(plateNumber);
    if (!vehicle) {
      throw new Error(this.VEHICULE_NOT_IN_FLEET);
    }
    const location = new Location(lat, lng, alt);
    vehicle.location = location;
    this.fleetRepository.save(fleet);
  }

}