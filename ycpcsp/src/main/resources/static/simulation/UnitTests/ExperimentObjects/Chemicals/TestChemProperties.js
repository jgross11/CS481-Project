var chem;
var chlorine;
var chemFake;

QUnit.module("ChemProperties ", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        chem = new ChemProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        chlorine = new ChemProperties(ELEMENT_CHLORINE_ATOMIC_NUM);
        chemFake = new ChemProperties(-1);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(chem.id, ELEMENT_HELIUM_ATOMIC_NUM, "Checking for correct given ID");
    assert.equal(chlorine.id, ELEMENT_CHLORINE_ATOMIC_NUM, "Checking for correct given ID");
});

QUnit.test('chemFromProperties:', function(assert){
    assert.deepEqual(chem.chemFromProperties(), CHEMICAL_PROPERTIES[ELEMENT_HELIUM_ATOMIC_NUM],
        "Should get the properties of Helium");
    assert.deepEqual(chemFake.chemFromProperties(), {}, "Should get an empty object from an invalid element");
});

QUnit.test('getID:', function(assert){
    assert.equal(chem.getID(), ELEMENT_HELIUM_ATOMIC_NUM, "Checking for getting correct ID");
    assert.equal(chlorine.getID(), ELEMENT_CHLORINE_ATOMIC_NUM, "Checking for getting correct ID");
});

QUnit.test('getCreator:', function(assert){
    assert.equal(chem.getCreator(), "Nature",
        "Checking correct creator is obtained from properties list");
    assert.equal(chlorine.getCreator(), "Nature",
        "Checking correct creator is obtained from properties list");
});

QUnit.test('getName:', function(assert){
    assert.equal(chem.getName(), "Helium",
        "Checking correct name is obtained from properties list");
    assert.equal(chlorine.getName(), "Chlorine",
        "Checking correct name is obtained from properties list");
});

QUnit.test('getSymbol:', function(assert){
    assert.throws(chem.getSymbol, "Generic ChemProperties should throw an error on getSymbol");
});

QUnit.test('getSolidColor:', function(assert){
    assert.deepEqual(chem.getSolidColor(), [255, 255, 150, 255],
        "Checking correct color as a solid is obtained from properties list");
    assert.deepEqual(chlorine.getSolidColor(), [255, 220, 220, 255],
        "Checking correct color as a solid is obtained from properties list");
});

QUnit.test('getLiquidColor:', function(assert){
    assert.deepEqual(chem.getLiquidColor(), [255, 255, 150, 200],
        "Checking correct color as a liquid is obtained from properties list");
    assert.deepEqual(chlorine.getLiquidColor(), [255, 220, 220, 200],
        "Checking correct color as a liquid is obtained from properties list");
});

QUnit.test('getGasColor:', function(assert){
    assert.deepEqual(chem.getGasColor(), [255, 255, 150, 180],
        "Checking correct color as a gas is obtained from properties list");
    assert.deepEqual(chlorine.getGasColor(), [255, 220, 220, 180],
        "Checking correct color as a gas is obtained from properties list");
});

QUnit.test('getMolarMass:', function(assert){
    assert.throws(chem.getMolarMass, "Generic ChemProperties should throw an error on getMolarMass");
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(chem.getMeltingPoint(), -272,
        "Checking correct melting point is obtained from properties list");
    assert.equal(chlorine.getMeltingPoint(), -101,
        "Checking correct melting point is obtained from properties list");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(chem.getBoilingPoint(), -269,
        "Checking correct boiling point is obtained from properties list");
    assert.equal(chlorine.getBoilingPoint(), -35,
        "Checking correct boiling point is obtained from properties list");
});

QUnit.test('getDensity:', function(assert){
    assert.equal(chem.getDensity(), 0.18,
        "Checking correct density is obtained from properties list");
    assert.equal(chlorine.getDensity(), 3.21,
        "Checking correct density is obtained from properties list");
});

QUnit.test('getWaterSolubility:', function(assert){
    assert.false(chem.getWaterSolubility(),
        "Checking correct solubility is obtained from properties list");
    assert.true(chlorine.getWaterSolubility(),
        "Checking correct solubility is obtained from properties list");
});


var elementHydrogen;
var elementHelium;
var elementLithium;
var elementNew;

QUnit.module("ElementProperties", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        elementLithium = new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM);
        elementNew = new ElementProperties(9999);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(elementHydrogen.id, ELEMENT_HYDROGEN_ATOMIC_NUM, "Checking Hydrogen element has correct id");
    assert.equal(elementHelium.id, ELEMENT_HELIUM_ATOMIC_NUM, "Checking Helium element has correct id");
    assert.equal(elementLithium.id, ELEMENT_LITHIUM_ATOMIC_NUM, "Checking Lithium element has correct id");
    assert.equal(elementNew.id, 9999, "Checking fake element has given id");
});

