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
let ID_EQUIP_WEIGH_BOAT = 15;

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

// Constants for indexing chemicals

// Elements
let ELEMENT_HYDROGEN_ATOMIC_NUM = 1;
let ELEMENT_HELIUM_ATOMIC_NUM = 2;
let ELEMENT_LITHIUM_ATOMIC_NUM = 3;
let ELEMENT_CARBON_ATOMIC_NUM = 6;
let ELEMENT_OXYGEN_ATOMIC_NUM = 8;
let ELEMENT_SODIUM_ATOMIC_NUM = 11;
let ELEMENT_CHLORINE_ATOMIC_NUM = 17;

// Test elements
let ID_CHEM_TEST_RED = 1001;
let ID_CHEM_TEST_BLUE = 1002;
let ID_CHEM_TEST_WHITE = 1003;
let ID_CHEM_TEST_GREEN = 1004;
let ID_CHEM_TEST_BLACK = 1005;

// Compounds
let COMPOUND_HYDROGEN_GAS_ID = 10000;
let COMPOUND_WATER_ID = 10001;
let COMPOUND_GLUCOSE_ID = 10002;
let COMPOUND_TABLE_SALT_ID = 10003;
var ChemID = [
    { Chem: 'HYDROGEN GAS',ID:10000 },
    { Chem: 'WATER',ID:10001 },
    { Chem: 'GLUCOSE',ID:10002 },
    { Chem: 'TABLE SALT',ID:10003 }
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

        case ID_EQUIP_WEIGH_BOAT: return new WeighBoatController2D(new WeighBoat());
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
        // Real elements
        case ELEMENT_HYDROGEN_ATOMIC_NUM:
        case ELEMENT_HELIUM_ATOMIC_NUM:
        case ELEMENT_LITHIUM_ATOMIC_NUM:
        case ELEMENT_CARBON_ATOMIC_NUM:
        case ELEMENT_OXYGEN_ATOMIC_NUM:
        case ELEMENT_SODIUM_ATOMIC_NUM:
        case ELEMENT_CHLORINE_ATOMIC_NUM:
        // Test elements
        case ID_CHEM_TEST_RED:
        case ID_CHEM_TEST_BLUE:
        case ID_CHEM_TEST_WHITE:
        case ID_CHEM_TEST_GREEN:
        case ID_CHEM_TEST_BLACK: properties = new ElementProperties(id); break;

        // Compounds
        case COMPOUND_HYDROGEN_GAS_ID:
        case COMPOUND_WATER_ID:
        case COMPOUND_GLUCOSE_ID:
        case COMPOUND_TABLE_SALT_ID: properties = new CompoundProperties(id); break;
        default: return null;
    }
    let chem = new Chemical(mass, properties, 20.0, concentration);
    return new ChemicalController2D(chem);
}

// A test "database" holding a few chemical properties
let CHEMICAL_PROPERTIES = [];

/**
Initialize the test database with some default elements and compounds
*/
function initTestChemProperties(){
    /*
    TODO all values for molar bass, melting point, boiling point, and density need verification
        temperatures are in celsius, density is in g/cm^3 for solids, and g/L (or kg/m^3) for gases
        Data obtained from:
            https://www.lenntech.com/periodic-chart-elements/density.htm
            https://www.lenntech.com/periodic-chart-elements/melting-point.htm
            https://www.lenntech.com/periodic-chart-elements/boiling-point.htm
    */
    makeElement("H", "Hydrogen", "Nature", [255, 255, 200], ELEMENT_HYDROGEN_ATOMIC_NUM, 1.008, -259, -253, 0.09);
    makeElement("He", "Helium", "Nature", [255, 255, 150], ELEMENT_HELIUM_ATOMIC_NUM, 4.003, -272, -269, 0.18);
    makeElement("Li", "Lithium", "Nature", [200, 200, 255], ELEMENT_LITHIUM_ATOMIC_NUM, 6.941, 180, 1347, 0.53);
    makeElement("C", "Carbon", "Nature", [200, 70, 70], ELEMENT_CARBON_ATOMIC_NUM, 12.011, 3500, 4827, 2.26);
    makeElement("O", "Oxygen", "Nature", [220, 220, 220], ELEMENT_OXYGEN_ATOMIC_NUM, 15.999, -218, -183, 1.43);
    makeElement("Na", "Sodium", "Nature", [220, 255, 220], ELEMENT_SODIUM_ATOMIC_NUM, 22.990, 98, 883, 0.97);
    makeElement("Cl", "Chlorine", "Nature", [255, 220, 220], ELEMENT_CHLORINE_ATOMIC_NUM, 35.453, -101, -35, 3.21);

    makeElement("Ruu", "Red", "Fake", [255, 0, 0], ID_CHEM_TEST_RED, 9, 100, 0, 1);
    makeElement("Blu", "Blue", "Fake", [0, 0, 255], ID_CHEM_TEST_BLUE, 9, 100, 0, 1);
    makeElement("Wuu", "White", "Fake", [255, 255, 255], ID_CHEM_TEST_WHITE, 9, 100, 0, 1);
    makeElement("Guu", "Green", "Fake", [0, 255, 0], ID_CHEM_TEST_GREEN, 9, 100, 0, 1);
    makeElement("Buu", "Black", "Fake", [0, 0, 0], ID_CHEM_TEST_BLACK, 9, 100, 0, 1);

    /*
    TODO Also need verification for all melting point, boiling point, and density values for compounds
        All values are from miscellaneous sources, mostly here as placeholders
    */
    makeCompound(COMPOUND_HYDROGEN_GAS_ID,
        [new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM, 2)],
        "Hydrogen Gas", "Nature", [255, 255, 200], -259, -253, 0.09);

    makeCompound(COMPOUND_WATER_ID,
        [new CompoundProperties(COMPOUND_HYDROGEN_GAS_ID), new ElementProperties(ELEMENT_OXYGEN_ATOMIC_NUM)],
        "Water", "Nature", [100, 100, 255], 0, 100, 1000);

    makeCompound(COMPOUND_GLUCOSE_ID,
        [new ElementProperties(ELEMENT_CARBON_ATOMIC_NUM, 6), new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM, 12), new ElementProperties(ELEMENT_OXYGEN_ATOMIC_NUM, 6)],
        "Glucose", "Nature", [100, 255, 255], 146, 146, 1.56);

    makeCompound(COMPOUND_TABLE_SALT_ID,
        [new ElementProperties(ELEMENT_SODIUM_ATOMIC_NUM), new ElementProperties(ELEMENT_CHLORINE_ATOMIC_NUM)],
        "Table Salt", "Nature", [240, 240, 240], 801, 1465, 2.16);
}


