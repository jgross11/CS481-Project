var beaker;
var controller;

QUnit.module("BeakerController2D", {
    beforeEach: function(){
        beaker = new Beaker([8, 9], [102, 100], 5.0, 150.0, 0.2);
        controller = new BeakerController2D(beaker);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, beaker, "beaker Equipment should be the given beaker");
});

QUnit.test('canContain:', function(assert){
    assert.true(true, "Beaker can contain anything");
});


QUnit.todo('draw:', function(assert){
    assert.true(false);
});