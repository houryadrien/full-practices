// Fleet repo - map

export class FleetRepository {

    FLEET_NOT_FOUND = "Fleet not found";

    constructor() {
        this.fleets = new Map();
    }

    save(fleet) {
        this.fleets.set(fleet.fleetId, fleet);
    }

    getById(fleetId) {
        const fleet = this.fleets.get(fleetId);
        if (!fleet) {
            throw new Error(this.FLEET_NOT_FOUND);
        }
        return fleet;
    }

    getList() {
        return this.fleets.get();
    }

}