QUnit.test('ExperimentController2D constructor:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    assert.equal(controller.experiment, exp, "Experiment in controller should equal the given experiment.");
    assert.equal(controller.selectedEquipment, null, "selectedEquipment should be null.");
    assert.deepEqual(controller.instructions, [], "instructions should be empty.");
    assert.equal(controller.instructionCounter, 0, "instructionCounter should be 0.");
});

QUnit.test('ExperimentController2D setExperiment:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(null);

    controller.setExperiment(exp);
    assert.equal(controller.experiment, exp,
        "Experiment in Controller should equal the set Experiment.");
});

QUnit.test('ExperimentController2D setSelectedEquipment:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(null);
    var equip = new EquipmentController2D(new Equipment([0, 0], [1, 1], 0, 1, null));

    controller.setSelectedEquipment(equip);
    assert.equal(controller.selectedEquipment, equip,
        "Equipment in Controller should equal the set Equipment.");
});

QUnit.test('ExperimentController2D setInstructions:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(null);
    exp.equipment.push(new BeakerController2D(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, 1)));
    exp.equipment.push(new BeakerController2D(new Beaker([250, 200], [150, 150], 20.0, 50.0, 0.01, 2)));
    let eqs = exp.equipment;
    let instructions = [new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto))];

    controller.setInstructions(instructions);
    assert.deepEqual(controller.instructions, instructions,
        "Instructions in Controller should equal the set Instructions.");
});

QUnit.test('ExperimentController2D setInstructionCounter:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(null);
    exp.equipment.push(new BeakerController2D(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, 1)));
    exp.equipment.push(new BeakerController2D(new Beaker([250, 200], [150, 150], 20.0, 50.0, 0.01, 2)));
    let eqs = exp.equipment;
    let instructions = [];
    for(var i = 0; i < 4; i++) instructions.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));

    controller.setInstructions(instructions);
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0");

    controller.setInstructionCounter(2);
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    controller.setInstructionCounter(-1);
    assert.equal(controller.instructionCounter, 2, "Instruction should not have changed from 2");

    controller.setInstructionCounter(4);
    assert.equal(controller.instructionCounter, 2, "Instruction should not have changed from 2");

    controller.setInstructionCounter(3);
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3");

    controller.setInstructionCounter(1);
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1");
});

QUnit.test('ExperimentController2D nextInstruction:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker1 = new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, 1);
    var beaker2 = new Beaker([250, 200], [150, 150], 20.0, 50.0, 0.01, 2);
    beaker1.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    beaker2.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    controller.addEquipment(new BeakerController2D(beaker1), true);
    controller.addEquipment(new BeakerController2D(beaker2), true);
    let eqs = exp.equipment;
    let instructions = [];
    for(var i = 0; i < 2; i++) instructions.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    var chemControl = new ChemicalController2D(new Chemical(1, "", 20.0, [0, 0, 0]));
    instructions.push(new InstructionController2D(new Instruction(eqs[0], chemControl, eqs[0].addTo)));

    controller.setInstructions(instructions);
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3, ending the instruction list");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should not have changed from 3");

    controller.reset();
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0 after reset");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 0, "Instruction should still be on 0 without placed beakers");

    controller.placeEquipment(0);
    controller.placeEquipment(1);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1 after placing beakers");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    controller.unPlaceEquipment(eqs[0]);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should still be on 2 without beaker 0 in the Experiment");

    controller.placeEquipment(0);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3 with beaker 0 in the Experiment");
});

QUnit.test('ExperimentController2D addEquipment:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, 1));

    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");

    controller.addEquipment(beaker);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.addEquipment(beaker);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.equal(exp.equipment.length, 1, "Experiment should have only one beaker");

    controller.removeEquipment(beaker);
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");

    controller.addEquipment(beaker, true);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");
});

QUnit.test('ExperimentController2D placeEquipment:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, 1));

    controller.addEquipment(beaker);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.placeEquipment(-1);
    assert.true(exp.equipment.includes(beaker), "Experiment should still have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.placeEquipment(1);
    assert.true(exp.equipment.includes(beaker), "Experiment should still have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.placeEquipment(0);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");

    controller.placeEquipment(0);
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");
    assert.equal(controller.placedEquipment.length, 1, "Controller placed Equipment list should have only one beaker.");
});

