QUnit.test('Experiment constructor:', function(assert){
    var exp = new Experiment();

    assert.deepEqual(exp.equipment, [], 'equipment should be []');
    assert.equal(exp.selectedEquipment, null, 'selectedEquipment should be null');
});

QUnit.test('Experiment reset:', function(assert){
    var exp = new Experiment();
    exp.reset();

    assert.deepEqual(exp.equipment, [], 'equipment should be []');
    assert.equal(exp.selectedEquipment, null, 'selectedEquipment should be null');
});

QUnit.todo('Experiment runStep:', function(assert){
    var exp = new Experiment();
    exp.runStep();
    assert.true(false);
});

QUnit.todo('Experiment render:', function(assert){
    var exp = new Experiment();
    exp.render();
    assert.true(false);
});

QUnit.todo('Experiment mousePress:', function(assert){
    var exp = new Experiment();
    exp.mousePress();
    assert.true(false);
});