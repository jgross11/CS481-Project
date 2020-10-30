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
var elementNew;

QUnit.module("ElementProperties", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementNew = new ElementProperties(9999, "person");
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
    assert.deepEqual(elementHydrogen.chemFromProperties(), ELEMENT_PROPERTIES[ELEMENT_HYDROGEN_ATOMIC_NUM],
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
    assert.equal(elementHydrogen.getSymbol(), "H", "Should get H for the symbol of Hydrogen");
    assert.equal(elementNew.getSymbol(), "", "Undefined element symbol should be an empty string");
});

QUnit.test('getTexture:', function(assert){
    assert.deepEqual(elementHydrogen.getTexture(), [255, 255, 200], "Should get the defined color of Hydrogen");
    assert.equal(elementNew.getTexture(), undefined, "Undefined element should have undefined texture");
});

QUnit.test('getMolarMass:', function(assert){
    assert.equal(elementHydrogen.getMolarMass(), 1.008, "Should get 1.008 for the molar mass of Hydrogen");
    assert.equal(elementNew.getMolarMass(), undefined, "Undefined element molar mass should be undefined");
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


var elementHelium;
var elementLithium;

var compoundHydrogen;
var compoundHelium;
var compoundLithium;

var compoundHydroThium;
var compoundHelThium;
var compoundHydroHelThium;
let DELTA = 0.000001;

QUnit.module("CompoundProperties", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        elementLithium = new ElementProperties(ELEMENT_LITHIUM_ATOMIC_NUM);

        compoundHydrogen = new CompoundProperties([elementHydrogen], 2, "Nature", 10001, "HydrogenDouble", [1, 2, 3], 1, 2, 3);
        compoundHelium = new CompoundProperties([elementHelium], 2, "Nature", 10002, "HeliumDouble", [4, 5, 6], 4, 5, 6);
        compoundLithium = new CompoundProperties([elementLithium], 3, "Nature", 10003, "LithiumTriple", [7, 8, 9], 7, 8, 9);

        compoundHydroThium = new CompoundProperties([compoundHydrogen, elementLithium], 1, "Nature", 10004, "HydroThium", [10, 20, 30], 1.5, 2.5, 3.5);
        compoundHelThium = new CompoundProperties([compoundHelium, compoundLithium], 2, "Nature", 10005, "HelThium", [40, 50, 60], 4.5, 5.5, 6.5);
        compoundHydroHelThium = new CompoundProperties([compoundHydroThium, compoundHelThium], 3, "Nature", 10006, [70, 80, 90], "HydroHelThium", 7.5, 8.5, 9.5);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(compoundHydrogen.name, "HydrogenDouble", "Name should match given name in constructor");
    assert.equal(compoundHydrogen.meltingPoint, 1, "Melting point should match given melting point in constructor");
    assert.equal(compoundHydrogen.boilingPoint, 2, "Boiling point should match given boiling point in constructor");
    assert.equal(compoundHydrogen.density, 3, "Density should match given density in constructor");
});

QUnit.test('getID:', function(assert){
    assert.equal(compoundHydrogen.getID(), 10001, "Get ID should match given ID in constructor");
    assert.equal(compoundHelium.getID(), 10002, "Get ID should match given ID in constructor");
    assert.equal(compoundLithium.getID(), 10003, "Get ID should match given ID in constructor");
});

QUnit.test('getName:', function(assert){
    assert.equal(compoundHydrogen.getName(), "HydrogenDouble", "Get name should match given name in constructor");
    assert.equal(compoundHelium.getName(), "HeliumDouble", "Get name should match given name in constructor");
    assert.equal(compoundLithium.getName(), "LithiumTriple", "Get name should match given name in constructor");
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(compoundHydrogen.getSymbol(), "2H", "Should find correct symbol");
    assert.equal(compoundHelium.getSymbol(), "2He", "Should find correct symbol");
    assert.equal(compoundLithium.getSymbol(), "3Li", "Should find correct symbol");

    assert.equal(compoundHydroThium.getSymbol(), "(2HLi)", "Should find correct symbol");
    assert.equal(compoundHelThium.getSymbol(), "2(2He3Li)", "Should find correct symbol");
    assert.equal(compoundHydroHelThium.getSymbol(), "3((2HLi)2(2He3Li))", "Should find correct symbol");
});

QUnit.test('getTexture:', function(assert){
    assert.deepEqual(compoundHydrogen.getTexture(), [1, 2, 3], "Get texture should match given texture in constructor");
    assert.deepEqual(compoundHelium.getTexture(), [4, 5, 6], "Get texture should match given texture in constructor");
    assert.deepEqual(compoundLithium.getTexture(), [7, 8, 9], "Get texture should match given texture in constructor");
});

QUnit.test('getMolarMass:', function(assert){
    var m;

    m = compoundHydrogen.getMolarMass();
    assert.true(Math.abs(m - 2.016) < DELTA, "Molar mass of 2H should be 2.016, was " + m);
    m = compoundHelium.getMolarMass();
    assert.true(Math.abs(m - 8.006) < DELTA, "Molar mass of 2He should be 4.006, was " + m);
    m = compoundLithium.getMolarMass();
    assert.true(Math.abs(m - 20.823) < DELTA, "Molar mass of 3Li should be 20.823, was " + m);

    m = compoundHydroThium.getMolarMass();
    assert.true(Math.abs(m - 8.957) < DELTA, "Molar mass of (Li2H) should be 20.823, was " + m);
    m = compoundHelThium.getMolarMass();
    assert.true(Math.abs(m - 57.658) < DELTA, "Molar mass of 2(3Li2He) should be 20.823, was " + m);
    m = compoundHydroHelThium.getMolarMass();
    assert.true(Math.abs(m - 199.845) < DELTA, "Molar mass of 3((Li2H)2(3Li2He)) should be 20.823, was " + m);
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(compoundHydrogen.getMeltingPoint(), 1, "Get melting point should match given melting point in constructor");
    assert.equal(compoundHelium.getMeltingPoint(), 4, "Get melting point should match given melting point in constructor");
    assert.equal(compoundLithium.getMeltingPoint(), 7, "Get melting point should match given melting point in constructor");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(compoundHydrogen.getBoilingPoint(), 2, "Get boiling point should match given boiling point in constructor");
    assert.equal(compoundHelium.getBoilingPoint(), 5, "Get boiling point should match given boiling point in constructor");
    assert.equal(compoundLithium.getBoilingPoint(), 8, "Get boiling point should match given boiling point in constructor");
});

QUnit.test('getDensity:', function(assert){
    assert.equal(compoundHydrogen.getDensity(), 3, "Get density should match given density in constructor");
    assert.equal(compoundHelium.getDensity(), 6, "Get density should match given density in constructor");
    assert.equal(compoundLithium.getDensity(), 9, "Get density should match given density in constructor");
});