export class Fleet {

  VEHICLE_ALREADY_REGISTERD = "Vehicle already registered in this fleet";

  constructor(
    fleetId, 
    userId
  ) {
    this.fleetId = fleetId;
    this.userId = userId;
    this.vehicles = new Map();
  }

  registerVehicle(vehicle) {
    if (this.vehicles.has(vehicle.plateNumber)) {
      throw new Error(this.VEHICLE_ALREADY_REGISTERD);
    }
    this.vehicles.set(vehicle.plateNumber, vehicle);
  }

  getVehicle(plateNumber) {
    return this.vehicles.get(plateNumber);
  }

}