// Constants for fields in CHEMICAL_PROPERTIES
let CHEMICAL_PROPERTY_SYMBOL = "symbol";
let CHEMICAL_PROPERTY_NAME = "name";
let CHEMICAL_PROPERTY_CREATOR = "creator";
let CHEMICAL_PROPERTY_TEXTURE = "texture";
let CHEMICAL_PROPERTY_ATOMIC_NUMBER = "atomicNumber";
let CHEMICAL_PROPERTY_CHEMS = "chems";
let CHEMICAL_PROPERTY_MOLAR_MASS = "molarMass";
let CHEMICAL_PROPERTY_MELTING_POINT = "meltingPoint";
let CHEMICAL_PROPERTY_BOILING_POINT = "boilingPoint";
let CHEMICAL_PROPERTY_DENSITY = "density";

/**
Add a new element to the CHEMICAL_PROPERTIES test database
symbol: The symbol used to display the element
name: The name of the element
creator: The user who made the element
texture: The color which will be used to display the element [red, green, blue, alpha], alpha is optional
atomicNumber: The atomic number of the element
molarMass: The molar mass of the element
meltingPoint: The temperature, in celsius, at which this element melts
boilingPoint: The temperature, in celsius, at which this element boils
density: The density, in g/cm^3 for solids, and g/L (or kg/m^3) for gases, of the element
*/
function makeElement(symbol, name, creator, texture, atomicNumber, molarMass, meltingPoint, boilingPoint, density){
    CHEMICAL_PROPERTIES[atomicNumber] = {};
    let p = CHEMICAL_PROPERTIES[atomicNumber];
    p[CHEMICAL_PROPERTY_SYMBOL] = symbol;
    p[CHEMICAL_PROPERTY_NAME] = name;
    p[CHEMICAL_PROPERTY_CREATOR] = creator;
    p[CHEMICAL_PROPERTY_TEXTURE] = texture;
    p[CHEMICAL_PROPERTY_ATOMIC_NUMBER] = atomicNumber;
    p[CHEMICAL_PROPERTY_MOLAR_MASS] = molarMass;
    p[CHEMICAL_PROPERTY_MELTING_POINT] = meltingPoint;
    p[CHEMICAL_PROPERTY_BOILING_POINT] = boilingPoint;
    p[CHEMICAL_PROPERTY_DENSITY] = density;
}


/**
Add a new compound to the CHEMICAL_PROPERTIES test database
id: The integer used to identify the compound, must not correspond to an atomic number
chems: A list of all the ChemProperties objects which make up the compound
name: The name of the compound
creator: The user who made the compound
texture: The color which will be used to display the compound [red, green, blue, alpha], alpha is optional
meltingPoint: The temperature, in celsius, at which this compound melts
boilingPoint: The temperature, in celsius, at which this compound boils
density: The density, in g/cm^3 for solids, and g/L (or kg/m^3) for gases, of the compound
*/
function makeCompound(id, chems, name, creator, texture, meltingPoint, boilingPoint, density){
    CHEMICAL_PROPERTIES[id] = {};
    let c = CHEMICAL_PROPERTIES[id];
    c[CHEMICAL_PROPERTY_CHEMS] = chems;
    c[CHEMICAL_PROPERTY_NAME] = name;
    c[CHEMICAL_PROPERTY_CREATOR] = creator;
    c[CHEMICAL_PROPERTY_TEXTURE] = texture;
    c[CHEMICAL_PROPERTY_MELTING_POINT] = meltingPoint;
    c[CHEMICAL_PROPERTY_BOILING_POINT] = boilingPoint;
    c[CHEMICAL_PROPERTY_DENSITY] = density;
}