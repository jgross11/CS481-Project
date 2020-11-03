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

QUnit.test('getZeroedWeight:', function(assert){
    assert.equal(scale.getZeroedWeight(), 0, "Checking that scale initially has nothing for zeroed out value");

    scale.setObjectToBeWeighed(beakerControl);
    assert.equal(scale.getZeroedWeight(), 15, "Checking that scale now has the mass of the beaker for zeroed out value");

    beakerControl.addTo(idToChemical(ID_CHEM_TEST_RED, 5, 1));
    assert.equal(scale.getZeroedWeight(), 20, "Checking that scale now has the mass of the beaker, and it's contents for zeroed out value");
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

QUnit.test('removeScaleObject:', function(assert){
    scaleControl.setScaleObject(beakerControl);
    assert.deepEqual(scale.objectToBeWeighed, beakerControl, "Checking that the object to be weighed was set");
    assert.notEqual(scale.displayedWeight, 0, "Checking that displayed weight is different after adding a beaker");

    scaleControl.removeScaleObject();
    assert.deepEqual(scale.objectToBeWeighed, null, "Checking that the object to be weighed was removed");
    assert.equal(scale.displayedWeight, 0, "Checking that displayed weight is zero after removing a beaker");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(scaleControl.idToFunc(ID_FUNC_SCALE_TO_TAKE_WEIGHT), scaleControl.setScaleObject,
        "Check scale controller has correct function for setScaleObject ID");
    assert.equal(scaleControl.idToFunc(ID_FUNC_SCALE_REMOVE_OBJECT), scaleControl.removeScaleObject,
        "Check scale controller has correct function for removeScaleObject ID");
    assert.equal(scaleControl.idToFunc(ID_FUNC_SCALE_ZERO_OUT), scaleControl.zeroOut,
        "Check scale controller has correct function for zeroOut ID");
    assert.equal(scaleControl.idToFunc(ID_FUNC_SCALE_CLEAR_ZERO), scaleControl.clearZeroOut,
        "Check scale controller has correct function for clearZeroOut ID");
    assert.equal(scaleControl.idToFunc(-1), null,
        "Check scale controller returns null for invalid id");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(scaleControl.funcToId(scaleControl.setScaleObject), ID_FUNC_SCALE_TO_TAKE_WEIGHT,
        "Check scale controller has correct ID for setScaleObject");
    assert.equal(scaleControl.funcToId(scaleControl.removeScaleObject), ID_FUNC_SCALE_REMOVE_OBJECT,
        "Check scale controller has correct ID for removeScaleObject");
    assert.equal(scaleControl.funcToId(scaleControl.zeroOut), ID_FUNC_SCALE_ZERO_OUT,
        "Check scale controller has correct ID for zeroOut");
    assert.equal(scaleControl.funcToId(scaleControl.clearZeroOut), ID_FUNC_SCALE_CLEAR_ZERO,
        "Check scale controller has correct ID for clearZeroOut");
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

QUnit.test('updateWeighingObjectMass:', function(assert){
    scaleControl.setScaleObject(beakerControl);
    assert.deepEqual(scale.objectToBeWeighed, beakerControl, "Checking that the object to be weighed was set");
    assert.equal(scale.displayedWeight, beakerControl.equipment.mass, "Checking that displayed weight is the mass of the set beaker");

});

QUnit.test('getFuncDescriptions:', function(assert){
    assert.equal(scaleControl.getFuncDescriptions().length, 4, "Checking that scales have one function description");
});

QUnit.test('zeroOut:', function(assert){
    scaleControl.setScaleObject(beakerControl);
    assert.equal(scale.getZeroedWeight(), beakerControl.equipment.mass, "Checking that zeroed mass is the beaker's mass before zeroing out");

    scaleControl.zeroOut();
    assert.equal(scale.getZeroedWeight(), 0, "Checking that zeroing out made the zeroed mass 0");

    scaleControl.removeScaleObject();
    assert.equal(scale.getZeroedWeight(), -beakerControl.equipment.mass, "Checking that after removing object, zeroed mass is negative that of the object");
});

QUnit.test('clearZeroOut:', function(assert){
    scaleControl.setScaleObject(beakerControl);
    scaleControl.zeroOut();
    assert.equal(scale.getZeroedWeight(), 0, "Checking that zeroed mass is 0 after zeroing out scale");

    scaleControl.clearZeroOut();
    assert.equal(scale.getZeroedWeight(), beakerControl.equipment.mass, "Checking that zeroed mass is the beaker's mass after resetting zeroed out value");
});

QUnit.todo('update:', function(assert){
    assert.true(false);
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});