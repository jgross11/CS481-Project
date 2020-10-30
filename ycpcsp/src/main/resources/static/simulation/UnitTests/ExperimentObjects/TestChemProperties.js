var chem1;

QUnit.module("ChemProperties ", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        chem1 = new ChemProperties("test chem", 2, "person");
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(chem1.chem, "test chem", "Should have given chem");
    assert.equal(chem1.count, 2, "Should have given count of 2");
    assert.equal(chem1.creator, "person", "Should have given creator of 'person'");
});

QUnit.test('getChem:', function(assert){
    assert.equal(chem1.getChem(), "test chem", "Should have given chem");
});

QUnit.test('setChem:', function(assert){
    chem1.setChem("new chem");
    assert.equal(chem1.getChem(), "new chem", "Should have given chem");
});

QUnit.test('getCount:', function(assert){
    assert.equal(chem1.getCount(), 2, "Should have given count of 2");
});

QUnit.test('setCount:', function(assert){
    chem1.setCount(3);
    assert.equal(chem1.getCount(), 3, "Should have given count of 3");
});

QUnit.test('getCreator:', function(assert){
    assert.equal(chem1.getCreator(), "person", "Should have given creator of 'person'");
});

QUnit.test('setCreator:', function(assert){
    chem1.setCreator("dude")
    assert.equal(chem1.getCreator(), "dude", "Should have given creator of 'dude'");
});

QUnit.test('getID:', function(assert){
    assert.throws(chem1.getID, "Generic ChemProperties should throw an error on getID");
});

QUnit.test('getName:', function(assert){
    assert.throws(chem1.getName, "Generic ChemProperties should throw an error on getName");
});

QUnit.test('getSymbol:', function(assert){
    assert.throws(chem1.getName, "Generic ChemProperties should throw an error on getSymbol");
});

QUnit.test('getTexture:', function(assert){
    assert.throws(chem1.getTexture, "Generic ChemProperties should throw an error on getTexture");
});

QUnit.test('getMolarMass:', function(assert){
    assert.throws(chem1.getName, "Generic ChemProperties should throw an error on getMolarMass");
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.throws(chem1.getName, "Generic ChemProperties should throw an error on getMeltingPoint");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.throws(chem1.getName, "Generic ChemProperties should throw an error on getBoilingPoint");
});

QUnit.test('getDensity:', function(assert){
    assert.throws(chem1.getName, "Generic ChemProperties should throw an error on getBoilingPoint");
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
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM, 1);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM); // TODO make these use more than 1 for count
        elementLithium = new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM);
        elementNew = new ElementProperties(9999, 1, "person");
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(elementHydrogen.chem, ELEMENT_HYDROGEN_ATOMIC_NUM, "Hydrogen element should have correct atomic number for chem");
    assert.equal(elementHydrogen.creator, "Nature", "Hydrogen element creator should automatically be assigned as 'Nature'");

    assert.equal(elementNew.chem, 9999, "New element should have given chem value");
    assert.equal(elementNew.creator, "person", "New element should have given name 'person'");
});

QUnit.test('getAtomicNumber:', function(assert){
    assert.equal(elementHydrogen.getAtomicNumber(), ELEMENT_HYDROGEN_ATOMIC_NUM, "Hydrogen element should have correct atomic number");
    assert.equal(elementNew.getAtomicNumber(), 9999, "New element should have given atomic number");
});

QUnit.test('chemFromProperties:', function(assert){
    assert.deepEqual(elementHydrogen.chemFromProperties(), CHEMICAL_PROPERTIES[ELEMENT_HYDROGEN_ATOMIC_NUM],
        "Should get the properties of Hydrogen");
    assert.deepEqual(elementNew.chemFromProperties(), {}, "Should get an empty object from an unknown atomic number");
});

QUnit.test('getID:', function(assert){
    assert.equal(elementHydrogen.getID(), 1, "Should get the ID of Hydrogen");
    assert.equal(elementNew.getID(), 9999, "Should get given ID of undefined element");
});

QUnit.test('getName:', function(assert){
    assert.equal(elementHydrogen.getName(), "Hydrogen", "Should get the name of Hydrogen");
    assert.equal(elementNew.getName(), undefined, "Undefined element name should be undefined");
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(elementHydrogen.getSymbol(), "H", "Should get the symbol of Hydrogen");
    assert.equal(elementHelium.getSymbol(), "He", "Should get the symbol of Helium");
    assert.equal(elementLithium.getSymbol(), "Li", "Should get the symbol of Lithium");
    assert.equal(elementNew.getSymbol(), "", "Undefined element symbol should be an empty string");
});

