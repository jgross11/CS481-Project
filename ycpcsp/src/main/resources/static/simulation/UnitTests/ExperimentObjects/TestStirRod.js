var stirRod;
var control;
var beakerControl;
var beaker;

QUnit.module("StirRod", {
    beforeEach: function(){
        stirRod = new StirRod();
        beakerControl = idToEquipment(ID_EQUIP_BEAKER_600mL);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(stirRod.position, [0, 0], "Checking default position is correct");
    assert.deepEqual(stirRod.size, [80, 80], "Checking default size is correct");
    assert.equal(stirRod.mass, 1, "Checking default mass is correct");
    assert.equal(stirRod.sprite, SPRITE_STIR_ROD, "Checking sprite is correct");
});

QUnit.test('getID:', function(assert){
    assert.equal(stirRod.getID(), ID_EQUIP_STIR_ROD, "Checking StirRod gets the correct ID");
});

QUnit.module("StirRodController2D", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        beakerControl = idToEquipment(ID_EQUIP_BEAKER_600mL);
        beaker = beakerControl.equipment;
        stirRod = new StirRod();
        control = new StirRodController2D(stirRod);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(control.equipment, stirRod, "Checking given equipment matches");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(control.idToFunc(ID_FUNC_STIR_ROD_STIR), control.stir, "Checking correct function is found for stir ID");
    assert.equal(control.idToFunc(null), null, "Checking no function is found for invalid ID");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(control.funcToId(control.stir), ID_FUNC_STIR_ROD_STIR, "Checking correct ID is found for stir function");
    assert.equal(control.funcToId(null), null, "Checking no ID is found for invalid function");
});

QUnit.test('getFuncDescriptions:', function(assert){
    assert.equal(control.getFuncDescriptions().length, 1, "Checking that stir rods have one function description");
});

QUnit.test('reset:', function(assert){
    control.reset();
    assert.expect(0);
});

QUnit.test('stir:', function(assert){
    beakerControl.addTo(idToChemical(COMPOUND_WATER_ID, 10, 1));
    beakerControl.addTo(idToChemical(COMPOUND_TABLE_SALT_ID, 10, 1));
    assert.equal(beaker.contents.length, 2, "Checking beaker has the two chemicals");
    assert.true(control.stir(beakerControl), "Stir rod should successfully stir a beaker controller with water and salt");
    assert.false(control.stir(beakerControl.equipment), "Stir rod should be unable to stir a beaker, not controller");
    assert.equal(beaker.contents.length, 1, "Checking after stirring that beaker has only one chemical, the solution");

    beakerControl.emptyOut();
    beakerControl.addTo(idToChemical(COMPOUND_WATER_ID, 10, 1));
    assert.false(control.stir(beakerControl), "Stir rod should be unable to stir a beaker with no valid solution");
});