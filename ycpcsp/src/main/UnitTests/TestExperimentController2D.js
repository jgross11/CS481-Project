var mouseX = 0;
var mouseY = 0;

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
    assert.deepEqual(controller.equipmentBoxes.get(0), beaker, "Equipment boxes should include the added beaker");

    controller.addEquipment(beaker);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.equal(exp.equipment.length, 1, "Experiment should have only one beaker");
    assert.deepEqual(controller.equipmentBoxes.get(0), beaker, "Equipment boxes should still include the added beaker");

    controller.removeEquipment(beaker);
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "Equipment boxes should be empty after removing beaker");

    controller.addEquipment(beaker, true);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "Equipment boxes should be empty after adding and placing beaker");
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
    assert.deepEqual(controller.equipmentBoxes.get(0), beaker, "The Equipment boxes list should contain the beaker.");

    var success = controller.removeEquipment(beaker);
    assert.true(success, "Beaker should successfully be removed");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");

    var success = controller.removeEquipment(beaker);
    assert.false(success, "Beaker removal should fail");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");

    controller.addEquipment(beaker, true);
    assert.true(exp.equipment.includes(beaker), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker), "Controller placed Equipment list should have the added beaker.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");

    success = controller.removeEquipment(beaker);
    assert.true(success, "Beaker should successfully be removed");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");
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

QUnit.todo('ExperimentController2D experimentMouseX:', function(assert){
    var exp = new Experiment("a title", "a name");
    mouseX = 100;
    assert.equal(exp.experimentMouseX(), 100 - EXP_BOUNDS[0], "Experiment mouse position for X should translate left by the x coordinate of the experiment.");
});

QUnit.todo('ExperimentController2D experimentMouseY:', function(assert){
    var exp = new Experiment("a title", "a name");
    mouseY = 300;
    assert.equal(exp.experimentMouseY(), 300 - EXP_BOUNDS[1], "Experiment mouse position for X should translate left by the x coordinate of the experiment.");
});

QUnit.todo('ExperimentController2D experimentMousePos:', function(assert){
    var exp = new Experiment("a title", "a name");
    var pos = exp.experimentMousePos();
    assert.equal(pos[0], exp.experimentMouseX(), "Index 0 of pos should be the x mouse coordinate.");
    assert.equal(pos[1], exp.experimentMouseY(), "Index 1 of pos should be the y mouse coordinate.");
});

QUnit.todo('ExperimentController2D mousePress:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.mousePress();
    assert.true(false);
});

QUnit.todo('ExperimentController2D mouseRelease:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.mouseRelease();
    assert.true(false);
});

QUnit.todo('ExperimentController2D mouseMove:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.mouseMove();
    assert.true(false);
});

QUnit.todo('ExperimentController2D mouseDrag:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);

    controller.mouseDrag();
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


QUnit.test('EquipmentBoxList constructor:', function(assert){
    var eList = new EquipmentBoxList();

    assert.deepEqual(eList.boxes, [], "New list should be empty");
    assert.equal(eList.selected, null, "Selected box should be null");
});

QUnit.test('EquipmentBoxList get:', function(assert){
    var eList = new EquipmentBoxList();
    var beaker = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 1));
    eList.add(beaker);

    assert.deepEqual(eList.get(0), beaker, "Obtained beaker should be the one added");
    assert.deepEqual(eList.get(-1), undefined, "Obtained beaker should be undefined");
    assert.deepEqual(eList.get(1), undefined, "Obtained beaker should be undefined");
});

