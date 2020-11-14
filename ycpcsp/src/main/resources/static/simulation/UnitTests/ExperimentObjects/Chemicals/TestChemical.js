var properties;
var chem;
var fakeChem;

var DELTA = 0.001;

QUnit.module("Chemical", {
    before(){
        initTestChemProperties();
    },
    beforeEach: function(){
        properties = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        chem = new Chemical(5.0, properties, 10.0, 0.5);
        fakeChem = new Chemical(5.0, new ElementProperties(null), 20.0, 0.5);
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

    let p = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
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
    assert.deepEqual(chem.getTexture(), [255, 255, 200, 255, 180], "Checking correct color is found for gas state");
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

    let p = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
    chem.setProperties(p);
    assert.equal(chem.getID(), 2, "Helium should have ID 2");
});
