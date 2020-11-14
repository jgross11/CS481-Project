var chem;
var chlorine;
var chemFake;

QUnit.module("ChemProperties", {
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
    assert.equal(chemFake.id, -1, "Checking for correct given ID with fake chemical");
});

QUnit.test('getID:', function(assert){
    assert.equal(chem.getID(), ELEMENT_HELIUM_ATOMIC_NUM, "Checking for getting correct ID");
    assert.equal(chlorine.getID(), ELEMENT_CHLORINE_ATOMIC_NUM, "Checking for getting correct ID");
});

QUnit.test('chemFromProperties:', function(assert){
    assert.deepEqual(chem.chemFromProperties(), CHEMICAL_PROPERTIES[ELEMENT_HELIUM_ATOMIC_NUM],
        "Should get the properties of Helium");
    assert.deepEqual(chemFake.chemFromProperties(), {}, "Should get an empty object from an invalid element");
});

QUnit.test('getCreator:', function(assert){
    assert.equal(chem.getCreator(), "Nature",
        "Checking correct creator is obtained from properties list");
    assert.equal(chlorine.getCreator(), "Nature",
        "Checking correct creator is obtained from properties list");
    assert.equal(chemFake.getCreator(), undefined,
        "Checking no creator is found for invalid chemical");
});

QUnit.test('getName:', function(assert){
    assert.equal(chem.getName(), "Helium",
        "Checking correct name is obtained from properties list");
    assert.equal(chlorine.getName(), "Chlorine",
        "Checking correct name is obtained from properties list");
    assert.equal(chemFake.getName(), undefined,
        "Checking no name is found for invalid chemical");
});

QUnit.test('getSymbol:', function(assert){
    assert.throws(chem.getSymbol, "Generic ChemProperties should throw an error on getSymbol");
});

QUnit.test('getSolidColor:', function(assert){
    assert.deepEqual(chem.getSolidColor(), [255, 255, 150, 255],
        "Checking correct color as a solid is obtained from properties list");
    assert.deepEqual(chlorine.getSolidColor(), [255, 220, 220, 255],
        "Checking correct color as a solid is obtained from properties list");
    assert.deepEqual(chemFake.getSolidColor(), undefined,
        "Checking no solid color is found for invalid chemical");
});

QUnit.test('getLiquidColor:', function(assert){
    assert.deepEqual(chem.getLiquidColor(), [255, 255, 150, 200],
        "Checking correct color as a liquid is obtained from properties list");
    assert.deepEqual(chlorine.getLiquidColor(), [255, 220, 220, 200],
        "Checking correct color as a liquid is obtained from properties list");
    assert.deepEqual(chemFake.getLiquidColor(), undefined,
        "Checking no liquid color is found for invalid chemical");
});

QUnit.test('getGasColor:', function(assert){
    assert.deepEqual(chem.getGasColor(), [255, 255, 150, 180],
        "Checking correct color as a gas is obtained from properties list");
    assert.deepEqual(chlorine.getGasColor(), [255, 220, 220, 180],
        "Checking correct color as a gas is obtained from properties list");
    assert.deepEqual(chemFake.getGasColor(), undefined,
        "Checking no gas is found for invalid chemical");
});

QUnit.test('getMolarMass:', function(assert){
    assert.throws(chem.getMolarMass, "Generic ChemProperties should throw an error on getMolarMass");
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(chem.getMeltingPoint(), -272,
        "Checking correct melting point is obtained from properties list");
    assert.equal(chlorine.getMeltingPoint(), -101,
        "Checking correct melting point is obtained from properties list");
    assert.equal(chemFake.getMeltingPoint(), undefined,
        "Checking no melting point is found for invalid chemical");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(chem.getBoilingPoint(), -269,
        "Checking correct boiling point is obtained from properties list");
    assert.equal(chlorine.getBoilingPoint(), -35,
        "Checking correct boiling point is obtained from properties list");
    assert.equal(chemFake.getBoilingPoint(), undefined,
        "Checking no boiling point is found for invalid chemical");
});

