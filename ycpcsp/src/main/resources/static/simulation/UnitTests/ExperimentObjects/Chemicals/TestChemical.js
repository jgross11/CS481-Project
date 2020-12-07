var properties;
var chem;
var carbon;
var fakeChem;

var DELTA = 0.001;

QUnit.module("Chemical", {
    before(){
        initTestChemProperties();
    },
    beforeEach: function(){
        properties = new ChemProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        chem = new Chemical(5.0, properties, 10.0, 0.5);
        carbon = new Chemical(5.0, new ChemProperties(ELEMENT_CARBON_ATOMIC_NUM), 10.0, 0.5);
        fakeChem = new Chemical(5.0, new ChemProperties(null), 20.0, 0.5);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(chem.mass, 5.0, "Checking constructor mass");
    assert.equal(chem.temperature, 10.0, "Checking constructor temperature");
    assert.equal(chem.concentration, 0.5, "Checking constructor concentration");
    assert.equal(chem.matterState, MATTER_STATE_LIQUID, "Checking constructor matter state");
});

QUnit.test('getVolume:', function(assert){
    let v = chem.getVolume();
    assert.true(Math.abs(v - 55.5555556) < DELTA, "Volume should be 55.5555556, was " + v);
});

QUnit.test('setVolume:', function(assert){
    chem.setVolume(6);
    let v = chem.getVolume();
    assert.true(Math.abs(v - 6) < DELTA, "After setting, volume should be 6, was " + v);
});

QUnit.test('addVolume:', function(assert){
     chem.addVolume(3);
    let v = chem.getVolume();
    assert.true(Math.abs(v - 58.5555556) < DELTA, "After adding 3 volume, volume should be 58.5555556, was " + v);
});

QUnit.test('setProperties:', function(assert){
    assert.equal(chem.properties, properties, "Initial properties should be for hydrogen");

    let p = new ChemProperties(ELEMENT_HELIUM_ATOMIC_NUM);
    chem.setProperties(p);
    assert.equal(chem.properties, p, "New properties should be for helium");
});

QUnit.test('setTemperature:', function(assert){
    assert.equal(chem.temperature, 10.0, "Initial temperature should be 20.0");

    chem.setTemperature(5.0);
    assert.equal(chem.temperature, 5.0, "New temperature should be 10.0");
});

QUnit.test('getTexture:', function(assert){
    chem.setMatterState(MATTER_STATE_SOLID);
    assert.deepEqual(chem.getTexture(), [255, 255, 200, 255], "Checking correct color is found for solid state");

    chem.setMatterState(MATTER_STATE_LIQUID);
    assert.deepEqual(chem.getTexture(), [255, 255, 200, 200], "Checking correct color is found for liquid state");

    chem.setMatterState(MATTER_STATE_GAS);
    assert.deepEqual(chem.getTexture(), [255, 255, 200, 180], "Checking correct color is found for gas state");
});

QUnit.test('getMatterState:', function(assert){
    chem.setMatterState(MATTER_STATE_SOLID);
    assert.equal(chem.getMatterState(), MATTER_STATE_SOLID, "Checking solid state was obtained successfully");
});

QUnit.test('setMatterState:', function(assert){
    chem.setMatterState(MATTER_STATE_SOLID);
    assert.equal(chem.matterState, MATTER_STATE_SOLID, "Checking solid state was set successfully");

    chem.setMatterState(MATTER_STATE_LIQUID);
    assert.equal(chem.matterState, MATTER_STATE_LIQUID, "Checking liquid state was set successfully");

    chem.setMatterState(MATTER_STATE_GAS);
    assert.equal(chem.matterState, MATTER_STATE_GAS, "Checking gas state was set successfully");
});

QUnit.test('setConcentration:', function(assert){
    assert.equal(chem.concentration, 0.5, "Initial concentration should be 0.5");

    chem.setConcentration(1.0);
    assert.equal(chem.concentration, 1.0, "New concentration should be 1");

    chem.setConcentration(0);
    assert.equal(chem.concentration, 0, "New concentration should be 0");

    chem.setConcentration(0.3);
    assert.equal(chem.concentration, 0.3, "New concentration should be 0.3");

    chem.setConcentration(2);
    assert.equal(chem.concentration, 1, "New concentration should be 1");

    chem.setConcentration(-1);
    assert.equal(chem.concentration, 0, "New concentration should be 1");
});


QUnit.test('getID:', function(assert){
    assert.equal(fakeChem.getID(), undefined, "An unknown Chemical should have an undefined ID");

    assert.equal(chem.getID(), 1, "Hydrogen should have ID 1");

    let p = new ChemProperties(ELEMENT_HELIUM_ATOMIC_NUM);
    chem.setProperties(p);
    assert.equal(chem.getID(), 2, "Helium should have ID 2");
});

QUnit.test('getCreator:', function(assert){
    assert.equal(chem.getCreator(), "Nature", "Checking creator is correctly obtained");
    assert.equal(carbon.getCreator(), "Nature", "Checking creator is correctly obtained");
});

QUnit.test('getName:', function(assert){
    assert.equal(chem.getName(), "Hydrogen", "Checking name is correctly obtained");
    assert.equal(carbon.getName(), "Carbon", "Checking name is correctly obtained");
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(chem.getSymbol(), "H", "Checking symbol is correctly obtained");
    assert.equal(carbon.getSymbol(), "C", "Checking symbol is correctly obtained");
});

QUnit.test('getSolidColor:', function(assert){
    assert.deepEqual(chem.getSolidColor(), [255, 255, 200, 255], "Checking color for solid is correctly obtained");
    assert.deepEqual(carbon.getSolidColor(), [200, 70, 70, 255], "Checking color for solid is correctly obtained");
});

QUnit.test('getLiquidColor:', function(assert){
    assert.deepEqual(chem.getLiquidColor(), [255, 255, 200, 200], "Checking color for liquid is correctly obtained");
    assert.deepEqual(carbon.getLiquidColor(), [200, 70, 70, 200], "Checking color for liquid is correctly obtained");
});

QUnit.test('getGasColor:', function(assert){
    assert.deepEqual(chem.getGasColor(), [255, 255, 200, 180], "Checking color for gas is correctly obtained");
    assert.deepEqual(carbon.getGasColor(), [200, 70, 70, 180], "Checking color for gas is correctly obtained");
});

QUnit.test('getMolarMass:', function(assert){
    assert.equal(chem.getMolarMass(), 1.008, "Checking molar mass is correctly obtained");
    assert.equal(carbon.getMolarMass(), 12.011, "Checking molar mass is correctly obtained");
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(chem.getMeltingPoint(), -259, "Checking melting point is correctly obtained");
    assert.equal(carbon.getMeltingPoint(), 3500, "Checking melting point is correctly obtained");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(chem.getBoilingPoint(), -253, "Checking boiling point is correctly obtained");
    assert.equal(carbon.getBoilingPoint(), 4827, "Checking boiling point is correctly obtained");
});

QUnit.test('getDensity:', function(assert){
    assert.equal(chem.getDensity(), 0.09, "Checking density point is correctly obtained");
    assert.equal(carbon.getDensity(), 2.26, "Checking density point is correctly obtained");
});

QUnit.test('getWaterSolubility:', function(assert){
    assert.true(chem.getWaterSolubility(), "Checking water solubility is correctly obtained");
    assert.false(carbon.getWaterSolubility(), "Checking water solubility is correctly obtained");
});

QUnit.test('copyChem:', function(assert){
    var copied = chem.copyChem();
    assert.deepEqual(chem, copied, "Copied chemical should be identical to original chemical");
});