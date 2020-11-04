var beaker;
var controller;

QUnit.module("BeakerController2D", {
    beforeEach: function(){
        beaker = new Beaker(ID_EQUIP_BEAKER_50mL);
        controller = new BeakerController2D(beaker);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, beaker, "beaker Equipment should be the given beaker");
});

QUnit.test('canContain:', function(assert){
    assert.true(controller.canContain(idToChemical(ID_CHEM_TEST_RED).chemical), "Beaker can contain anything");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});