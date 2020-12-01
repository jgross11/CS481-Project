var waterForSalt;
var waterForChlorine;
var waterForChlorineSalt;
var salt1;
var salt2;
var chlorine1;
var chlorine2;
var saltWater;
var chlorineWater;
var chlorineSaltWater;

var chemControl;

var DELTA = 0.0000001;

QUnit.module("ChemicalSolution", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        waterForSalt = idToChemical(COMPOUND_WATER_ID, 10, 1).chemical;
        waterForChlorine = idToChemical(COMPOUND_WATER_ID, 20, 1).chemical;
        waterForChlorineSalt = idToChemical(COMPOUND_WATER_ID, 100, 1).chemical;

        salt1 = idToChemical(COMPOUND_TABLE_SALT_ID, 1, 1).chemical;
        salt2 = idToChemical(COMPOUND_TABLE_SALT_ID, 2, 1).chemical;

        chlorine1 = idToChemical(ELEMENT_CHLORINE_ATOMIC_NUM, 3, 1).chemical;
        chlorine2 = idToChemical(ELEMENT_CHLORINE_ATOMIC_NUM, 4, 1).chemical;

        saltWater = new ChemicalSolution(waterForSalt, [salt1]);
        chlorineWater = new ChemicalSolution(waterForChlorine, [chlorine1]);
        chlorineSaltWater = new ChemicalSolution(waterForChlorineSalt, [salt2, chlorine2]);

        chemControl = new ChemicalController2D(null);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(saltWater.solute, waterForSalt, "Checking correct solute is set");
    assert.deepEqual(saltWater.solvents, [salt1], "Checking correct solvents are set");

    assert.deepEqual(chlorineWater.solute, waterForChlorine, "Checking correct solute is set");
    assert.deepEqual(chlorineWater.solvents, [chlorine1], "Checking correct solvents are set");

    assert.deepEqual(chlorineSaltWater.solute, waterForChlorineSalt, "Checking correct solute is set");
    assert.deepEqual(chlorineSaltWater.solvents, [salt2, chlorine2], "Checking correct solvents are set");
});

QUnit.test('setSolute:', function(assert){
    saltWater.setSolute(chlorine1);
    assert.deepEqual(saltWater.solute, chlorine1, "Checking solute is correctly set");
});

QUnit.test('setSolvents:', function(assert){
    saltWater.setSolvents([chlorine1, salt1]);
    assert.deepEqual(saltWater.solvents, [chlorine1, salt1], "Checking solvents are correctly set");
});

QUnit.test('getMatterState:', function(assert){
    chemControl.setChemical(waterForSalt);

    saltWater.setTemperature(150);
    chemControl.calculateMatterState();
    assert.equal(saltWater.getMatterState(), MATTER_STATE_GAS, "Checking state was updated to a gas");

    saltWater.setTemperature(50);
    chemControl.calculateMatterState();
    assert.equal(saltWater.getMatterState(), MATTER_STATE_LIQUID, "Checking state was updated to a liquid");
});

QUnit.test('calculateMass:', function(assert){
    assert.equal(saltWater.calculateMass(), 11, "Checking salt water mass is calculated correctly");
    assert.equal(chlorineWater.calculateMass(), 23, "Checking chlorine water mass is calculated correctly");
    assert.equal(chlorineSaltWater.calculateMass(), 106, "Checking chlorine salt water mass is calculated correctly");
});

QUnit.test('setCalculatedMass:', function(assert){
    saltWater.mass = 2;
    assert.equal(saltWater.mass, 2, "Checking salt mass is arbitrarily set");
    saltWater.setCalculatedMass();
    assert.equal(saltWater.mass, 11, "Checking salt mass is updated correctly");
});

QUnit.test('setMass:', function(assert){
    saltWater.setMass(110);
    assert.equal(saltWater.getMass(), 110, "Checking mass is correctly set");
    assert.equal(saltWater.solute.getMass(), 100, "Checking mass of solute is correctly set");
    assert.equal(saltWater.solvents[0].getMass(), 10, "Checking mass of solvent is correctly set");

    chlorineSaltWater.setMass(1060);
    assert.equal(chlorineSaltWater.getMass(), 1060, "Checking mass is correctly set");
    assert.equal(chlorineSaltWater.solute.getMass(), 1000, "Checking mass of solute is correctly set");
    assert.equal(chlorineSaltWater.solvents[0].getMass(), 20, "Checking mass of salt solvent is correctly set");
    assert.equal(chlorineSaltWater.solvents[1].getMass(), 40, "Checking mass of chlorine solvent is correctly set");
});

