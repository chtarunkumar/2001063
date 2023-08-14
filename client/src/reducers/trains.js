const stations = [
    { station: 'North Springs', stationAPI: 'NORTH SPRINGS STATION', directions: ['south'], lines: ['red'] },
    { station: 'Sandy Springs', stationAPI: 'SANDY SPRINGS STATION', directions: ['north', 'south'], lines: ['red'] },
    { station: 'Dunwoody', stationAPI: 'DUNWOODY STATION', directions: ['north', 'south'], lines: ['red'] },
    { station: 'Medical Center', stationAPI: 'MEDICAL CENTER STATION', directions: ['N', 'S'], lines: ['red'] },
    { station: 'Buckhead', stationAPI: 'BUCKHEAD STATION', directions: ['north', 'south'], lines: ['red'] },
    { station: 'Lindbergh Center', stationAPI: 'LINDBERGH STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Arts Center', stationAPI: 'ARTS CENTER STATION', directions: ["north", "south"], lines: ['red', 'gold'] },
    { station: 'Midtown', stationAPI: 'MIDTOWN STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'North Avenue', stationAPI: 'NORTH AVE STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Civic Center', stationAPI: 'CIVIC CENTER STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Peachtree Center', stationAPI: 'PEACHTREE CENTER STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Five Points', stationAPI: 'FIVE POINTS STATION', directions: ['north', 'south', 'east', 'west'], lines: ['red', 'gold', 'green', 'blue'] },
    { station: 'Garnett', stationAPI: 'GARNETT STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'West End', stationAPI: 'WEST END STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Oakland City', stationAPI: 'OAKLAND CITY STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Lakewood/ Ft. McPherson', stationAPI: 'LAKEWOOD STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'East Point', stationAPI: 'EAST POINT STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'College Park', stationAPI: 'COLLEGE PARK STATION', directions: ['north', 'south'], lines: ['red', 'gold'] },
    { station: 'Airport', stationAPI: 'AIRPORT STATION', directions: ['north'], lines: ['red', 'gold'] },
    { station: 'Lenox', stationAPI: 'LENOX STATION', directions: ['north', 'south'], lines: ['gold'] },
    { station: 'Brookhaven/ Oglethorpe', stationAPI: 'BROOKHAVEN STATION', directions: ['north', 'south'], lines: ['gold'] },
    { station: 'Chamblee', stationAPI: 'CHAMBLEE STATION', directions: ['north', 'south'], lines: ['gold'] },
    { station: 'Doraville', stationAPI: 'DORAVILLE STATION', directions: ['south'], lines: ['gold'] },
    { station: 'Indian Creek', stationAPI: 'INDIAN CREEK STATION', directions: ['west'], lines: ['blue'] },
    { station: 'Kensington', stationAPI: 'KENSINGTON STATION', directions: ['west', 'east'], lines: ['blue'] },
    { station: 'Avondale', stationAPI: 'AVONDALE STATION', directions: ['west', 'east'], lines: ['blue'] },
    { station: 'Decatur', stationAPI: 'DECATUR STATION', directions: ['west', 'east'], lines: ['blue'] },
    { station: 'East Lake', stationAPI: 'EAST LAKE STATION', directions: ['west', 'east'], lines: ['blue'] },
    { station: 'West Lake', stationAPI: 'WEST LAKE STATION', directions: ['west', 'east'], lines: ['blue'] },
    { station: 'Hamilton E. Holmes', stationAPI: 'HAMILTON E HOLMES STATION', directions: ['east'], lines: ['blue'] },
    { station: 'Bankhead', stationAPI: 'BANKHEAD STATION', directions: ['east'], lines: ['green'] },
    { station: 'Ashby', stationAPI: 'ASHBY STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
    { station: 'Vine City', stationAPI: 'VINE CITY STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
    { station: 'Dome/ GWCC/ Philips Arena/ CNN Center', stationAPI: 'OMNI DOME STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
    { station: 'Georgia State', stationAPI: 'GEORGIA STATE STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
    { station: 'King Memorial', stationAPI: 'KING MEMORIAL STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
    { station: 'Inman Park/ Reynoldstown', stationAPI: 'INMAN PARK STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
    { station: 'Edgewood/ Candler Park', stationAPI: 'EDGEWOOD CANDLER PARK STATION', directions: ['west', 'east'], lines: ['blue', 'green'] },
]

export default function trains(state = { schedules: [], loading: false, stations: stations }, action) {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true }
        case 'UPDATE':
            return { ...state, schedules: [...action.payload], loading: false }
        default:
            return state
    }
}
