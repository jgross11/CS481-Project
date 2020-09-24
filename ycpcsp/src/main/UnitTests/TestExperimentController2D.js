QUnit.test('ExperimentController2D constructor:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    assert.equal(controller.experiment, exp,
        "Experiment in controller should equal the given experiment.");
});

QUnit.test('ExperimentController2D setExperiment:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(null);
    controller.setExperiment(exp);
    assert.equal(controller.experiment, exp,
        "Experiment in controller should equal the set experiment.");
});

QUnit.test('ExperimentController2D reset:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    controller.reset();

    assert.deepEqual(exp.equipment, [], 'equipment should be []');
    assert.equal(exp.selectedEquipment, null, 'selectedEquipment should be null');
});

QUnit.todo('ExperimentController2D runStep:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    controller.runStep();
    assert.true(false);
});

QUnit.todo('ExperimentController2D render:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    controller.render();
    assert.true(false);
});

QUnit.todo('ExperimentController2D mousePress:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    controller.mousePress();
    assert.true(false);
});