QUnit.test('getDensity:', function(assert){
    assert.equal(chem.getDensity(), 0.18,
        "Checking correct density is obtained from properties list");
    assert.equal(chlorine.getDensity(), 3.21,
        "Checking correct density is obtained from properties list");
    assert.equal(chemFake.getDensity(), undefined,
        "Checking no density is found for invalid chemical");
});

QUnit.test('getWaterSolubility:', function(assert){
    assert.false(chem.getWaterSolubility(),
        "Checking correct solubility is obtained from properties list");
    assert.true(chlorine.getWaterSolubility(),
        "Checking correct solubility is obtained from properties list");
    assert.equal(chemFake.getWaterSolubility(), undefined,
        "Checking no water solubility status is found for invalid chemical");
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

var DELTA = 0.001;

QUnit.module("CompoundProperties", {
    before: function(){
        initTestChemProperties();
        makeCompound(90001, [
            new CompoundComponent(new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM), 2)
            ], "HydrogenDouble", "Test", [1, 2, 3], [1, 2, 3], [1, 2, 3],
            1, 2, 3, false);
        makeCompound(90002, [
            new CompoundComponent(new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM), 2)
            ], "HeliumDouble", "Test", [4, 5, 6], [4, 5, 6], [4, 5, 6],
            4, 5, 6, false);
        makeCompound(90003, [
            new CompoundComponent(new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM), 3)
            ], "LithiumTriple", "Test", [7, 8, 9], [7, 8, 9], [7, 8, 9],
            7, 8, 9, true);

        makeCompound(90004, [
            new CompoundComponent(new CompoundProperties(90001), 1),
            new CompoundComponent(new CompoundProperties(90003), 1)
            ], "HydroThium", "Test", [10, 20, 30], [10, 20, 30], [10, 20, 30],
            1.5, 2.5, 3.5, true);
        makeCompound(90005, [
            new CompoundComponent(new CompoundProperties(90002), 2),
            new CompoundComponent(new CompoundProperties(90003), 2)
            ], "HelThium", "Test", [40, 50, 60], [40, 50, 60], [40, 50, 60],
            4.5, 5.5, 6.5, true);
        makeCompound(90006, [
            new CompoundComponent(new CompoundProperties(90004), 3),
            new CompoundComponent(new CompoundProperties(90005), 3)
            ], "Test", "HydroHelThium", [70, 80, 90], [70, 80, 90], [70, 80, 90],
            7.5, 8.5, 9.5, false);
        makeCompound(90007, [
            new CompoundComponent(new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM), 2),
            new CompoundComponent(new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM), 3),
            new CompoundComponent(new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM), 4),
            new CompoundComponent(new CompoundProperties(90006), 1),
            ], "Test", "HydroHelThiumAtoms", [75, 85, 95], [75, 85, 95], [75, 85, 95],
            70.5, 80.5, 90.5, false);
    },
    beforeEach: function(){
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        elementLithium = new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM);

        compoundHydrogen2 = new CompoundProperties(90001);
        compoundHelium2 = new CompoundProperties(90002);
        compoundLithium3 = new CompoundProperties(90003);

        compoundHydroThium = new CompoundProperties(90004);
        compoundHelThium = new CompoundProperties(90005);
        compoundHydroHelThium = new CompoundProperties(90006);
        compoundHydroHelThiumAtoms = new CompoundProperties(90007);

        compoundWater = new CompoundProperties(COMPOUND_WATER_ID);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(elementHydrogen.id, ELEMENT_HYDROGEN_ATOMIC_NUM, "Checking Hydrogen has correct ID");
    assert.equal(elementHelium.id, ELEMENT_HELIUM_ATOMIC_NUM, "Checking Helium has correct ID");
    assert.equal(elementLithium.id, ELEMENT_LITHIUM_ATOMIC_NUM, "Checking Lithium has correct ID");
    assert.equal(compoundHydrogen2.id, 90001, "Checking test Hydrogen compound has correct ID");
    assert.equal(compoundHelium2.id, 90002, "Checking test Helium compound has correct ID");
    assert.equal(compoundLithium3.id, 90003, "Checking test Lithium compound has correct ID");
    assert.equal(compoundHydroThium.id, 90004, "Checking test Hydrogen and Lithium compound has correct ID");
    assert.equal(compoundHelThium.id, 90005, "Checking test Helium and Lithium compound has correct ID");
    assert.equal(compoundHydroHelThium.id, 90006, "Checking test Hydrogen, Helium and Lithium compound has correct ID");
    assert.equal(compoundHydroHelThiumAtoms.id, 90007, "Checking test Big compound has correct ID");
    assert.equal(compoundWater.id, COMPOUND_WATER_ID, "Checking water has correct ID");
});

