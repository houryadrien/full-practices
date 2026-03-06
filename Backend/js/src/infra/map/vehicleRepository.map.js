// Vehicle repo - map

export class VehicleRepository {

    VEHICLE_ALREADY_EXISTS = "Vehicle already exists";

    constructor() {
        this.vehicles = new Map();
    }

    save(fleet) {
        this.vehicles.set(fleet.fleetId, fleet);
    }

    getById(vehicleId) {
        const vehicle = this.vehicles.get(vehicleId);
        if (vehicle) {
            throw new Error(this.VEHICLE_ALREADY_EXISTS);
        }
    }

    getList() {
        return this.vehicles.get();
    }

}