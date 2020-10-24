// A file used for storing constants of IDs for identifying Equipment and Chemical Types


// ExperimentObject ids

// Constants for IDs of Equipment
let ID_EQUIP_BEAKER_50mL = 1;
let ID_EQUIP_BEAKER_150mL = 2;
let ID_EQUIP_BEAKER_250mL = 3;
let ID_EQUIP_BEAKER_600mL = 4;
let ID_EQUIP_SCALE = 5;

// Constants for IDs of Chemicals
let ID_CHEM_TEST_RED = 1;
let ID_CHEM_TEST_BLUE = 2;
let ID_CHEM_TEST_WHITE = 3;
let ID_CHEM_TEST_GREEN = 4;
let ID_CHEM_TEST_BLACK = 5;

/**
Take an integer ID and convert it to a valid piece of Equipment
id: The integer id
returns: The Equipment, or null if an invalid ID is given
*/
function idToEquipment(id){
    switch(id){
        // All Beaker sizes
        case ID_EQUIP_BEAKER_50mL:
        case ID_EQUIP_BEAKER_150mL:
        case ID_EQUIP_BEAKER_250mL:
        case ID_EQUIP_BEAKER_600mL: return new BeakerController2D(new Beaker(id));
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
        case ID_CHEM_TEST_RED: chem = new Chemical(mass, "R", 20, [255, 0, 0]); break;
        case ID_CHEM_TEST_BLUE: chem = new Chemical(mass, "B", 20, [0, 0, 255]); break;
        case ID_CHEM_TEST_WHITE: chem = new Chemical(mass, "W", 20, [255, 255, 255]); break;
        case ID_CHEM_TEST_GREEN: chem = new Chemical(mass, "G", 20, [0, 255, 0]); break;
        case ID_CHEM_TEST_BLACK: chem = new Chemical(mass, "BL", 20, [0, 0, 0]); break;
        default: return null;
    }
    chem.setConcentration(concentration);
    return new ChemicalController2D(chem);
}