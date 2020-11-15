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
let ID_EQUIP_FLASK_125mL = 13;
let ID_EQUIP_FLASK_1000mL = 14;
let ID_EQUIP_WEIGH_BOAT = 15;
let ID_EQUIP_STIR_ROD = 16;

var EquipID = [
    { Equip: 'BEAKER_50mL', ID:1},
    { Equip: 'BEAKER_150mL',ID:2},
    { Equip: 'BEAKER_250mL',ID:3},
    { Equip: 'BEAKER_600mL',ID:4},
    { Equip: 'SCALE',ID:5},
    { Equip: 'TRASHCAN',ID:6},
    { Equip: 'GRADUATED_25mL',ID:7 },
    { Equip: 'GRADUATED_50mL',ID:8 },
    { Equip: 'GRADUATED_100mL',ID:9 },
    { Equip: 'GRADUATED_1000mL',ID:10 },
    { Equip: 'FLASK_25mL',ID:11 },
    { Equip: 'FLASK_50mL',ID:12 },
    { Equip: 'FLASK_100mL',ID:13 },
    { Equip: 'FLASK_1000mL',ID:14 },
    { Equip: 'WEIGH_BOAT',ID:15 },
    { Equip: 'STIR_ROD',ID:16 }
];

sessionStorage.setItem("EquipID", JSON.stringify(EquipID));

// Constants for indexing chemicals


var Expfunc =[
    {Function:'ID_FUNC_SCALE_TO_TAKE_WEIGHT' , ID:1},
    {Function:'ID_FUNC_SCALE_REMOVE_OBJECT' , ID:2},
    {Function:'ID_FUNC_SCALE_ZERO_OUT' , ID:3},
    {Function:'ID_FUNC_SCALE_CLEAR_ZERO' , ID:4},
    {Function:'ID_FUNC_CONTAINER_ADD_TO', ID:1},
    {Function:'ID_FUNC_CONTAINER_POUR_INTO', ID:2},
    {Function:'ID_FUNC_DISPOSER_DISPOSE', ID:1},
    {Function:'ID_FUNC_STIR_ROD_STIR' , ID:1}
];
sessionStorage.setItem("Expfunc", JSON.stringify(Expfunc));



// Elements
let ELEMENT_HYDROGEN_ATOMIC_NUM = 1;
let ELEMENT_HELIUM_ATOMIC_NUM = 2;
let ELEMENT_LITHIUM_ATOMIC_NUM = 3;
let ELEMENT_CARBON_ATOMIC_NUM = 6;
let ELEMENT_OXYGEN_ATOMIC_NUM = 8;
let ELEMENT_SODIUM_ATOMIC_NUM = 11;
let ELEMENT_CHLORINE_ATOMIC_NUM = 17;
var ChemID = [
    { Chem: 'HYDROGEN',ID:1 },
    { Chem: 'HELIUM',ID:2 },
    { Chem: 'LITHIUM',ID:3 },
    { Chem: 'CARBON',ID:6 },
    { Chem: 'OXYGEN',ID:8 },
    { Chem: 'SODIUM',ID:11 },
    { Chem: 'CHLORINE',ID:17 }

];


sessionStorage.setItem("ChemID", JSON.stringify(ChemID));

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
let COMPOUND_OXYGEN_GAS_ID = 10004;
let COMPOUND_CHLORINE_GAS_ID = 10005;


// Equations
let EQUATION_WATER_ID = 1;
let EQUATION_TABLE_SALT_ID = 2;