QUnit.test('EquipmentBoxList selectBox:', function(assert){
    var eList = new EquipmentBoxList();
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [10, 20], 1, 10, 0, 1));
    var beaker2 = new BeakerController2D(new Beaker([0, 0], [12, 6], 1, 10, 0, 2));

    eList.unselect();
    var success = eList.selectBox()
    assert.false(success, "Should be unable to select a new box with no selected box");
    assert.deepEqual(eList.selected, null, "Selected should be null with no selected box");

    eList.unselect();
    eList.add(beaker1);
    eList.add(beaker2);
    var b = eList.boxes[0].bounds();
    mouseX = b[0];
    mouseY = b[1] - 1000;
    success = eList.selectBox();
    assert.false(success, "Should be unable to select a box with the mouse on the wrong position");
    assert.deepEqual(eList.selected, null, "Selected should be null with no selected box");

    eList.unselect();
    var b = eList.boxes[0].bounds();
    mouseX = b[0] + 1;
    mouseY = b[1];
    success = eList.selectBox();
    var eq = eList.selected.equipControl
    assert.true(success, "Should be able to select a box with the mouse on first equipment");
    assert.deepEqual(eq.equipment.position, [mouseX - 5, mouseY - 10], "Coordinates should be centered on the first box index");
    assert.deepEqual(eq, beaker1, "Selected should contain the first beaker");

    eList.unselect();
    var b = eList.boxes[1].bounds();
    mouseX = b[0] + 1;
    mouseY = b[1];
    success = eList.selectBox();
    eq = eList.selected.equipControl
    assert.true(success, "Should be able to select a box with the mouse on second equipment");
    assert.deepEqual(eq.equipment.position, [mouseX - 6, mouseY - 3], "Coordinates should be centered on the second box index");
    assert.deepEqual(eq, beaker2, "Selected should contain the second beaker");
});

QUnit.test('EquipmentBoxList unselect:', function(assert){
    var eList = new EquipmentBoxList();
    var beaker = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 1));
    eList.add(beaker);

    eList.selected = eList.get(0);
    assert.deepEqual(eList.selected, beaker, "Selected should contain the beaker");

    eList.unselect();
    assert.deepEqual(eList.selected, null, "Selected should be null");

});

QUnit.test('EquipmentBoxList add:', function(assert){
    var eList = new EquipmentBoxList();
    var beaker = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 1));
    eList.add(beaker);

    assert.deepEqual(eList.get(0), beaker, "Obtained beaker should be the one added");
});

QUnit.test('EquipmentBoxList remove:', function(assert){
    var eList = new EquipmentBoxList();
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 1));
    var beaker2 = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 2));
    var beaker3 = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 3));
    eList.add(beaker1);
    eList.add(beaker2);
    eList.add(beaker3);

    assert.equal(eList.boxes.length, 3, "Should start with 3 pieces of Equipment");

    var success = eList.remove(beaker2);
    assert.true(success, "Should find and remove beaker 2");
    assert.equal(eList.boxes.length, 2, "Should now have 2 pieces of Equipment");

    var success = eList.remove(beaker2);
    assert.false(success, "Should failed to find and remove beaker 2, which is no longer in the list");
    assert.equal(eList.boxes.length, 2, "Should still have 2 pieces of Equipment");
});

QUnit.test('EquipmentBoxList place:', function(assert){
    var exp = new ExperimentController2D(new Experiment("", ""));
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 1));
    var beaker2 = new BeakerController2D(new Beaker([0, 0], [10, 10], 1, 10, 0, 2));
    var eList = exp.equipmentBoxes;
    exp.addEquipment(beaker1);
    exp.addEquipment(beaker2);

    eList.unselect();
    var success = eList.place(exp);
    assert.false(success, "Should fail to place anything with no selection");
    assert.deepEqual(eList.selected, null, "Selected should be null");

    var b = eList.boxes[0].bounds();
    mouseX = b[0] + 1;
    mouseY = b[1];
    eList.selectBox();
    var place = exp.placedEquipment;
    assert.deepEqual(eList.selected.equipControl, beaker1, "Selected should be the first Beaker");
    assert.equal(place.length, 0, "There should be only no elements in the Experiment before placed list after placing one");

    success = eList.place(exp);
    place = exp.placedEquipment;
    assert.true(success, "Should place Equipment with selection made");
    assert.deepEqual(eList.selected, null, "Selected should be null");
    assert.equal(eList.boxes.length, 1, "There should be only one element in the list after placing one");
    assert.deepEqual(eList.get(0), beaker2, "The only remaining Equipment should be Beaker 2");
    assert.equal(place.length, 1, "There should be only one element in the Experiment placed list after placing one");
    assert.deepEqual(place[0], beaker1, "The only Equipment in the place list should be Beaker 2");
});