QUnit.test('setTemperature:', function(assert){
    saltWater.setTemperature(5);
    assert.equal(saltWater.solute.temperature, 5, "Checking solute temperature is set");
    assert.equal(saltWater.solvents[0].temperature, 5, "Checking solvent temperature is set");

    chlorineSaltWater.setTemperature(7);
    assert.equal(chlorineSaltWater.solute.temperature, 7, "Checking solute temperature is set");
    assert.equal(chlorineSaltWater.solvents[0].temperature, 7, "Checking solvent temperature is set");
    assert.equal(chlorineSaltWater.solvents[1].temperature, 7, "Checking solvent temperature is set");
});

QUnit.test('getCreator:', function(assert){
    assert.equal(saltWater.getCreator(), "Solution", "Solutions do not have a creator, should simply be the text");
    assert.equal(chlorineWater.getCreator(), "Solution", "Solutions do not have a creator, should simply be the text");
    assert.equal(chlorineSaltWater.getCreator(), "Solution", "Solutions do not have a creator, should simply be the text");
});

QUnit.test('getName:', function(assert){
    assert.equal(saltWater.getName(), "Table Salt dissolved into Water", "Checking salt water name");
    assert.equal(chlorineWater.getName(), "Chlorine dissolved into Water", "Checking chlorine water name");
    assert.equal(chlorineSaltWater.getName(), "Table Salt, and Chlorine dissolved into Water", "Checking chlorine salt water name");
});

QUnit.test('getSymbol:', function(assert){
    assert.equal(saltWater.getSymbol(), "H2O: NaCl", "Checking symbol found for salt water");
    assert.equal(chlorineWater.getSymbol(), "H2O: Cl", "Checking symbol found for chlorine water");
    assert.equal(chlorineSaltWater.getSymbol(), "H2O: NaCl, Cl", "Checking symbol found for chlorine salt water");
});

QUnit.test('getSolidColor:', function(assert){
    let c = saltWater.getSolidColor();
    assert.true(c[0] - DELTA <= 240 && c[0] + DELTA >= 100, "Checking solid color red is between that of salt and water " + c[0]);
    assert.true(c[1] - DELTA <= 240 && c[1] + DELTA >= 100, "Checking solid color green is between that of salt and water " + c[1]);
    assert.true(c[2] - DELTA <= 255 && c[2] + DELTA >= 240, "Checking solid color blue is between that of salt and water " + c[2]);
    assert.true(c[3] - DELTA <= 255 && c[3] + DELTA >= 255, "Checking solid color alpha is between that of salt and water " + c[3]);
});

QUnit.test('getLiquidColor:', function(assert){
    let c = saltWater.getLiquidColor();
    assert.true(c[0] - DELTA <= 240 && c[0] + DELTA >= 100, "Checking liquid color red is between that of salt and water " + c[0]);
    assert.true(c[1] - DELTA <= 240 && c[1] + DELTA >= 100, "Checking liquid color green is between that of salt and water " + c[1]);
    assert.true(c[2] - DELTA <= 255 && c[2] + DELTA >= 240, "Checking liquid color blue is between that of salt and water " + c[2]);
    assert.true(c[3] - DELTA <= 200 && c[3] + DELTA >= 200, "Checking liquid color alpha is between that of salt and water " + c[3]);
});

QUnit.test('getGasColor:', function(assert){
    let c = saltWater.getGasColor();
    assert.true(c[0] - DELTA <= 240 && c[0] + DELTA >= 100, "Checking gas color red is between that of salt and water " + c[0]);
    assert.true(c[1] - DELTA <= 240 && c[1] + DELTA >= 100, "Checking gas color green is between that of salt and water " + c[1]);
    assert.true(c[2] - DELTA <= 255 && c[2] + DELTA >= 240, "Checking gas color blue is between that of salt and water " + c[2]);
    assert.true(c[3] - DELTA <= 180 && c[3] + DELTA >= 180, "Checking gas color alpha is between that of salt and water " + c[3]);
});