QUnit.test('ExperimentController2D removeEquipment:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, 1));

    controller.addEquipment(beaker);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    var success = controller.removeEquipment(beaker);
    assert.true(success, "Beaker should successfully be removed");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");

    var success = controller.removeEquipment(beaker);
    assert.false(success, "Beaker removal should fail");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");

    controller.addEquipment(beaker, true);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");

    success = controller.removeEquipment(beaker);
    assert.true(success, "Beaker should successfully be removed");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
});

QUnit.test('ExperimentController2D unPlaceEquipment:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, 1));

    controller.addEquipment(beaker, true);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");

    var success = controller.unPlaceEquipment(beaker);
    assert.true(success, "Beaker should be successfully removed");
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should not have the added beaker.");

    success = controller.unPlaceEquipment(beaker);
    assert.false(success, "Beaker should fail to be removed");
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should not have the added beaker.");

});

QUnit.test('ExperimentController2D reset:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    controller.reset();

    assert.deepEqual(exp.equipment, [], 'equipment should be []');
    assert.equal(controller.selectedEquipment, null, 'selectedEquipment should be null');
    assert.deepEqual(controller.instructions, [], 'instructions should be []');
    assert.equal(controller.instructionCounter, 0, "instructionCounter should be 0.");
});

QUnit.test('ExperimentController2D findEquipmentByPosition:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, 1));
    var beaker2 = new BeakerController2D(new Beaker([100, 0], [20, 15], 1.0, 1.0, 0.1, 2));
    var beaker3 = new BeakerController2D(new Beaker([45, 100], [20, 15], 1.0, 1.0, 0.1, 3));
    var beaker4 = new BeakerController2D(new Beaker([45, 200], [20, 15], 1.0, 1.0, 0.1, 4));
    var beaker5 = new BeakerController2D(new Beaker([45, 210], [20, 15], 1.0, 1.0, 0.1, 5));
    controller.addEquipment(beaker1, true);
    controller.addEquipment(beaker2, true);
    controller.addEquipment(beaker3, true);
    controller.addEquipment(beaker4, true);
    controller.addEquipment(beaker5, true);

    assert.deepEqual(controller.findEquipmentByPosition([5, 5]), beaker1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([105, 5]), beaker2, "Should find the second beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 105], null), beaker3, "Should find the third beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 5]), null, "Should find null.");

    assert.deepEqual(controller.findEquipmentByPosition([5, 5], beaker2), beaker1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([5, 5], beaker1), null, "Should find null.");
    assert.deepEqual(controller.findEquipmentByPosition([105, 5], [beaker2, beaker3]), null, "Should find null.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 5], [beaker2, beaker3]), null, "Should find null.");

    assert.deepEqual(controller.findEquipmentByPosition([50, 201], null), beaker4, "Should find the fourth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 220], null), beaker5, "Should find the fifth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 212], beaker5), beaker4, "Should find the fourth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 212], beaker4), beaker5, "Should find the fifth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 212], [beaker4, beaker5]), null, "Should find null.");
});


QUnit.test('ExperimentController2D findEquipmentByInstanceID:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [20, 15], 1.0, 1.0, 0.1, 1));
    var beaker2 = new BeakerController2D(new Beaker([100, 0], [20, 15], 1.0, 1.0, 0.1, 2));
    var beaker3 = new BeakerController2D(new Beaker([45, 100], [20, 15], 1.0, 1.0, 0.1, 3));
    controller.addEquipment(beaker1, true);
    controller.addEquipment(beaker2, true);
    controller.addEquipment(beaker3, true);

    assert.deepEqual(controller.findEquipmentByInstanceID(1), beaker1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(2), beaker2, "Should find the second beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(3), beaker3, "Should find the third beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(4), null, "Should find null.");

});

QUnit.todo('ExperimentController2D mousePress:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.mousePress();
    assert.true(false);
});

QUnit.todo('ExperimentController2D mouseMove:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.mouseMove();
    assert.true(false);
});

QUnit.todo('ExperimentController2D keyPress:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.keyPress();
    assert.true(false);
});

QUnit.todo('ExperimentController2D render:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.render();
    assert.true(false);
});

QUnit.todo('ExperimentController2D drawEquipSquare:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.drawEquipSquare();
    assert.true(false);
});
