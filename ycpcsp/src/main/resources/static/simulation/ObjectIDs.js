// A file used for storing constants of IDs for identifying Equipment and Chemical Types


// ExperimentObject ids

// Constants for IDs of Equipment
let ID_EQUIP_BEAKER_50mL = 1;
let ID_EQUIP_BEAKER_150mL = 2;
let ID_EQUIP_BEAKER_250mL = 3;
let ID_EQUIP_BEAKER_600mL = 4;
let ID_EQUIP_SCALE = 5;
let ID_EQUIP_TRASHCAN = 6;
let ID_EQUIP_GRADUATED_25mL = 7;
let ID_EQUIP_GRADUATED_50mL = 8;
let ID_EQUIP_GRADUATED_100mL= 9;
let ID_EQUIP_GRADUATED_1000mL = 10;
let ID_EQUIP_FLASK_25mL = 11;
let ID_EQUIP_FLASK_50mL = 12;
let ID_EQUIP_FLASK_100mL = 13;
let ID_EQUIP_FLASK_1000mL = 14;

var EquipID = [
    { Equip: 'BEAKER_50mL', ID:1},
    { Equip: 'BEAKER_150mL',ID:2},
    { Equip: 'BEAKER_250mL',ID:3},
    { Equip: 'BEAKER_600mL',ID:4},
    { Equip: 'SCALE',ID:5},
    { Equip: 'TRASHCAN',ID:6},
    { Equip: 'GRADUATED_25mL',ID:7 },
    { Equip: 'GRADUATED_50mL',ID:8 },
    { Equip: 'GRADUATED_100mL',ID:10 },
    { Equip: 'GRADUATED_1000mL',ID:11 },
    { Equip: 'FLASK_25mL',ID:12 },
    { Equip: 'FLASK_50mL',ID:13 },
    { Equip: 'FLASK_100mL',ID:14 },
    { Equip: 'FLASK_1000mL',ID:15 }
];

sessionStorage.setItem("EquipID", JSON.stringify(EquipID));

// Constants for IDs of Chemicals
let ID_CHEM_TEST_RED = 10001;
let ID_CHEM_TEST_BLUE = 10002;
let ID_CHEM_TEST_WHITE = 10003;
let ID_CHEM_TEST_GREEN = 10004;
let ID_CHEM_TEST_BLACK = 10005;

var ChemID = [
    { Chem: 'RED',ID:1001 },
    { Chem: 'BLUE',ID:1002 },
    { Chem: 'WHITE',ID:1003 },
    { Chem: 'GREEN',ID:1004 },
    { Chem: 'BLACK',ID:1005 }
];
sessionStorage.setItem("ChemID", JSON.stringify(ChemID));

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
        case ID_EQUIP_GRADUATED_25mL:
        case ID_EQUIP_GRADUATED_50mL:
        case ID_EQUIP_GRADUATED_100mL:
        case ID_EQUIP_GRADUATED_1000mL: return new GraduatedCylinderController2D(new GraduatedCylinder(id));
        case ID_EQUIP_FLASK_25mL:
        case ID_EQUIP_FLASK_50mL:
        case ID_EQUIP_FLASK_100mL:
        case ID_EQUIP_FLASK_1000mL: return new ErlenmeyerFlaskController2D(new ErlenmeyerFlask(id));
        case ID_EQUIP_SCALE: return new ScaleController2D(new Scale());
        case ID_EQUIP_TRASHCAN: return new TrashcanController2D(new Trashcan());
        default: return null;
    }
}

/**
Take an integer ID and convert it to a valid Chemical
id: The integer id
mass: The mass of the Chemical
concentration: The concentration of the Chemical
returns: The ChemicalController2D, or null if an invalid ID is given
*/
function idToChemical(id, mass, concentration){
    var properties;
    switch(id){
        // TODO add test compounds
        // Test chemicals elements
        case ELEMENT_HYDROGEN_ATOMIC_NUM:
        case ELEMENT_HELIUM_ATOMIC_NUM:
        case ELEMENT_LITHIUM_ATOMIC_NUM:
        case ID_CHEM_TEST_RED:
        case ID_CHEM_TEST_BLUE:
        case ID_CHEM_TEST_WHITE:
        case ID_CHEM_TEST_GREEN:
        case ID_CHEM_TEST_BLACK: properties = new ElementProperties(id); break;
        default: return null;
    }
    let chem = new Chemical(mass, properties, 20.0, concentration);
    return new ChemicalController2D(chem);
}