QUnit.test('getChem:', function(assert){
    assert.equal(compoundHydrogen2.getChem().length, 1, "Checking test Hydrogen compound has 1 element");
    assert.equal(compoundHydroHelThiumAtoms.getChem().length, 4, "Checking test Big compound has 4 elements");
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(compoundHydrogen2.getSymbol(), "H2", "Should find correct symbol");
    assert.equal(compoundHelium2.getSymbol(), "He2", "Should find correct symbol");
    assert.equal(compoundLithium3.getSymbol(), "Li3", "Should find correct symbol");
    assert.equal(compoundHydroThium.getSymbol(), "H2Li3", "Should find correct symbol");
    assert.equal(compoundHelThium.getSymbol(), "(He2)2(Li3)2", "Should find correct symbol");
    assert.equal(compoundHydroHelThium.getSymbol(), "((H2)(Li3))3(((He2)2)((Li3)2))3", "Should find correct symbol");
    assert.equal(compoundHydroHelThiumAtoms.getSymbol(), "H2He3Li4(((H2)(Li3))3(((He2)2)((Li3)2))3)", "Should find correct symbol");

    assert.equal(compoundWater.getSymbol(), "H2O", "Get symbol should match from the database entry");
});

QUnit.test('getMolarMass:', function(assert){
    var m;

    m = compoundHydrogen2.getMolarMass();
    assert.true(Math.abs(m - 2.016) < DELTA, "Molar mass of 2 H should be 2.016, was " + m);
    m = compoundHelium2.getMolarMass();
    assert.true(Math.abs(m - 8.006) < DELTA, "Molar mass of 2 He should be 4.006, was " + m);
    m = compoundLithium3.getMolarMass();
    assert.true(Math.abs(m - 20.823) < DELTA, "Molar mass of 3 Li should be 20.823, was " + m);

    m = compoundHydroThium.getMolarMass();
    assert.true(Math.abs(m - 22.839) < DELTA, "Molar mass of HydroThium should be 22.83900, was " + m);
    m = compoundHelThium.getMolarMass();
    assert.true(Math.abs(m - 57.658) < DELTA, "Molar mass of HelThium should be 57.658, was " + m);
    m = compoundHydroHelThium.getMolarMass();
    assert.true(Math.abs(m - 241.491) < DELTA, "Molar mass of HydroHelThium should be 241.491, was " + m);

    m = compoundWater.getMolarMass();
    assert.true(Math.abs(m - 18.015) < DELTA, "Molar mass of water should be 18.015, was " + m);
});


var compoundComp;

QUnit.module("CompoundComponent", {
    before: function(){
        initTestChemProperties();
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
    },
    beforeEach: function(){
        compoundComp = new CompoundComponent(elementHydrogen, 3);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(compoundComp.chemProp, elementHydrogen, "Checking chemProp initialization");
    assert.deepEqual(compoundComp.count, 3, "Checking count initialization");
});

QUnit.test('setChemProp:', function(assert){
    compoundComp.setChemProp(elementHelium);
    assert.deepEqual(compoundComp.chemProp, elementHelium, "Checking ChemProperties is set correctly");
});

QUnit.test('setCount:', function(assert){
    compoundComp.setCount(2);
    assert.equal(compoundComp.count, 2, "Checking count is correctly set");
});