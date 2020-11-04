var trashcan;
var trashcanControl;
var beaker;
var beakerControl;

QUnit.module("Trashcan", {
    beforeEach: function(){
        trashcan = new Trashcan();
    }
});

QUnit.test('constructor:', function(assert){
    assert.expect(0);
});

QUnit.test('getID:', function(assert){
    assert.equal(trashcan.getID(), ID_EQUIP_TRASHCAN, "Should get the ID for Trashcan");
});

QUnit.module("TrashcanController2D", {
    beforeEach: function(){
        trashcan = new Trashcan();
        trashcanControl = new TrashcanController2D(trashcan);
        beaker = new Beaker(ID_EQUIP_BEAKER_50mL);
        beakerControl = new BeakerController2D(beaker);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(trashcanControl.equipment, trashcan, "Should have the given Trashcan");
});

QUnit.test('dispose:', function(assert){
    beaker.setContents(new Chemical(5, "eq", 20, [0, 0, 0]));
    assert.false(beaker.isEmpty(), "Beaker should not be empty before its chemicals are disposed");

    assert.true(trashcanControl.dispose(beakerControl), "Should successfully dispose of the Chemicals in the beaker");
    assert.true(beaker.isEmpty(), "Beaker should be empty after disposing chemicals");

    assert.false(trashcanControl.dispose(beaker), "Should fail to dispose of contents when invalid object is given to dispose");
});