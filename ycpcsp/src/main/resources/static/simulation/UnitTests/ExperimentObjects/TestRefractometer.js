var lens;
var lensControl;
var refractometer;
var refractometerWithLens;

QUnit.module("Refractometer", {
    beforeEach: function(){
        lens = new RefractometerLens();
        lensControl = new RefractometerLensController2D(lens);
        refractometer = new Refractometer();
        refractometerWithLens = new Refractometer(lensControl);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(refractometer.position, [0, 0], "Checking default position");
    assert.deepEqual(refractometer.size, [120, 36], "Checking default size");
    assert.equal(refractometer.mass, 2, "Checking default mass");
    assert.equal(refractometer.sprite, SPRITE_REFRACTOMETER, "Checking default sprite");
    assert.deepEqual(refractometer.lensControl, null, "Checking no given lens is null");
    assert.deepEqual(refractometerWithLens.lensControl, lensControl, "Checking with given lens is the given lens");
});

QUnit.test('setLens:', function(assert){
    refractometer.setLens(lensControl);
    assert.deepEqual(refractometer.lensControl, lensControl, "Checking sets the used lens to the given lens");

    refractometer.setLens(null);
    assert.deepEqual(refractometer.lensControl, null, "Checking setting to null puts the used lens as null");
});

QUnit.test('getID:', function(assert){
    assert.equal(refractometer.getID(), ID_EQUIP_REFRACTOMETER, "Checking ID is obtained for Refractometer");
});

QUnit.test('setPosition:', function(assert){
    let oldPos = lensControl.getCenter();
    refractometerWithLens.setPosition([10, 10]);
    assert.notDeepEqual(lensControl.getCenter(), oldPos, "Checking the lens is moved when the refractometer is moved");
});

QUnit.test('updateLensPosition:', function(assert){
    refractometer.setLens(null);
    assert.false(refractometer.updateLensPosition(), "Should fail to update the lens position with no lens");

    lensControl.setEquipment(null);
    refractometer.setLens(lensControl);
    assert.false(refractometer.updateLensPosition(), "Should fail to update the lens position with the lens controller not having a lens");

    lensControl.setEquipment(lens);
    refractometer.setPosition([100, 100]);
    lens.setPosition([0, 0]);
    assert.true(refractometer.updateLensPosition(), "Should update the lens position");
    assert.deepEqual(lens.position, [100, 108], "Checking lens position is correctly set");
});


var controller;

QUnit.module("RefractometerController2D", {
    beforeEach: function(){
        lens = new RefractometerLens();
        lensControl = new RefractometerLensController2D(lens);
        refractometer = new Refractometer();
        controller = new RefractometerController2D(refractometer);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(controller.equipment, refractometer, "Checking constructor correctly sets equipment");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(controller.idToFunc(ID_FUNC_REFRACTOMETER_SET_LENS), controller.setLens,
        "Checking function id for setLens gets correct function");
    assert.equal(controller.idToFunc(ID_FUNC_REFRACTOMETER_REMOVE_LENS), controller.removeLens,
        "Checking function id for removeLens gets correct function");
    assert.equal(controller.idToFunc(null), null,
        "Checking invalid id gets null");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(controller.funcToId(controller.setLens), ID_FUNC_REFRACTOMETER_SET_LENS,
        "Checking function for setLens gets correct id");
    assert.equal(controller.funcToId(controller.removeLens), ID_FUNC_REFRACTOMETER_REMOVE_LENS,
        "Checking function for removeLens gets correct id");
    assert.equal(controller.funcToId(null), null,
        "Checking invalid function gets null");
});

QUnit.test('reset:', function(assert){
    refractometer.setLens(lensControl);
    assert.equal(refractometer.lensControl, lensControl, "Checking lens was set");
    controller.reset();
    assert.equal(refractometer.lensControl, lensControl, "Checking lens is now null");
});

QUnit.test('getFuncDescriptions:', function(assert){
    assert.equal(controller.getFuncDescriptions().length, 2, "Checking for the correct number of function descriptions");
});

QUnit.test('setLens:', function(assert){
    controller.setLens(lens);
    assert.equal(controller.lensControl, null, "Should fail to set lens on invalid type");

    let oldPos = lens.position;

    controller.setLens(lensControl);
    assert.deepEqual(refractometer.lensControl, lensControl, "Should set lens with valid type");
    assert.notDeepEqual(lens.position, oldPos, "Checking position of lens was updated");
});

QUnit.test('removeLens:', function(assert){
    let oldPos = lens.position;
    controller.removeLens();
    assert.deepEqual(lens.position, oldPos, "Checking lens position is not changed when it is not set to the refractometer");

    oldPos = lens.position;
    controller.setLens(lensControl);
    controller.removeLens();
    assert.notDeepEqual(lens.position, oldPos, "Checking lens position is changed when it is removed from the refractometer");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});