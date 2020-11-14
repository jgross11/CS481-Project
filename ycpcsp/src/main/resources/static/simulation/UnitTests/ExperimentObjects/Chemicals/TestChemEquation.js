var equationWater;
var equationSalt;
var equationFake;

var DELTA = 0.001;

QUnit.module("ChemEquation", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        equationWater = new ChemEquation(EQUATION_WATER_ID);
        equationSalt = new ChemEquation(EQUATION_TABLE_SALT_ID);
        equationFake = new ChemEquation(-1);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(equationWater.id, EQUATION_WATER_ID, "Checking water equation has correct ID");
    assert.equal(equationSalt.id, EQUATION_TABLE_SALT_ID, "Checking salt equation has correct ID");
    assert.equal(equationFake.id, -1, "Checking fake equation has correct ID");
});

QUnit.test('equationFromProperties:', function(assert){
    assert.equal(equationWater.equationFromProperties(), EQUATION_PROPERTIES[EQUATION_WATER_ID],
        "Checking water equation obtains correct properties");
    assert.deepEqual(equationFake.equationFromProperties(), {}, "Checking fake equation obtains an empty object");
});

QUnit.test('getReactants:', function(assert){
    assert.notDeepEqual(equationWater.getReactants(), undefined, "Checking the reactants for water are defined");
    assert.deepEqual(equationFake.getReactants(), undefined,
        "Checking the reactants for the fake equation are defined");
});

QUnit.test('getProducts:', function(assert){
    assert.notDeepEqual(equationWater.getProducts(), undefined, "Checking the products for water are defined");
    assert.deepEqual(equationFake.getProducts(), undefined,
        "Checking the products for the fake equation are defined");
});

QUnit.test('calculateProducts:', function(assert){
    var moles = [2, 5];
    var results = equationWater.calculateProducts(moles);
    var c;

    c = results[0][0];
    assert.true(Math.abs(c - 0) < DELTA, "Should get 0 moles of hydrogen gas remaining, was " + c);
    c = results[0][1];
    assert.true(Math.abs(c - 4) < DELTA, "Should get 4 moles of oxygen gas remaining, was " + c);
    c = results[1][0];
    assert.true(Math.abs(c - 2) < DELTA, "Should get 2 moles of water, was " + c);


    moles = [3, 2];
    results = equationSalt.calculateProducts(moles);

    c = results[0][0];
    assert.true(Math.abs(c - 2) < DELTA, "Should get 2 moles of chlorine remaining, was " + c);
    c = results[0][1];
    assert.true(Math.abs(c - 0) < DELTA, "Should get 0 moles of sodium remaining, was " + c);
    c = results[1][0];
    assert.true(Math.abs(c - 2) < DELTA, "Should get 2 moles of salt, was " + c);
});

QUnit.test('processChemList:', function(assert){
    var chems = [];
    chems[COMPOUND_HYDROGEN_GAS_ID] = idToChemical(COMPOUND_HYDROGEN_GAS_ID, 1, 1).chemical;
    chems[COMPOUND_OXYGEN_GAS_ID] = idToChemical(COMPOUND_OXYGEN_GAS_ID, 4, 1).chemical;

    equationWater.processChemList(chems);

    var c;
    c = chems[COMPOUND_OXYGEN_GAS_ID];
    assert.equal(c, undefined, "Checking no oxygen remains");
    c = chems[COMPOUND_HYDROGEN_GAS_ID];
    assert.true(Math.abs(c.mass - 0.496) < DELTA, "Should get 0.496 grams of hydrogen gas, was " + c.mass);
    c = chems[COMPOUND_WATER_ID];
    assert.true(Math.abs(c.mass - 4.504) < DELTA, "Should get 4.504 grams of water, was " + c.mass);


    chems = [];
    chems[COMPOUND_CHLORINE_GAS_ID] = idToChemical(COMPOUND_CHLORINE_GAS_ID, 2, 1).chemical;
    chems[ELEMENT_SODIUM_ATOMIC_NUM] = idToChemical(ELEMENT_SODIUM_ATOMIC_NUM, 3, 1).chemical;
    chems[ID_CHEM_TEST_RED] = idToChemical(ID_CHEM_TEST_RED, 10, 1).chemical;

    equationSalt.processChemList(chems);

    c = chems[ID_CHEM_TEST_RED];
    assert.true(Math.abs(c.mass - 10) < DELTA, "Checking unaffected chemical did not change");
    c = chems[COMPOUND_CHLORINE_GAS_ID];
    assert.equal(c, undefined, "Checking no chlorine remains");
    c = chems[ELEMENT_SODIUM_ATOMIC_NUM];
    assert.true(Math.abs(c.mass - 1.703) < DELTA, "Should get 1.703 grams of sodium, was " + c.mass);
    c = chems[COMPOUND_TABLE_SALT_ID];
    assert.true(Math.abs(c.mass - 3.297) < DELTA, "Should get 3.297 grams of salt, was " + c.mass);
});


var eqComp;
var elementHydrogen;

QUnit.module("EquationComponent", {
    before: function(){
        initTestChemProperties();
        elementHydrogen = new ElementProperties(ELEMENT_HYDROGEN_ATOMIC_NUM);
        elementHelium = new ElementProperties(ELEMENT_HELIUM_ATOMIC_NUM);
    },
    beforeEach: function(){
        eqComp = new EquationComponent(2, elementHydrogen);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(eqComp.coefficient, 2, "Checking coefficient initialized correctly");
    assert.deepEqual(eqComp.chemProp, elementHydrogen, "Checking chemProp initialized correctly");
});

QUnit.test('setCoefficient:', function(assert){
    eqComp.setCoefficient(3);
    assert.equal(eqComp.coefficient, 3, "Checking coefficient set correctly");
});

QUnit.test('setChemProp:', function(assert){
    eqComp.setChemProp(elementHelium);
    assert.deepEqual(eqComp.chemProp, elementHelium, "Checking chemProp set to helium");
});