QUnit.test('getAtomicNumber:', function(assert){
    assert.equal(elementHydrogen.getAtomicNumber(), ELEMENT_HYDROGEN_ATOMIC_NUM, "Checking Hydrogen element has correct atomic number");
    assert.equal(elementNew.getAtomicNumber(), 9999, "Checking fake element has given atomic number");
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(elementHydrogen.getSymbol(), "H", "Should get the symbol of Hydrogen");
    assert.equal(elementHelium.getSymbol(), "He", "Should get the symbol of Helium");
    assert.equal(elementLithium.getSymbol(), "Li", "Should get the symbol of Lithium");
    assert.equal(elementNew.getSymbol(), "", "Undefined element symbol should be an empty string");
});

QUnit.test('getMolarMass:', function(assert){
    assert.equal(elementHydrogen.getMolarMass(), 1.008, "Should get 1.008 for the molar mass of Hydrogen");
    assert.deepEqual(elementNew.getMolarMass(), undefined, "Fake element molar mass should be undefined");
});

var compoundHydrogen2;
var compoundHelium2;
var compoundLithium3;

var compoundHydroThium;
var compoundHelThium;
var compoundHydroHelThium;
var compoundHydroHelThiumAtoms;

var compoundWater;

let DELTA = 0.001;

QUnit.module("CompoundProperties", {
    before: function(){
        initTestChemProperties();
        // TODO initialize all of the new compounds here for the compound tests, use makeCompound
    },
    beforeEach: function(){
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        elementLithium = new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM);

        compoundHydrogen2 = new CompoundProperties(90001, 2, "Test", [elementHydrogen], "HydrogenDouble", [1, 2, 3], 1, 2, 3);
        compoundHelium2 = new CompoundProperties(90002, 2, "Test", [elementHelium], "HeliumDouble", [4, 5, 6], 4, 5, 6);
        compoundLithium3 = new CompoundProperties(90003, 3, "Test", [elementLithium], "LithiumTriple", [7, 8, 9], 7, 8, 9);

        compoundHydroThium = new CompoundProperties(90004, 1, "Test", [compoundHydrogen2, elementLithium], "HydroThium", [10, 20, 30], 1.5, 2.5, 3.5);
        compoundHelThium = new CompoundProperties(90005, 2, "Test", [compoundHelium2, compoundLithium3], "HelThium", [40, 50, 60], 4.5, 5.5, 6.5);
        compoundHydroHelThium = new CompoundProperties(90006, 3, "Test", [compoundHydroThium, compoundHelThium], [70, 80, 90], "HydroHelThium", 7.5, 8.5, 9.5);
        compoundHydroHelThiumAtoms = new CompoundProperties(90006, 1, "Test", [
                new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM, 2),
                new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM, 3),
                new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM, 4),
                compoundHydroHelThium
            ], [75, 85, 95], "HydroHelThium", 70.5, 80.5, 90.5);

        compoundWater = new CompoundProperties(COMPOUND_WATER_ID);
    }
});

QUnit.test('constructor:', function(assert){
    // TODO
});

QUnit.test('getChem:', function(assert){
    // TODO
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(compoundHydrogen2.getSymbol(), "2H", "Should find correct symbol");
    assert.equal(compoundHelium2.getSymbol(), "2He", "Should find correct symbol");
    assert.equal(compoundLithium3.getSymbol(), "3Li", "Should find correct symbol");

    assert.equal(compoundHydroThium.getSymbol(), "2HLi", "Should find correct symbol");
    assert.equal(compoundHelThium.getSymbol(), "2(2He3Li)", "Should find correct symbol");
    assert.equal(compoundHydroHelThium.getSymbol(), "3((2HLi)(2(2He3Li)))", "Should find correct symbol");
    assert.equal(compoundHydroHelThiumAtoms.getSymbol(), "H2He3Li4(3((2HLi)(2(2He3Li))))", "Should find correct symbol");

    assert.equal(compoundWater.getSymbol(), "H2O", "Get symbol should match from the database entry");
});

QUnit.test('getMolarMass:', function(assert){
    var m;

    m = compoundHydrogen2.getMolarMass();
    assert.true(Math.abs(m - 2.016) < DELTA, "Molar mass of 2H should be 2.016, was " + m);
    m = compoundHelium2.getMolarMass();
    assert.true(Math.abs(m - 8.006) < DELTA, "Molar mass of 2He should be 4.006, was " + m);
    m = compoundLithium3.getMolarMass();
    assert.true(Math.abs(m - 20.823) < DELTA, "Molar mass of 3Li should be 20.823, was " + m);

    m = compoundHydroThium.getMolarMass();
    assert.true(Math.abs(m - 8.957) < DELTA, "Molar mass of (Li2H) should be 20.823, was " + m);
    m = compoundHelThium.getMolarMass();
    assert.true(Math.abs(m - 57.658) < DELTA, "Molar mass of 2(3Li2He) should be 20.823, was " + m);
    m = compoundHydroHelThium.getMolarMass();
    assert.true(Math.abs(m - 199.845) < DELTA, "Molar mass of 3((Li2H)2(3Li2He)) should be 199.845, was " + m);

    m = compoundWater.getMolarMass();
    assert.true(Math.abs(m - 18.015) < DELTA, "Molar mass of water should be 18.015, was " + m);
});