var boat;

QUnit.module("WeighBoat", {
    beforeEach: function(){
        currentInstanceID = 0;
        boat = new WeighBoat();
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(boat.position, [0, 0], 'Checking default position');
    assert.deepEqual(boat.size, [88, 14.3], 'Checking default size');
    assert.equal(boat.mass, 1, 'Checking default mass');
    assert.equal(boat.capacity, 2, 'Checking default capacity');
    assert.equal(boat.residue, 0, 'Checking default residue');
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
    let chemControl = idToChemical(ELEMENT_LITHIUM_ATOMIC_NUM);
    let chem = chemControl.chemical;
    chem.setTemperature(-1000);
    chemControl.calculateMatterState();

    let chemNewControl = idToChemical(ELEMENT_HELIUM_ATOMIC_NUM);
    let chemNew = idToChemical(ELEMENT_HELIUM_ATOMIC_NUM).chemical;
    chemNew.setTemperature(-1000);
    chemNewControl.calculateMatterState();

    assert.true(controller.canContain(chem), "Empty weigh boat should be able to contain any solid chemical");

    controller.addTo(chem);
    assert.true(controller.canContain(chem), "Weigh boat should be able to add chemical of the same kind");
    assert.false(controller.canContain(chemNew), "Weigh boat should not be able to add chemical of the a different kind");

    controller.emptyOut();
    chem.setTemperature(1000);
    chemControl.calculateMatterState();
    assert.false(controller.canContain(chem), "Weigh boat should not be able to contain a non solid");

    chem.setTemperature(-1000);
    chemControl.calculateMatterState();
    assert.true(controller.canContain(chem), "Weigh boat should not be able to contain a solid");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});

QUnit.test('shouldRender:', function(assert){
    assert.true(controller.shouldRender([0, -5, 10, 10]), "Checking rendering when near edge of bounds, but should render");
    assert.false(controller.shouldRender([0, -50, 10, 10]), "Checking rendering when near edge of bounds, but shouldn't render");
});