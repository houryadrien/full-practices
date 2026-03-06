// vehicle class

export class Vehicle {

  VEHICULE_ALREADY_PRKED = "Vehicle already parked at this location";

  constructor(
    plateNumber
  ) {
    this.plateNumber = plateNumber;
    this.locations = [];
  }

  park(location) {
    const lastLocation = this.getCurrentLocation();
    if (lastLocation && lastLocation.equals(location)) {
      throw new Error(this.VEHICULE_ALREADY_PRKED);
    }
    this.locations.push(location);
  }

  getCurrentLocation() {
    return this.locations[this.locations.length - 1] || null;
  }

}