QUnit.test('EquipmentBoxList updateSelectPos:', function(assert){
    var eList = new EquipmentBoxList();
    var beaker = new BeakerController2D(new Beaker([0, 0], [4, 10], 1, 10, 0, 1));
    eList.add(beaker);

    eList.unselect();
    var success = eList.updateSelectPos();
    assert.false(success, "Updating the selected position should fail with no selection");

    eList.selected = eList.boxes[0];
    mouseX = 100;
    mouseY = 200;
    success = eList.updateSelectPos();
    let pos = eList.selected.equipControl.equipment.position;
    assert.true(success, "Updating the selected position should succeed with a selection");
    assert.deepEqual(pos, [98, 195], "Should correctly center the Equipment to the mouse");
});

QUnit.todo('EquipmentBoxList draw:', function(assert){
    assert.false(true);
});

QUnit.todo('EquipmentBoxList drawSelected:', function(assert){
    assert.false(true);
});


QUnit.test('EquipmentBox constructor:', function(assert){
    var beaker = new BeakerController2D(new Beaker([0, 0], [4, 10], 1, 10, 0, 1));
    var box = new EquipmentBox(beaker, 1);

    assert.deepEqual(box.equipControl, beaker, "Equipment should be the given beaker");
    assert.equal(box.index, 1, "Index should be 1");
});

QUnit.test('EquipmentBox setEquipment:', function(assert){
    var beaker = new BeakerController2D(new Beaker([0, 0], [4, 10], 1, 10, 0, 1));
    var box = new EquipmentBox(null, 1);

    assert.deepEqual(box.equipControl, null, "Equipment should be null");

    box.setEquipment(beaker);
    assert.deepEqual(box.equipControl, beaker, "Equipment should be the set beaker");
});

QUnit.test('EquipmentBox setIndex:', function(assert){
    var beaker = new BeakerController2D(new Beaker([0, 0], [4, 10], 1, 10, 0, 1));
    var box = new EquipmentBox(beaker, 1);

    assert.equal(box.index, 1, "Index should be 1");

    box.setIndex(2);
    assert.equal(box.index, 2, "Index should be set to 2");
});

QUnit.todo('EquipmentBox draw:', function(assert){
    assert.false(true);
});

QUnit.test('EquipmentBox bounds:', function(assert){
    var box = new EquipmentBox(null, 2);
    var b = box.bounds();

    assert.equal(b[0], EXP_EQUIP_BOX_OFF_X + EXP_EQUIP_BOX_SIZE * 2, "X bounds coordinate should be that of the second index");
    assert.equal(b[1], EXP_EQUIP_BOX_OFF_Y + CANVAS_HEIGHT - EXP_EQUIP_BOX_SIZE, "Y bounds coordinate should be the same for all indexes");
    assert.equal(b[2], EXP_EQUIP_BOX_SIZE, "Width should be the size constant");
    assert.equal(b[3], EXP_EQUIP_BOX_SIZE, "Height should be the size constant");

    box.setIndex(1);
    b = box.bounds();
    assert.equal(b[0], EXP_EQUIP_BOX_OFF_X + EXP_EQUIP_BOX_SIZE * 1, "X bounds coordinate should be that of the second index");
    assert.equal(b[1], EXP_EQUIP_BOX_OFF_Y + CANVAS_HEIGHT - EXP_EQUIP_BOX_SIZE, "Y bounds coordinate should be the same for all indexes");
    assert.equal(b[2], EXP_EQUIP_BOX_SIZE, "Width should be the size constant");
    assert.equal(b[3], EXP_EQUIP_BOX_SIZE, "Height should be the size constant");
});