QUnit.test('getTexture:', function(assert){
    assert.deepEqual(elementHydrogen.getTexture(), [255, 255, 200], "Should get the defined color of Hydrogen");
    assert.equal(elementNew.getTexture(), undefined, "Undefined element should have undefined texture");
});

QUnit.test('getMolarMass:', function(assert){
    assert.equal(elementHydrogen.getMolarMass(), 1.008, "Should get 1.008 for the molar mass of Hydrogen");
    assert.deepEqual(elementNew.getMolarMass(), NaN, "Undefined element molar mass should be NaN");
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(elementHydrogen.getMeltingPoint(), -259, "Should get -259 for the melting point of Hydrogen");
    assert.equal(elementNew.getMeltingPoint(), undefined, "Undefined element melting point should be undefined");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(elementHydrogen.getBoilingPoint(), -253, "Should get -253 for the boiling point of Hydrogen");
    assert.equal(elementNew.getBoilingPoint(), undefined, "Undefined element boiling point should be undefined");
});

QUnit.test('getDensity:', function(assert){
    assert.equal(elementHydrogen.getDensity(), 0.09, "Should get 0.09 for the density of Hydrogen");
    assert.equal(elementNew.getDensity(), undefined, "Undefined element density should be undefined");
});

var compoundHydrogen2;
var compoundHelium2;
var compoundLithium3;

var compoundHydroThium;
var compoundHelThium;
var compoundHydroHelThium;
var compoundHydroHelThiumAtoms;

var compoundWater;

let DELTA = 0.000001;

QUnit.module("CompoundProperties", {
    before: function(){
        initTestChemProperties();
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
    assert.equal(compoundHydrogen2.name, "HydrogenDouble", "Name should match given name in constructor");
    assert.equal(compoundHydrogen2.meltingPoint, 1, "Melting point should match given melting point in constructor");
    assert.equal(compoundHydrogen2.boilingPoint, 2, "Boiling point should match given boiling point in constructor");
    assert.equal(compoundHydrogen2.density, 3, "Density should match given density in constructor");
});

QUnit.test('getID:', function(assert){
    assert.equal(compoundHydrogen2.getID(), 90001, "Get ID should match given ID in constructor");
    assert.equal(compoundHelium2.getID(), 90002, "Get ID should match given ID in constructor");
    assert.equal(compoundLithium3.getID(), 90003, "Get ID should match given ID in constructor");

    assert.equal(compoundWater.getID(), COMPOUND_WATER_ID, "Get ID should match given ID for water in constructor");
});

QUnit.test('getName:', function(assert){
    assert.equal(compoundHydrogen2.getName(), "HydrogenDouble", "Get name should match given name in constructor");
    assert.equal(compoundHelium2.getName(), "HeliumDouble", "Get name should match given name in constructor");
    assert.equal(compoundLithium3.getName(), "LithiumTriple", "Get name should match given name in constructor");

    assert.equal(compoundWater.getName(), "Water", "Get name should match from database entry");
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

QUnit.test('getTexture:', function(assert){
    assert.deepEqual(compoundHydrogen2.getTexture(), [1, 2, 3], "Get texture should match given texture in constructor");
    assert.deepEqual(compoundHelium2.getTexture(), [4, 5, 6], "Get texture should match given texture in constructor");
    assert.deepEqual(compoundLithium3.getTexture(), [7, 8, 9], "Get texture should match given texture in constructor");

    assert.deepEqual(compoundWater.getTexture(), [100, 100, 255], "Get texture should match from the database entry");
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

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(compoundHydrogen2.getMeltingPoint(), 1, "Get melting point should match given melting point in constructor");
    assert.equal(compoundHelium2.getMeltingPoint(), 4, "Get melting point should match given melting point in constructor");
    assert.equal(compoundLithium3.getMeltingPoint(), 7, "Get melting point should match given melting point in constructor");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(compoundHydrogen2.getBoilingPoint(), 2, "Get boiling point should match given boiling point in constructor");
    assert.equal(compoundHelium2.getBoilingPoint(), 5, "Get boiling point should match given boiling point in constructor");
    assert.equal(compoundLithium3.getBoilingPoint(), 8, "Get boiling point should match given boiling point in constructor");
});

QUnit.test('getDensity:', function(assert){
    assert.equal(compoundHydrogen2.getDensity(), 3, "Get density should match given density in constructor");
    assert.equal(compoundHelium2.getDensity(), 6, "Get density should match given density in constructor");
    assert.equal(compoundLithium3.getDensity(), 9, "Get density should match given density in constructor");
});