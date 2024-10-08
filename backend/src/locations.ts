import fs from 'fs'

export interface Location { // this may not need exported
    path: string;
    point: Point
}

export interface Point {
    x:    number;
    y:    number;
    z:    number;
}

let location_cache: Location[];

// wrap image state in a cache to prevent fs loads constantly
const load_locations = (): Location[]  => {
    if(!location_cache){
        return JSON.parse(fs.readFileSync('temp-locations.json', 'utf8'));
    }
    
    return location_cache;
}

// dist between 2 points in 3d space
export const eucDist =(point1: Point, point2: Point): number => {
    const x1 = point1.x;
    const y1 = point1.y;
    const z1 = point1.z;


    const x2 = point2.x;
    const y2 = point2.y;
    const z2 = point2.z;


    const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + 
        Math.pow(y2 - y1, 2) + 
        Math.pow(z2 - z1, 2)
    );

    return distance;
}

export default load_locations;