import fs from "fs";

export interface Location {
    // this may not need exported
    path: string;
    point: Point;
}

export interface Point {
    x: number;
    y: number;
    z: number;
}

let location_cache: Location[];

// wrap image state in a cache to prevent fs loads constantly
const load_locations = (): Location[] => {
    if (!location_cache) {
        return JSON.parse(fs.readFileSync("temp-locations.json", "utf8"));
    }

    return location_cache;
};

// dist between 2 points in 3d space
export const eucDist = (point1: Point, point2: Point): number => {
    const x1 = point1.x;
    const y1 = point1.y;
    const z1 = point1.z;

    const x2 = point2.x;
    const y2 = point2.y;
    const z2 = point2.z;

    const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
    );

    return distance;
};

export function haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) {
    const toRadians = (degrees: number): number => {
        return degrees * (Math.PI / 180);
    };

    const R = 6371; // radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // in km

    return distance;
}

export function geoDistance(guess: Point, actual: Point): number {
    const guessLat = guess.x; // this needs to match frontend (x=lat, y=lon etc)
    const guessLon = guess.y;

    const actualLat = actual.x;
    const actualLon = actual.y;

    const actualHeight = actual.z / 1000;
    const guessHeight = guess.z / 1000;

    const d = haversine(guessLat, guessLon, actualLat, actualLon);
    const t = Math.sqrt(Math.pow(actualHeight, 2) + Math.pow(d, 2));

    console.log("");

    return Math.sqrt(
        Math.pow(guessHeight, 2) +
        Math.pow(t, 2) -
        2 *
        guessHeight *
        t *
        Math.cos(Math.PI / 2.0 - Math.asin(actualHeight / t))
    ) * 1000;
}

function alexDistance(guess: Point, actual: Point): number {
    const guessLat = guess.x; // this needs to match frontend (x=lat, y=lon etc)
    const guessLon = guess.y;

    const actualLat = actual.x;
    const actualLon = actual.y;

    const actualHeight = actual.z / 1000;
    const guessHeight = guess.z / 1000;

    const c =
        haversine(guessLat, guessLon, actualLat, actualLon) +
        Math.pow(Math.abs(actualHeight - guessHeight), 2);

    return Math.sqrt(c) * 1000;
}


export default load_locations;