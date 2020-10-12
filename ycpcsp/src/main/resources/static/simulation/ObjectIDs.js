// A file used for storing constants of IDs for identifying Equipment and Chemical Types


// ExperimentObject ids

// Constants for IDs of Equipment
let ID_EQUIP_BEAKER_TEST = 1;

// Constants for IDs of Chemicals
let ID_CHEM_TEST_SMALL_RED = 1;
let ID_CHEM_TEST_SMALL_BLUE = 2;
let ID_CHEM_TEST_LARGE_WHITE = 3;

/**
Take an integer ID and convert it to a valid piece of Equipment
id: The integer id
returns: The Equipment, or null if an invalid ID is given
*/
function idToEquipment(id){
    switch(id){
        // Default beaker
        case ID_EQUIP_BEAKER_TEST: return new BeakerController2D(new Beaker([50, 200], [100, 100], 20.0, 50.0, 0.03));
        default: return null;
    }
}

/**
Take an integer ID and convert it to a valid Chemical
id: The integer id
mass: The mass of the Chemical
concentration: The concentration of the Chemical
returns: The Equipment, or null if an invalid ID is given
*/
function idToChemical(id, mass, concentration){
    var chem;
    switch(id){
        // Test chemicals
        case ID_CHEM_TEST_SMALL_RED: chem = new Chemical(5, "R", 20, [255, 0, 0]); break;
        case ID_CHEM_TEST_SMALL_BLUE: chem = new Chemical(5, "B", 20, [0, 0, 255]); break;
        case ID_CHEM_TEST_LARGE_WHITE: chem = new Chemical(20, "W", 20, [255, 255, 255]); break;
        default: return null;
    }
    return new ChemicalController2D(chem);
}