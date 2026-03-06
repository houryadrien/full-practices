// location class

const PARAMETER_MUST_NUMBER = "Parameter must be a number";

export class Location {

    /**
    * @param {number} latitude
    * @param {number} longitude
    * @param {number|null} altitude
    */
    constructor(
        longitude, 
        latitude, 
        altitude = null
    ) {
        this.testsType(longitude, latitude, altitude);
        this.lat = latitude;
        this.lng = longitude;
        this.alt = altitude;
    } 

    /**
    * @param {Location} other
    * @returns {boolean}
    */
    equals(other) {
        let isEqual = false;
        if (
            this.lat === other.lat &&
            this.lng === other.lng &&
            this.alt === other.alt
        ) {
            isEqual = true;
        }
        return isEqual;
    }

    /**
    * @param {number} lat
    * @param {number} lng
    * @param {number|null} alt
    */
    testsType(longitude, latitude, altitude) {
        this.typeOfNumber(latitude);
        this.typeOfNumber(longitude);
        this.typeOfNumber(altitude);
    }

    /**
    * @param {number} number
    */
    typeOfNumber(number) {
        if (number) {
            if (typeof number !== "number") {
            throw new Error(PARAMETER_MUST_NUMBER);
            }
        } 
    }

    /**
    * @param {Location} location
    * @returns {boolean}
    */
    isALocation(location) {
        if (!(location instanceof Location)) {
            return false;
        }
    }
}