var dropper;

QUnit.module("EyeDropper", {
    beforeEach: function(){
        dropper = new EyeDropper();
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(dropper.position, [0, 0], "Checking default position");
    assert.deepEqual(dropper.size, [20, 90], "Checking default size");
    assert.equal(dropper.mass, 0.5, "Checking default mass");
    assert.equal(dropper.capacity, 1.0, "Checking default capacity");
    assert.equal(dropper.residue, 0.1, "Checking default residue");
    assert.equal(dropper.sprite, SPRITE_EYE_DROPPER, "Checking default sprite");
});

QUnit.test('getID:', function(assert){
    assert.equal(dropper.getID(), ID_EQUIP_EYE_DROPPER, "Checking eye dropper ID is correct");
});


var controller;
var beakerControl;
var water;

QUnit.module("EyeDropperController2D", {
    beforeEach: function(){
        dropper = new EyeDropper();
        controller = new EyeDropperController2D(dropper);
        beakerControl = idToEquipment(ID_EQUIP_BEAKER_50mL);
        water = idToChemical(COMPOUND_WATER_ID, 0.5, 1);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(controller.equipment, dropper, "Checking controller equipment is correct");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(controller.idToFunc(ID_FUNC_EYE_DROPPER_DROP), controller.drop, "Should get the function drop");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(controller.funcToId(controller.drop), ID_FUNC_EYE_DROPPER_DROP, "Should get the ID for drop");
});

QUnit.test('getFuncDescriptions:', function(assert){
    let desc = controller.getFuncDescriptions();
    assert.equal(desc.length, 4, "EyeDroppers should have four function descriptions");
});

QUnit.test('drop:', function(assert){
    assert.true(beakerControl.equipment.isEmpty(), "Checking beaker is initially empty");
    assert.true(dropper.isEmpty(), "Checking eye dropper is initially empty");

    controller.addTo(water);
    assert.false(controller.equipment.isEmpty(), "Checking eye dropper is now not empty");

    let oldVolume = dropper.getTotalContentsVolume();
    controller.drop(beakerControl);
    assert.false(beakerControl.equipment.isEmpty(), "Checking beaker is now not empty");
    assert.false(dropper.isEmpty(), "Checking eye dropper is still not empty");
    assert.true(dropper.getTotalContentsVolume() < oldVolume, "Checking contents of eye dropper are less than before the drop was placed");
});

QUnit.test('canContain:', function(assert){
    water.chemical.setTemperature(50);
    water.calculateMatterState();
    assert.true(controller.canContain(water.chemical), "Checking eye droppers can contain liquid");

    water.chemical.setTemperature(-50);
    water.calculateMatterState();
    assert.false(controller.canContain(water.chemical), "Checking eye droppers cannot contain solids");

    water.chemical.setTemperature(150);
    water.calculateMatterState();
    assert.false(controller.canContain(water.chemical), "Checking eye droppers cannot contain gasses");

    let newC = idToChemical(ELEMENT_HYDROGEN_ATOMIC_NUM, 0.1, 1);
    newC.chemical.setTemperature(-257);
    controller.addTo(newC);
    assert.false(controller.canContain(newC.chemical), "Checking eye droppers cannot contain a new kind of chemical with one already in place");
});

QUnit.todo('canContain:', function(assert){
    assert.true(false);
});