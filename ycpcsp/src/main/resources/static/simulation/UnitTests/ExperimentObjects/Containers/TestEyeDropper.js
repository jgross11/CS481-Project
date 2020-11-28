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
    before: function(){
        initTestChemProperties();
    },
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

QUnit.test('canContain:', function(assert){
    let chemControl = idToChemical(COMPOUND_WATER_ID, 0.01, 1);
    let chem = chemControl.chemical;
    chem.setTemperature(50);
    chemControl.calculateMatterState();

    let chemNewControl = idToChemical(ELEMENT_HELIUM_ATOMIC_NUM, 0.01, 1);
    let chemNew = chemNewControl.chemical;
    chemNew.setTemperature(-270);
    chemNewControl.calculateMatterState();

    assert.true(controller.canContain(chem), "Empty eye dropper should be able to contain a liquid");

    controller.addTo(chemControl);
    assert.false(dropper.isEmpty(), "Should have successfully added the chemical");
    assert.true(controller.canContain(chem), "Eye dropper should be able to add chemical of the same kind");
    assert.false(controller.canContain(chemNew), "Eye dropper should not be able to add chemical of the a different kind");

    controller.emptyOut();
    chem.setTemperature(-50);
    chemControl.calculateMatterState();
    assert.false(controller.canContain(chem), "Eye dropper should not be able to contain a solid");

    controller.emptyOut();
    chem.setTemperature(150);
    chemControl.calculateMatterState();
    assert.false(controller.canContain(chem), "Eye dropper should not be able to contain a gas");
});