QUnit.test('getColorWeightCombine:', function(assert){
    chlorineWater.setSolute(chlorineSaltWater);
    assert.equal(chlorineWater.getColorWeightCombine(MATTER_STATE_GAS), null, "Checking that an invalid solute returns null");

    chlorineWater.setSolute(waterForChlorine);
    chlorineWater.setSolvents([chlorineSaltWater]);
    assert.equal(chlorineWater.getColorWeightCombine(MATTER_STATE_GAS), null, "Checking that an invalid solvent returns null");

    assert.equal(chlorineSaltWater.getColorWeightCombine(MATTER_STATE_GAS).length, 4, "Checking 4 values for color are returned for a valid ChemicalSolution");
});

QUnit.test('getMolarMass:', function(assert){
    var m;

    m = saltWater.getMolarMass();
    assert.true(Math.abs(m - 19.2237116) < DELTA, "Molar mass of the salt water should be 19.2237116, was " + m)

    m = chlorineWater.getMolarMass();
    assert.true(Math.abs(m - 19.2496004) < DELTA, "Molar mass of the chlorine water should be 19.2496004, was " + m)

    m = chlorineSaltWater.getMolarMass();
    assert.true(Math.abs(m - 18.6029533) < DELTA, "Molar mass of the chlorine salt water should be 18.6029533, was " + m)
});

QUnit.test('getMeltingPoint:', function(assert){
    assert.equal(saltWater.getMeltingPoint(), 0, "Checking melting point");
});

QUnit.test('getBoilingPoint:', function(assert){
    assert.equal(saltWater.getBoilingPoint(), 100, "Checking boiling point");
});

QUnit.test('getDensity:', function(assert){
    var d;

    d = saltWater.getDensity();
    assert.true(Math.abs(d - 0.951181818) < DELTA, "Molar mass of the salt water should be 0.951181818, was " + d);

    d = chlorineWater.getDensity();
    assert.true(Math.abs(d - 0.910147826) < DELTA, "Molar mass of the chlorine water should be 0.910147826, was " + d);

    d = chlorineSaltWater.getDensity();
    console.log(chlorine2.getVolume());
    assert.true(Math.abs(d - 0.963877358) < DELTA, "Molar mass of the chlorine salt water should be 0.963877358, was " + d);
});

QUnit.test('getWaterSolubility:', function(assert){
    assert.false(saltWater.getWaterSolubility(), "All solutions should be non water soluble");
    assert.false(chlorineWater.getWaterSolubility(), "All solutions should be non water soluble");
    assert.false(chlorineSaltWater.getWaterSolubility(), "All solutions should be non water soluble");
});

QUnit.test('containingChem:', function(assert){
    assert.true(saltWater.containingChem(idToChemical(COMPOUND_WATER_ID, 1, 1).chemical) == waterForSalt,
        "Checking that water is found in salt water");
    assert.true(saltWater.containingChem(idToChemical(COMPOUND_TABLE_SALT_ID, 1, 1).chemical) == salt1,
        "Checking that salt is found in salt water");
});

QUnit.test('copyChem:', function(assert){
    chlorineWater.setSolute(saltWater);
    assert.equal(chlorineWater.copyChem(), null, "Checking that an invalid solute returns null");

    chlorineSaltWater.setSolvents([saltWater]);
    assert.equal(chlorineWater.copyChem(), null, "Checking that an invalid solvent returns null");

    let saltCopy = saltWater.copyChem();
    assert.false(saltWater == saltCopy, "Checking that the copy is not the same object as the original");
    assert.false(saltWater.solute == saltCopy.solute, "Checking that the solvent of the copy is not the same object as the original");
    assert.false(saltWater.solvents == saltCopy.solvents, "Checking that the solutes of the copy are not the same object as the original");

    assert.deepEqual(saltWater, saltCopy, "Checking that the copy has the same data as the original");
});