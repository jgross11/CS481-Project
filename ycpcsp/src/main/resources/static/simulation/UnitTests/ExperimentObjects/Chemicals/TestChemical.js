var properties;
var chem;
var fakeChem;

QUnit.module("Chemical", {
    before(){
        initTestChemProperties();
    },
    beforeEach: function(){
        properties = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        chem = new Chemical(5.0, properties, 20.0, 0.5);
        fakeChem = new Chemical(5.0, new ElementProperties(null), 20.0, 0.5);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(chem.mass, 5.0, "Initial mass should be 5.0");
    assert.equal(chem.temperature, 20.0, "Initial temperature should be 20.0");
    assert.equal(chem.concentration, 0.5, "Initial concentration should be 0.5");
    assert.equal(chem.matterState, MATTER_STATE_LIQUID, "Initial matter state should be 1.0");
});

QUnit.test('setProperties:', function(assert){
    assert.equal(chem.properties, properties, "Initial properties should be for hydrogen");

    let p = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
    chem.setProperties(p);
    assert.equal(chem.properties, p, "New properties should be for helium");
});

QUnit.test('setTemperature:', function(assert){
    assert.equal(chem.temperature, 20.0, "Initial temperature should be 20.0");

    chem.setTemperature(10.0);
    assert.equal(chem.temperature, 10.0, "New temperature should be 10.0");
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
