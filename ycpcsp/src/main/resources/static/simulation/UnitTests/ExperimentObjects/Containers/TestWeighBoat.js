var boat;

QUnit.module("WeighBoat", {
    beforeEach: function(){
        currentInstanceID = 0;
        boat = new WeighBoat();
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(boat.position, [0, 0], 'default position should be [0, 0]');
    assert.deepEqual(boat.size, [75, 75], 'default size should be [75, 75]');
    assert.equal(boat.mass, 3, 'default mass should be 3');
    assert.equal(boat.capacity, 1000, 'default capacity should be 1000');
    assert.equal(boat.residue, 0.03, 'default residue should be 0.03');
    assert.equal(boat.instanceID, 0, 'instanceID should be 0');
    assert.equal(boat.sprite, SPRITE_WEIGH_BOAT, 'sprite should be SPRITE_WEIGH_BOAT');
});

QUnit.test('getID:', function(assert){
    assert.equal(boat.getID(), ID_EQUIP_WEIGH_BOAT, 'Should get the correct ID for weigh boat');
});


var controller;

QUnit.module("WeighBoatController2D", {
    beforeEach: function(){
        boat = new WeighBoat();
        controller = new WeighBoatController2D(boat);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, boat, "controller Equipment should be the given boat");
});

QUnit.test('canContain:', function(assert){
    let chem = idToChemical(ELEMENT_LITHIUM_ATOMIC_NUM);
    let chemNew = idToChemical(ELEMENT_HELIUM_ATOMIC_NUM);
    assert.true(controller.canContain(chem.chemical), "Empty weigh boat should be able to contain any chemical");

    controller.addTo(chem);
    assert.true(controller.canContain(chem.chemical), "Weigh boat should be able to add chemical of the same kind");
    assert.false(controller.canContain(chemNew.chemical), "Weigh boat should not be able to add chemical of the a different kind");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});