/**
Take an integer ID and convert it to a valid piece of Equipment, automatically slightly randomly changing its mass.
id: The integer id
returns: The Equipment, or null if an invalid ID is given
*/
function idToEquipment(id){
    var eq;
    switch(id){
        // All Beaker sizes
        case ID_EQUIP_BEAKER_50mL:
        case ID_EQUIP_BEAKER_150mL:
        case ID_EQUIP_BEAKER_250mL:
        case ID_EQUIP_BEAKER_600mL: eq = new BeakerController2D(new Beaker(id)); break;

        case ID_EQUIP_GRADUATED_25mL:
        case ID_EQUIP_GRADUATED_50mL:
        case ID_EQUIP_GRADUATED_100mL:
        case ID_EQUIP_GRADUATED_1000mL: eq = new GraduatedCylinderController2D(new GraduatedCylinder(id)); break;

        case ID_EQUIP_FLASK_25mL:
        case ID_EQUIP_FLASK_50mL:
        case ID_EQUIP_FLASK_125mL:
        case ID_EQUIP_FLASK_1000mL: eq = new ErlenmeyerFlaskController2D(new ErlenmeyerFlask(id)); break;

        case ID_EQUIP_WEIGH_BOAT: eq = new WeighBoatController2D(new WeighBoat()); break;
        case ID_EQUIP_SCALE: eq = new ScaleController2D(new Scale()); break;
        case ID_EQUIP_TRASHCAN: eq = new TrashcanController2D(new Trashcan()); break;
        case ID_EQUIP_STIR_ROD: eq = new StirRodController2D(new StirRod()); break;

        default: eq = null;
    }
    eq.equipment.randomizeMass();

    return eq;
}

/**
Take an integer ID and convert it to a valid Chemical
id: The integer id
mass: The mass of the Chemical
concentration: The concentration of the Chemical
returns: The ChemicalController2D, or null if an invalid ID is given
*/
function idToChemical(id, mass, concentration){
    if(id === null) return null;
    var properties = new ChemProperties(id);
    let chem = new Chemical(mass, properties, 20.0, concentration);
    return new ChemicalController2D(chem);
}

// A directory holding all chemical properties currently available
var CHEMICAL_PROPERTIES = [];

// A directory holding all equation data currently available
var EQUATION_PROPERTIES = [];

