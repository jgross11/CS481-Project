var beakerControl;
var scale;
var scalePlaced;

QUnit.module("Scale", {
    beforeEach: function(){
        beakerControl = idToEquipment(ID_EQUIP_BEAKER_50mL);
        scale = new Scale(null);
        scalePlaced = new Scale(beakerControl);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(scale.position, [0, 0], 'Checking for correct initial position');
    assert.deepEqual(scale.size, [120, 60], 'Checking for correct initial size');
    assert.equal(scale.mass, 100, 'Checking for correct initial mass');
    assert.equal(scale.sprite, SPRITE_SCALE, 'Checking for correct initial sprite');
    assert.equal(scale.displayedWeight, 0, 'Checking for correct initial displayed weight');
    assert.equal(scale.objectToBeWeighed, null, 'Checking for correct initial weighed object with no given container');
    assert.equal(scale.zeroOut, 0, 'Checking for correct initial zero out value');

    assert.equal(scalePlaced.objectToBeWeighed, beakerControl, 'Checking for correct initial weighed object with a given container');
});

QUnit.test('setPosition:', function(assert){
    scale.setPosition([1, 2]);
    assert.deepEqual(scale.position, [1, 2], 'Checking for correct setting position correctly');

    beakerControl.equipment.setPosition([-1000, -1000]);
    scalePlaced.setPosition([3, 4]);
    assert.deepEqual(beakerControl.equipment.position, [33, -56], 'Checking for correct setting position relative to scale');
    assert.deepEqual(scalePlaced.position, [3, 4], 'Checking for new position of container on the scale');
});

QUnit.test('updateHeldPosition:', function(assert){
    beakerControl.equipment.setPosition([-1000, -1000]);
    scalePlaced.updateHeldPosition();
    assert.deepEqual(beakerControl.equipment.position, [30, -60], 'Checking for correct setting position relative to scale');
});

QUnit.test('setDisplayedWeight:', function(assert){
    scale.setDisplayedWeight(200);
    assert.equal(scale.displayedWeight, 200, 'Checking for correct set displayed weight');
});

QUnit.test('setObjectToBeWeighed:', function(assert){
    assert.equal(scale.objectToBeWeighed, null, 'Checking for correct initial weighed object before setting object');

    scale.setObjectToBeWeighed(beakerControl);
    assert.deepEqual(scale.objectToBeWeighed, beakerControl, 'Checking for correct placed object after setting object');
});

QUnit.test('setZeroOut:', function(assert){
    scale.setZeroOut(10);
    assert.equal(scale.zeroOut, 10, 'Checking for correct set zero out value');
});

QUnit.todo('getWeightObj:', function(assert){
    assert.true(false); // TODO
});

QUnit.todo('getHeldWeight:', function(assert){
    assert.true(false); // TODO
});

QUnit.test('getID:', function(assert){
    assert.equal(scale.getID(), ID_EQUIP_SCALE, 'Checking for correct ID for scale');
    assert.equal(scalePlaced.getID(), ID_EQUIP_SCALE, 'Checking for correct ID for scale');
});


var scaleControl;

QUnit.module("ScaleController2D", {
    beforeEach: function(){
        beakerControl = idToEquipment(ID_EQUIP_BEAKER_50mL);
        scale = new Scale(null);
        scaleControl = new ScaleController2D(scale);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(scaleControl.equipment, scale, "Check tht constructor correctly stores scale model");
});

QUnit.test('setScaleObject:', function(assert){
    scaleControl.setScaleObject(beakerControl.equipment);
    assert.deepEqual(scale.objectToBeWeighed, null,
        "Check that scale object still holds null after setting object to something other than a ContainerController2D");

    scaleControl.setScaleObject(beakerControl);
    assert.deepEqual(scale.objectToBeWeighed, beakerControl,
        "Check that scale object still holds the given beaker controller after setting object to it");
    assert.equal(scale.displayedWeight, 15, "Check that the displayed weight matches the mass of the beaker");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(scaleControl.idToFunc(ID_FUNC_TO_TAKE_WEIGHT), scaleControl.setScaleObject,
        "Check scale controller has correct function for setScaleObject ID");
    assert.equal(scaleControl.idToFunc(-1), null,
        "Check scale controller returns null for invalid id");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(scaleControl.funcToId(scaleControl.setScaleObject), ID_FUNC_TO_TAKE_WEIGHT,
        "Check scale controller has correct ID for setScaleObject");
    assert.equal(scaleControl.funcToId(null), null,
        "Check scale controller returns null for invalid function");
});

QUnit.test('reset:', function(assert){
    scale.setObjectToBeWeighed(beakerControl);
    scale.setZeroOut(2);
    assert.deepEqual(scale.objectToBeWeighed, beakerControl, "Before calling reset, scale should have object");
    assert.equal(scale.zeroOut, 2, "Before calling reset, scale should have zero out value 2");

    scaleControl.reset();
    assert.deepEqual(scale.objectToBeWeighed, null, "After calling reset, scale should have no object");
    assert.equal(scale.zeroOut, 0, "Before calling reset, scale should have zero out value 0");
});

QUnit.todo('updateWeighingObjectMass:', function(assert){
    assert.true(false); // TODO
});

QUnit.test('getFuncDescriptions:', function(assert){
    assert.equal(scaleControl.getFuncDescriptions().length, 1, "Checking that scales have one function description");
    assert.equal(scaleControl.getFuncDescriptions()[0], "Place Equipment", "Checking that scales have correct description names");
});

QUnit.todo('zeroOut:', function(assert){
    assert.true(false); // TODO
});

QUnit.todo('clearZeroOut:', function(assert){
    assert.true(false); // TODO
});

QUnit.todo('update:', function(assert){
    assert.true(false); // TODO
});

QUnit.todo('draw:', function(assert){
    assert.true(false); // TODO
});