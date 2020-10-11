QUnit.test('BeakerController2D constructor:', function(assert){
    var beaker = new Beaker([8, 9], [102, 100], 5.0, 150.0, 0.2);
    var controller = new BeakerController2D(beaker);
    assert.equal(controller.equipment, beaker, "beaker Equipment should be the given beaker");
});

QUnit.test('BeakerController2D canContain:', function(assert){
    var controller = new BeakerController2D(null);
    assert.true(true, "Beaker can contain anything");
});


QUnit.todo('BeakerController2D draw:', function(assert){
    assert.true(false);
});