/**
Initialize the test database with some default elements, compounds, and equations
*/
function initTestChemProperties(){
    /*
    All values for molar bass, melting point, boiling point, and density need verification
        temperatures are in celsius, density is in g/cm^3 for solids, and g/L (or kg/m^3) for gases
        Data obtained from:
            https://www.lenntech.com/periodic-chart-elements/density.htm
            https://www.lenntech.com/periodic-chart-elements/melting-point.htm
            https://www.lenntech.com/periodic-chart-elements/boiling-point.htm
    */
    makeChemical("H", "Hydrogen", "Nature",
        [255, 255, 200, 255], [255, 255, 200, 200], [255, 255, 200, 255, 180],
        ELEMENT_HYDROGEN_ATOMIC_NUM, 1.008, -259, -253, 0.09, true);
    makeChemical("He", "Helium", "Nature",
        [255, 255, 150, 255], [255, 255, 150, 200], [255, 255, 150, 180],
        ELEMENT_HELIUM_ATOMIC_NUM, 4.003, -272, -269, 0.18, false);
    makeChemical("Li", "Lithium", "Nature",
        [200, 200, 255, 255], [200, 200, 255, 200], [200, 200, 255, 180],
        ELEMENT_LITHIUM_ATOMIC_NUM, 6.941, 180, 1347, 0.53, true);
    makeChemical("C", "Carbon", "Nature",
        [200, 70, 70, 255], [200, 70, 70, 200], [200, 70, 70, 180],
        ELEMENT_CARBON_ATOMIC_NUM, 12.011, 3500, 4827, 2.26, false);
    makeChemical("O", "Oxygen", "Nature",
        [220, 220, 220, 255], [220, 220, 220, 200], [220, 220, 220, 180],
        ELEMENT_OXYGEN_ATOMIC_NUM, 15.999, -218, -183, 1.43, true);
    makeChemical("Na", "Sodium", "Nature",
        [220, 255, 220, 255], [220, 255, 220, 200], [220, 255, 220, 180],
        ELEMENT_SODIUM_ATOMIC_NUM, 22.990, 98, 883, 0.97, true);
    makeChemical("Cl", "Chlorine", "Nature",
        [255, 220, 220, 255], [255, 220, 220, 200], [255, 220, 220, 180],
        ELEMENT_CHLORINE_ATOMIC_NUM, 35.453, -101, -35, 3.21, true);

    makeChemical("Ruu", "Red", "Fake",
        [255, 0, 0, 255], [255, 0, 0, 200], [255, 0, 0, 180],
        ID_CHEM_TEST_RED, 9, 100, 0, 0.6, true);
    makeChemical("Blu", "Blue", "Fake",
        [0, 0, 255, 255], [0, 0, 255, 200], [0, 0, 255, 180],
        ID_CHEM_TEST_BLUE, 9, 100, 0, 0.7, false);
    makeChemical("Wuu", "White", "Fake",
        [255, 255, 255, 255], [255, 255, 255, 200], [255, 255, 255, 180],
        ID_CHEM_TEST_WHITE, 9, 100, 0, 0.8, false);
    makeChemical("Guu", "Green", "Fake",
        [0, 255, 0, 255], [0, 255, 0, 200], [0, 255, 0, 180],
        ID_CHEM_TEST_GREEN, 9, 100, 0, 0.9, true);
    makeChemical("Buu", "Black", "Fake",
        [0, 0, 0, 255], [0, 0, 0, 200], [0, 0, 0, 180],
        ID_CHEM_TEST_BLACK, 9, 100, 0, 1.1, true);


    // Also need verification for all melting point, boiling point, and density values for compounds
    // All values are from miscellaneous sources, mostly here as placeholders

    makeChemical("H2", "Hydrogen Gas", "Nature",
        [255, 255, 200, 255], [255, 255, 200, 200], [255, 255, 200, 180],
        COMPOUND_HYDROGEN_GAS_ID, 2.016, -259, -253, 0.09, true);

    makeChemical("H2O", "Water", "Nature",
        [100, 100, 255, 255], [100, 100, 255, 200], [100, 100, 255, 180],
        COMPOUND_WATER_ID, 18.0153, 0, 100, 1, true);

    makeChemical("C6H12O6", "Glucose", "Nature",
        [100, 255, 255, 255], [100, 255, 255, 200], [100, 255, 255, 180],
        COMPOUND_GLUCOSE_ID, 180.156, 146, 146, 1.56, true);

    makeChemical("NaCl", "Table Salt", "Nature",
        [240, 240, 240, 255], [240, 240, 240, 200], [240, 240, 240, 180],
        COMPOUND_TABLE_SALT_ID, 58.44, 801, 1465, 2.16, true);

    makeChemical("O2", "Oxygen Gas", "Nature",
        [220, 220, 220, 255], [220, 220, 220, 200], [220, 220, 220, 180],
        COMPOUND_OXYGEN_GAS_ID, 31.99800, -218, -183, 1.43, true);

    makeChemical("Cl2", "Chlorine Gas", "Nature",
        [255, 220, 220, 255], [255, 220, 220, 200], [255, 220, 220, 180],
        COMPOUND_CHLORINE_GAS_ID, 70.906, -101, -35, 3.21, true);


    // These equations are for testing, and are not necessarily accurate to reality
    makeEquation(EQUATION_WATER_ID, [
        new EquationComponent(2, new ChemProperties(COMPOUND_HYDROGEN_GAS_ID)),
        new EquationComponent(1, new ChemProperties(COMPOUND_OXYGEN_GAS_ID))
        ], [
        new EquationComponent(2, new ChemProperties(COMPOUND_WATER_ID))
        ]);

    makeEquation(EQUATION_TABLE_SALT_ID, [
        new EquationComponent(1, new ChemProperties(COMPOUND_CHLORINE_GAS_ID)),
        new EquationComponent(2, new ChemProperties(ELEMENT_SODIUM_ATOMIC_NUM))
        ], [
        new EquationComponent(2, new ChemProperties(COMPOUND_TABLE_SALT_ID))
        ]);
}


