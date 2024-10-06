import fs from 'fs'

export interface Location { // this may not need exported
    path: string;
    x:    number;
    y:    number;
    z:    number;
}

let location_cache: Location[];

// wrap image state in a cache to prevent fs loads constantle
const load_locations = (): Location[]  => {
    if(!location_cache){
        return JSON.parse(fs.readFileSync('temp-locations.json', 'utf8'));
    }
    
    return location_cache;
}

export default load_locations;