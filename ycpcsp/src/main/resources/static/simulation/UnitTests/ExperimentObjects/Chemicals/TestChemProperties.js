var chem;
var chlorine;
var chemFake;

var elementHydrogen;
var elementHelium;
var elementLithium;
var elementNew;

QUnit.module("ChemProperties", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        chem = new ChemProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        chlorine = new ChemProperties(ELEMENT_CHLORINE_ATOMIC_NUM);
        chemFake = new ChemProperties(-1);

        elementHydrogen = new ChemProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ChemProperties(ELEMENT_HELIUM_ATOMIC_NUM);
        elementLithium = new ChemProperties(ELEMENT_LITHIUM_ATOMIC_NUM);
        elementNew = new ChemProperties(9999);
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
    assert.equal(elementHydrogen.getSymbol(), "H", "Should get the symbol of Hydrogen");
    assert.equal(elementHelium.getSymbol(), "He", "Should get the symbol of Helium");
    assert.equal(elementLithium.getSymbol(), "Li", "Should get the symbol of Lithium");
    assert.equal(elementNew.getSymbol(), "", "Undefined element symbol should be an empty string");
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
    assert.equal(elementHydrogen.getMolarMass(), 1.008, "Should get 1.008 for the molar mass of Hydrogen");
    assert.deepEqual(elementNew.getMolarMass(), undefined, "Fake element molar mass should be undefined");
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