// Constants for fields in CHEMICAL_PROPERTIES
let CHEMICAL_PROPERTY_SYMBOL = "symbol";
let CHEMICAL_PROPERTY_NAME = "name";
let CHEMICAL_PROPERTY_CREATOR = "creator";
let CHEMICAL_PROPERTY_COLOR_SOLID = "colorSolid";
let CHEMICAL_PROPERTY_COLOR_LIQUID = "colorLiquid";
let CHEMICAL_PROPERTY_COLOR_GAS = "colorGas";
let CHEMICAL_PROPERTY_ID = "id";
let CHEMICAL_PROPERTY_MOLAR_MASS = "molarMass";
let CHEMICAL_PROPERTY_MELTING_POINT = "meltingPoint";
let CHEMICAL_PROPERTY_BOILING_POINT = "boilingPoint";
let CHEMICAL_PROPERTY_DENSITY = "density";
let CHEMICAL_PROPERTY_WATER_SOLUBLE = "waterSoluble";

let EQUATION_PROPERTY_REACTANTS = "reactants";
let EQUATION_PROPERTY_PRODUCTS = "products";
let EQUATION_PROPERTY_ID = "id";

let EQUATION_COMPONENT_PROPERTY_COEFFICIENT = "coefficient";
let EQUATION_COMPONENT_PROPERTY_ID = "coefficient";

/**
Add a new chemical to the CHEMICAL_PROPERTIES list
symbol: The symbol used to display the chemical
name: The name of the chemical
creator: The user who made the chemical
colorSolid: The color which will be used to display the chemical as a solid [red, green, blue, alpha], alpha is optional
colorLiquid: The color which will be used to display the chemical as a liquid [red, green, blue, alpha], alpha is optional
colorGas: The color which will be used to display the chemical as a gas [red, green, blue, alpha], alpha is optional
id: The id of the chemical
molarMass: The molar mass of the chemical
meltingPoint: The temperature, in celsius, at which this chemical melts
boilingPoint: The temperature, in celsius, at which this chemical boils
density: The density, in g/cm^3 for solids, and g/L (or kg/m^3 for gases), of the chemical
waterSoluble: true if the chemical is soluble in water, false otherwise
*/
function makeChemical(symbol, name, creator,
        colorSolid, colorLiquid, colorGas,
        id, molarMass, meltingPoint, boilingPoint, density, waterSoluble){

    CHEMICAL_PROPERTIES[id] = {};
    let p = CHEMICAL_PROPERTIES[id];
    p[CHEMICAL_PROPERTY_SYMBOL] = symbol;
    p[CHEMICAL_PROPERTY_NAME] = name;
    p[CHEMICAL_PROPERTY_CREATOR] = creator;
    p[CHEMICAL_PROPERTY_COLOR_SOLID] = colorSolid;
    p[CHEMICAL_PROPERTY_COLOR_LIQUID] = colorLiquid;
    p[CHEMICAL_PROPERTY_COLOR_GAS] = colorGas;
    p[CHEMICAL_PROPERTY_MOLAR_MASS] = molarMass;
    p[CHEMICAL_PROPERTY_MELTING_POINT] = meltingPoint;
    p[CHEMICAL_PROPERTY_BOILING_POINT] = boilingPoint;
    p[CHEMICAL_PROPERTY_DENSITY] = density;
    p[CHEMICAL_PROPERTY_WATER_SOLUBLE] = waterSoluble;
}

/**
Add a new equation to the EQUATION_PROPERTIES
id: The id of the equation used to access it from EQUATION_PROPERTIES
reactants: The list of EquationComponents used in the equation as reactants
products: The list of EquationComponents in the equation which get created as products
*/
function makeEquation(id, reactants, products){
    EQUATION_PROPERTIES[id] = {};
    let f = EQUATION_PROPERTIES[id];
    f[EQUATION_PROPERTY_REACTANTS] = reactants;
    f[EQUATION_PROPERTY_PRODUCTS] = products;
}