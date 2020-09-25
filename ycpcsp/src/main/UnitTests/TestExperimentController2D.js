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

QUnit.test('ExperimentController2D findEquipment:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, "beaker 1"));
    var beaker2 = new BeakerController2D(new Beaker([100, 0], [20, 15], 1.0, 1.0, 0.1, "beaker 2"));
    var beaker3 = new BeakerController2D(new Beaker([45, 100], [20, 15], 1.0, 1.0, 0.1, "beaker 3"));
    var beaker4 = new BeakerController2D(new Beaker([45, 200], [20, 15], 1.0, 1.0, 0.1, "beaker 4"));
    var beaker5 = new BeakerController2D(new Beaker([45, 210], [20, 15], 1.0, 1.0, 0.1, "beaker 5"));
    controller.experiment.equipment.push(beaker1);
    controller.experiment.equipment.push(beaker2);
    controller.experiment.equipment.push(beaker3);
    controller.experiment.equipment.push(beaker4);
    controller.experiment.equipment.push(beaker5);

    assert.deepEqual(controller.findEquipment([5, 5]), beaker1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipment([105, 5]), beaker2, "Should find the second beaker.");
    assert.deepEqual(controller.findEquipment([50, 105], null), beaker3, "Should find the third beaker.");
    assert.deepEqual(controller.findEquipment([50, 5]), null, "Should find null.");

    assert.deepEqual(controller.findEquipment([5, 5], beaker2), beaker1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipment([5, 5], beaker1), null, "Should find null.");
    assert.deepEqual(controller.findEquipment([105, 5], [beaker2, beaker3]), null, "Should find null.");
    assert.deepEqual(controller.findEquipment([50, 5], [beaker2, beaker3]), null, "Should find null.");

    assert.deepEqual(controller.findEquipment([50, 201], null), beaker4, "Should find the fourth beaker.");
    assert.deepEqual(controller.findEquipment([50, 220], null), beaker5, "Should find the fifth beaker.");
    assert.deepEqual(controller.findEquipment([50, 212], beaker5), beaker4, "Should find the fourth beaker.");
    assert.deepEqual(controller.findEquipment([50, 212], beaker4), beaker5, "Should find the fifth beaker.");
    assert.deepEqual(controller.findEquipment([50, 212], [beaker4, beaker5]), null, "Should find null.");
});

QUnit.todo('ExperimentController2D render:', function(assert){
    var exp = new Experiment();
    var controller = new ExperimentController2D(exp);
    controller.render();
    assert.true(false);
});