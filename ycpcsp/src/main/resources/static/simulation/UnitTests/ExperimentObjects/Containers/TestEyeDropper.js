var dropper;

QUnit.module("EyeDropper", {
    beforeEach: function(){
        dropper = new EyeDropper();
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(dropper.position, [0, 0], "Checking default position");
    assert.deepEqual(dropper.size, [20, 90], "Checking default size");
    assert.equal(dropper.mass, 1.0, "Checking default mass");
    assert.equal(dropper.capacity, 5.0, "Checking default capacity");
    assert.equal(dropper.residue, 0.1, "Checking default residue");
    assert.equal(dropper.sprite, SPRITE_EYE_DROPPER, "Checking default sprite");
});

QUnit.test('getID:', function(assert){
    assert.equal(dropper.getID(), ID_EQUIP_EYE_DROPPER, "Checking eye dropper ID is correct");
});


var controller;

QUnit.module("EyeDropperController2D", {
    beforeEach: function(){
        dropper = new EyeDropper();
        controller = new EyeDropperController2D(dropper);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(controller.equipment, dropper, "Checking controller equipment is correct");
});

QUnit.test('canContain:', function(assert){
    var c = idToChemical(COMPOUND_WATER_ID, 0.5, 1);

    c.chemical.setTemperature(50);
    c.calculateMatterState();
    assert.true(controller.canContain(c.chemical), "Checking eye droppers can contain liquid");

    c.chemical.setTemperature(-50);
    c.calculateMatterState();
    assert.false(controller.canContain(c.chemical), "Checking eye droppers cannot solids");

    c.chemical.setTemperature(150);
    c.calculateMatterState();
    assert.false(controller.canContain(c.chemical), "Checking eye droppers cannot gasses");
});

QUnit.todo('canContain:', function(assert){
    assert.true(false);
});