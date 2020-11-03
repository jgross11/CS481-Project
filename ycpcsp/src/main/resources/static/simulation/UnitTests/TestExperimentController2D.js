var mouseX;
var mouseY;
var exp;
var controller;
var beaker1;
var beaker2;
var beaker3;
var beaker4;
var beaker5;
var beakerControl1;
var beakerControl2;
var beakerControl3;
var beakerControl4;
var beakerControl5;
var chem;
var chemControl;

var dList;
var eList;
var cList;

var eBox1;
var eBox2;
var dBox1;
var dBox2;
var cBox;

var camera1;
var camera2;
var camera3;

function createGraphics(){}

QUnit.module("ExperimentController2D", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        currentInstanceID = 1;
        mouseX = 0;
        mouseY = 0;
        exp = new Experiment("a title", "a name");
        controller = new ExperimentController2D(exp);

        currentInstanceID = 10;
        beaker1 = new Beaker(ID_EQUIP_BEAKER_50mL);
        beaker1.setResidue(0);
        beaker1.setPosition([0, 0]);
        beaker1.setSize([10, 20]);

        beaker2 = new Beaker(ID_EQUIP_BEAKER_150mL);
        beaker2.setResidue(0);
        beaker2.setPosition([100, 0]);
        beaker2.setSize([12, 6]);

        beaker3 = new Beaker(ID_EQUIP_BEAKER_250mL);
        beaker3.setResidue(0);
        beaker3.setPosition([45, 100]);
        beaker3.setSize([20, 15]);

        beaker4 = new Beaker(ID_EQUIP_BEAKER_600mL);
        beaker4.setResidue(0);
        beaker4.setPosition([45, 200]);
        beaker4.setSize([20, 15]);

        beaker5 = new Beaker(ID_EQUIP_BEAKER_50mL);
        beaker5.setResidue(0);
        beaker5.setPosition([45, 210]);
        beaker5.setSize([20, 15]);

        beakerControl1 = new BeakerController2D(beaker1);
        beakerControl2 = new BeakerController2D(beaker2);
        beakerControl3 = new BeakerController2D(beaker3);
        beakerControl4 = new BeakerController2D(beaker4);
        beakerControl5 = new BeakerController2D(beaker5);

        chem = idToChemical(ID_CHEM_TEST_RED, 1, 1).chemical;
        chemControl = idToChemical(ID_CHEM_TEST_BLACK, 5, 1);

        dList = new DisplayBoxList();
        eList = new EquipmentBoxList();
        cList = new ChemicalBoxList();

        eBox1 = new EquipmentBox(beakerControl1, 1);
        eBox2 = new EquipmentBox(null, 2);

        dBox1 = new DisplayBox(beaker1, 3);
        dBox2 = new DisplayBox(null, 4);

        cBox = new ChemicalBox(chem, 5);

        camera1 = new ExperimentCamera(null, null);
        camera2 = new ExperimentCamera(null, [10, 20, 1000, 2000]);
        camera3 = new ExperimentCamera([30, 50], [0, 0, 100, 100]);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.experiment, exp, "Experiment in controller should equal the given experiment.");
    assert.equal(controller.selectedEquipment, null, "selectedEquipment should be null.");
    assert.equal(controller.instructionCounter, 0, "instructionCounter should be 0.");
});

QUnit.test('setExperiment:', function(assert){
    controller.setExperiment(null);
    assert.equal(controller.experiment, null,
        "Experiment in Controller should be null.");

    controller.setExperiment(exp);
    assert.equal(controller.experiment, exp,
        "Experiment in Controller should equal the set Experiment.");
});

QUnit.test('setSelectedActor:', function(assert){
    controller.setSelectedActor(null);
    assert.equal(controller.selectedActor, null,
        "Selected actor in Controller should be null.");

    controller.setSelectedActor(beakerControl1);
    assert.equal(controller.selectedActor, beakerControl1,
        "Selected actor in Controller should be the set Equipment.");
});

QUnit.test('setSelectedReceiver:', function(assert){
    controller.setSelectedReceiver(null);
    assert.equal(controller.selectedReceiver, null,
        "Selected receiver in Controller should be null.");

    controller.setSelectedReceiver(beakerControl1);
    assert.equal(controller.selectedReceiver, beakerControl1,
        "Selected receiver in Controller should be the set Equipment.");
});

QUnit.test('selectEquipment:', function(assert){
    exp.disposers = [];
    assert.false(controller.selectEquipment(), "Should fail select equipment when finding none");

    controller.camera.setBounds(null);
    controller.camera.setPos([0, 0]);
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);

    mouseX = 5 + EXP_BOUNDS_X_OFFSET;
    mouseY = 5 + EXP_BOUNDS_Y_OFFSET;
    assert.true(controller.selectEquipment(), "Should successfully select equipment");
    assert.deepEqual(controller.selectedActor, beakerControl1, "Should select beaker1 for the actor.");
    assert.deepEqual(controller.selectedReceiver, null, "Should still have a null selected receiver.");

    mouseX = 5 + EXP_BOUNDS_X_OFFSET;
    mouseY = 5 + EXP_BOUNDS_Y_OFFSET;
    assert.false(controller.selectEquipment(), "Should fail to select equipment, when the new equipment is the already selected actor");
    assert.deepEqual(controller.selectedActor, beakerControl1, "Should still have beaker1 for the actor.");
    assert.deepEqual(controller.selectedReceiver, null, "Should still have a null selected receiver.");

    mouseX = 105 + EXP_BOUNDS_X_OFFSET;
    mouseY = 5 + EXP_BOUNDS_Y_OFFSET;
    assert.true(controller.selectEquipment(), "Should successfully select equipment");
    assert.deepEqual(controller.selectedActor, beakerControl1, "Should still have beaker1 for the actor.");
    assert.deepEqual(controller.selectedReceiver, beakerControl2, "Should select beaker2 for the receiver.");

    mouseX = 50 + EXP_BOUNDS_X_OFFSET;
    mouseY = 105 + EXP_BOUNDS_Y_OFFSET;
    assert.false(controller.selectEquipment(), "Should fail to select equipment");
    assert.deepEqual(controller.selectedActor, beakerControl1, "Should still have beaker1 for the actor.");
    assert.deepEqual(controller.selectedReceiver, beakerControl2, "Should still have beaker2 for the receiver.");
});

QUnit.test('clearSelected:', function(assert){
    beaker1.setContents(chem);
    controller.setSelectedActor(beakerControl1);
    controller.setSelectedReceiver(beakerControl2);

    assert.deepEqual(controller.selectedActor, beakerControl1,
        "Selected actor should be beakerControl1 after making selection");
    assert.deepEqual(controller.selectedReceiver, beakerControl2,
        "Selected actor should be beakerControl2 after making selection");

    controller.clearSelected();
    assert.deepEqual(controller.selectedActor, null, "Selected actor should be null after clearing selections");
    assert.deepEqual(controller.selectedReceiver, null, "Selected actor should be null after clearing selections");

    controller.clearSelected();
    assert.deepEqual(controller.selectedActor, null, "Selected actor should still be null after clearing empty selections");
    assert.deepEqual(controller.selectedReceiver, null, "Selected actor should still be null after clearing empty selections");
});

QUnit.test('selectedEquipFunction:', function(assert){
    var result;
    controller.camera.setBounds(null);
    controller.camera.setPos([0, 0]);
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);
    beaker1.setContents(chem);
    var goodX = 105 + EXP_BOUNDS[0];
    var goodY = 5 + EXP_BOUNDS[1];
    var badX = -1000;
    var badY = -1000;

    controller.setSelectedActor(beakerControl1);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(null);
    assert.false(result, "Calling the function without a valid function should fail.");

    controller.setSelectedActor(null);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
    assert.false(result, "Calling the function without selected equipment should fail.");

    controller.setSelectedActor(beakerControl1);
    mouseX = badX;
    mouseY = badY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
    assert.false(result, "Calling the function without a valid equipment in selection range should fail.");

    controller.setSelectedActor(beakerControl1);
    controller.setSelectedReceiver(beakerControl2);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
    assert.true(result, "Calling the function with valid setup should succeed.");

    controller.setSelectedActor(beakerControl1);
    controller.setSelectedReceiver(null);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO, beaker2);
    assert.true(result, "Calling the function with valid actor, and valid receiver parameters should succeed.");
});

QUnit.test('setMovingEquipment:', function(assert){
    controller.movingEquipAnchor = null;
    controller.setMovingEquipment(null);
    controller.camera.setBounds(null);
    controller.camera.setPos([0, 0]);
    assert.equal(controller.movingEquipment, null,
        "Moving Equipment in Controller should be null.");
    assert.equal(controller.movingEquipAnchor, null,
        "Moving Equipment anchor in Controller should still be null.");

    mouseX = 5;
    mouseY = 4;
    controller.setMovingEquipment(beakerControl3);
    assert.equal(controller.movingEquipment, beakerControl3,
        "Moving Equipment in Controller should be null.");
    assert.deepEqual(controller.movingEquipAnchor, [40 + EXP_BOUNDS[0], 96 + EXP_BOUNDS[1]],
        "Moving Equipment anchor in Controller should have been set based on the mouse position.");

    mouseX = -15;
    mouseY = 20;
    controller.setMovingEquipment(beakerControl3);
    assert.equal(controller.movingEquipment, beakerControl3,
        "Moving Equipment in Controller should be null.");
    assert.deepEqual(controller.movingEquipAnchor, [60 + EXP_BOUNDS[0], 80 + EXP_BOUNDS[1]],
        "Moving Equipment anchor in Controller should have been set based on the mouse position.");
});

QUnit.test('updateMovingEquipmentPos:', function(assert){
    controller.movingEquipment = null;
    controller.updateMovingEquipmentPos();
    assert.deepEqual(controller.movingEquipment, null, "Moving Equipment should still be null.");

    mouseX = 1;
    mouseY = 2;
    controller.camera.setBounds(null);
    controller.camera.setPos([10, 200]);
    controller.movingEquipment = beakerControl1;
    controller.movingEquipAnchor = [3, 4];
    controller.updateMovingEquipmentPos();
    assert.deepEqual(controller.movingEquipment.equipment.position, [14 - EXP_BOUNDS_X_OFFSET, 206 - EXP_BOUNDS_Y_OFFSET],
        "Should correctly update position as if mouse moved.");
});

QUnit.test('setInstructionCounter:', function(assert){
    controller.addEquipment(beakerControl1);
    controller.addEquipment(beakerControl2);
    let eqs = exp.equipment;
    let instructions = [];
    for(var i = 0; i < 4; i++) instructions.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));

    exp.setInstructions(instructions);
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

QUnit.test('nextInstruction:', function(assert){
    beaker1.setContents(chemControl.copyChem());
    beaker2.setContents(chemControl.copyChem());
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);
    let eqs = exp.equipment;
    let instructions = [];
    for(var i = 0; i < 2; i++) instructions.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    instructions.push(new InstructionController2D(new Instruction(eqs[0], chemControl, eqs[0].addTo)));

    exp.setInstructions(instructions);
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1");

    beaker1.setContents(chemControl.copyChem());
    beaker2.setContents(chemControl.copyChem());
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    beaker1.setContents(chemControl.copyChem());
    beaker2.setContents(chemControl.copyChem());
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3, ending the instruction list");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should not have changed from 3");

    controller.reset();
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0 after reset");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 0, "Instruction should still be on 0 without placed beakers");

    beaker1.setContents(chemControl.copyChem());
    beaker2.setContents(chemControl.copyChem());
    controller.placeEquipment(0);
    controller.placeEquipment(1);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1 after placing beakers");

    beaker1.setContents(chemControl.copyChem());
    beaker2.setContents(chemControl.copyChem());
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    controller.unPlaceEquipment(eqs[0]);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should still be on 2 without beaker 0 in the Experiment");

    controller.placeEquipment(0);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3 with beaker 0 in the Experiment");
});

QUnit.test('displayEquipmentBoxes:', function(assert){
    controller.displayEquipmentBoxes();
    assert.deepEqual(controller.displayedBoxList, controller.equipmentBoxes,
        "Displaying equipmentBoxes should place it in the displayedBoxList");
});

QUnit.test('isDisplayEquipment:', function(assert){
    controller.reset();
    assert.true(controller.isDisplayEquipment(), "By default, the Equipment list should show");

    controller.displayedBoxList = null;
    assert.false(controller.isDisplayEquipment(), "The Equipment list should not show");

    controller.displayedBoxList = controller.equipmentBoxes
    assert.true(controller.isDisplayEquipment(), "The Equipment list should show");
});

QUnit.test('displayChemicalBoxes:', function(assert){
    controller.addEquipment(beakerControl1);
    controller.equipmentBoxes.selected = controller.equipmentBoxes.boxes[0];
    assert.notDeepEqual(controller.equipmentBoxes.selected, null,
        "Before displaying chemicalBoxes, selected equipmentBoxes should not be unselected")
    controller.displayChemicalBoxes();
    assert.deepEqual(controller.displayedBoxList, controller.chemicalBoxes,
        "Displaying chemicalBoxes should place it in the displayedBoxList");
    assert.deepEqual(controller.equipmentBoxes.selected, null,
        "After displaying chemicalBoxes, selected equipmentBoxes should be unselected")
});

QUnit.test('isDisplayChemicals:', function(assert){
    controller.reset();
    assert.false(controller.isDisplayChemicals(), "By default, the Chemical list should not show");

    controller.displayedBoxList = controller.chemicalBoxes
    assert.true(controller.isDisplayChemicals(), "The Chemical list should show");

    controller.displayedBoxList = null;
    assert.false(controller.isDisplayChemicals(), "The Chemical list should not show");
});

QUnit.test('addEquipment:', function(assert){
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");

    controller.addEquipment(beaker1);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");
    assert.deepEqual(controller.equipmentBoxes.get(0), beaker1, "Equipment boxes should include the added beaker");

    controller.addEquipment(beaker1);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.equal(exp.equipment.length, 1, "Experiment should have only one beaker");
    assert.deepEqual(controller.equipmentBoxes.get(0), beaker1, "Equipment boxes should still include the added beaker");

    controller.removeEquipment(beaker1);
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "Equipment boxes should be empty after removing beaker");

    controller.addEquipment(beaker1, true);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker1), "Controller placed Equipment list should have the added beaker.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "Equipment boxes should be empty after adding and placing beaker");
});

QUnit.test('placeEquipment:', function(assert){
    controller.addEquipment(beaker1);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.placeEquipment(-1);
    assert.true(exp.equipment.includes(beaker1), "Experiment should still have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.placeEquipment(1);
    assert.true(exp.equipment.includes(beaker1), "Experiment should still have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");

    controller.placeEquipment(0);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker1), "Controller placed Equipment list should have the added beaker.");

    controller.placeEquipment(0);
    assert.true(controller.placedEquipment.includes(beaker1), "Controller placed Equipment list should have the added beaker.");
    assert.equal(controller.placedEquipment.length, 1, "Controller placed Equipment list should have only one beaker.");
});

QUnit.test('removeEquipment:', function(assert){
    controller.addEquipment(beaker1);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should still be empty.");
    assert.deepEqual(controller.equipmentBoxes.get(0), beaker1, "The Equipment boxes list should contain the beaker.");

    var success = controller.removeEquipment(beaker1);
    assert.true(success, "Beaker should successfully be removed");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");

    var success = controller.removeEquipment(beaker1);
    assert.false(success, "Beaker removal should fail");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");

    controller.addEquipment(beaker1, true);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker1), "Controller placed Equipment list should have the added beaker.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");

    success = controller.removeEquipment(beaker1);
    assert.true(success, "Beaker should successfully be removed");
    assert.deepEqual(exp.equipment, [], "Experiment Equipment list should be empty");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should be empty.");
    assert.deepEqual(controller.equipmentBoxes.boxes, [], "The Equipment boxes list should be empty.");
});

QUnit.test('unPlaceEquipment:', function(assert){
    controller.addEquipment(beaker1, true);
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.true(controller.placedEquipment.includes(beaker1), "Controller placed Equipment list should have the added beaker.");

    var success = controller.unPlaceEquipment(beaker1);
    assert.true(success, "Beaker should be successfully removed");
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should not have the added beaker.");

    success = controller.unPlaceEquipment(beaker1);
    assert.false(success, "Beaker should fail to be removed");
    assert.true(exp.equipment.includes(beaker1), "Experiment should have the added beaker.");
    assert.deepEqual(controller.placedEquipment, [], "Controller placed Equipment list should not have the added beaker.");

});

QUnit.test('reset:', function(assert){
    controller.addEquipment(beakerControl1);
    controller.addEquipment(beakerControl2);
    let eqs = exp.equipment;
    let instructions = [];
    for(var i = 0; i < 4; i++) instructions.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    exp.setInstructions(instructions);

    controller.reset();
    assert.equal(exp.equipment.length, 2, "Experiment equipment should have 2 elements");
    assert.true(exp.equipment.includes(beakerControl1), "Experiment equipment should have beaker1");
    assert.true(exp.equipment.includes(beakerControl2), "Experiment equipment should have beaker2");
    assert.deepEqual(controller.placedEquipment, [], 'equipment should be []');
    assert.equal(controller.selectedEquipment, null, 'selectedEquipment should be null');
    assert.deepEqual(exp.instructions, instructions, 'instructions should be the given instructions');
    assert.equal(controller.instructionCounter, 0, "instructionCounter should be 0.");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 0, "instructionCounter should be on 0");

    let chemControl = new ChemicalController2D(chem);
    var chemCopy = chemControl.copyChem();
    beaker1.setContents(chemCopy);
    chemCopy = chemControl.copyChem();
    assert.deepEqual(beaker1.contents, [chem], "Beaker 1 should have chem");
    assert.deepEqual(beaker2.contents, [], "Beaker 2 should be empty");

    controller.placeEquipment(0);
    controller.placeEquipment(1);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "instructionCounter should be on 1");
    assert.deepEqual(beaker1.contents, [], "Beaker 1 should have poured its contents");
    assert.deepEqual(beaker2.contents, [chemCopy], "Beaker 2 should have received beaker 1 contents");
});

QUnit.test('findEquipmentByPosition:', function(assert){
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);
    controller.addEquipment(beakerControl3, true);
    controller.addEquipment(beakerControl4, true);
    controller.addEquipment(beakerControl5, true);

    assert.deepEqual(controller.findEquipmentByPosition([5, 5]), beakerControl1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([105, 5]), beakerControl2, "Should find the second beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 105], null), beakerControl3, "Should find the third beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 5]), null, "Should find null.");

    assert.deepEqual(controller.findEquipmentByPosition([5, 5], beakerControl2), beakerControl1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([5, 5], beakerControl1), null, "Should find null.");
    assert.deepEqual(controller.findEquipmentByPosition([105, 5], [beakerControl2, beakerControl3]), null, "Should find null.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 5], [beakerControl2, beakerControl3]), null, "Should find null.");

    assert.deepEqual(controller.findEquipmentByPosition([50, 201], null), beakerControl4, "Should find the fourth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 220], null), beakerControl5, "Should find the fifth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 212], beakerControl5), beakerControl4, "Should find the fourth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 212], beakerControl4), beakerControl5, "Should find the fifth beaker.");
    assert.deepEqual(controller.findEquipmentByPosition([50, 212], [beakerControl4, beakerControl5]), null, "Should find null.");
});

QUnit.test('findEquipmentByInstanceID:', function(assert){
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);
    controller.addEquipment(beakerControl3, true);

    assert.deepEqual(controller.findEquipmentByInstanceID(10), beakerControl1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(11), beakerControl2, "Should find the second beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(12), beakerControl3, "Should find the third beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(13), null, "Should find null.");
});

QUnit.test('experimentMouseX:', function(assert){
    mouseX = 100;
    controller.camera.setBounds(null);
    controller.camera.setPos([0, 0]);
    assert.equal(controller.experimentMouseX(), 100 - EXP_BOUNDS[0], "Experiment mouse position for X should translate left by the x coordinate of the experiment.");
});

QUnit.test('experimentMouseY:', function(assert){
    mouseY = 300;
    controller.camera.setBounds(null);
    controller.camera.setPos([0, 0]);
    assert.equal(controller.experimentMouseY(), 300 - EXP_BOUNDS[1], "Experiment mouse position for X should translate left by the x coordinate of the experiment.");
});

QUnit.test('experimentMousePos:', function(assert){
    var pos = controller.experimentMousePos();
    assert.equal(pos[0], controller.experimentMouseX(), "Index 0 of pos should be the x mouse coordinate.");
    assert.equal(pos[1], controller.experimentMouseY(), "Index 1 of pos should be the y mouse coordinate.");
});

QUnit.test('experimentContainsMouse:', function(assert){
    controller.experimentContainsMouse();
    assert.expect(0);
});

QUnit.test('experimentRenderBounds:', function(assert){
    controller.camera.setBounds(null);
    controller.camera.setPos([20, 30]);
    assert.deepEqual(controller.experimentRenderBounds(), [20, 30, EXP_BOUNDS[2], EXP_BOUNDS[3]],
        "Bounds should be based on the camera position and size constants for experiment size");
});

QUnit.todo('mousePress:', function(assert){
    controller.mousePress();
    assert.true(false);
});

QUnit.todo('mouseRelease:', function(assert){
    controller.mouseRelease();
    assert.true(false);
});

QUnit.todo('mouseMove:', function(assert){
    controller.mouseMove();
    assert.true(false);
});

QUnit.todo('mouseDrag:', function(assert){
    controller.mouseDrag();
    assert.true(false);
});

QUnit.todo('keyPress:', function(assert){
    controller.keyPress();
    assert.true(false);
});

QUnit.todo('addChemicalToSelectedBeaker:', function(assert){
    assert.true(false);
});

QUnit.todo('updateCameraPos:', function(assert){
    assert.true(false);
});

QUnit.test('updateEquipmentBoxMovement:', function(assert){
    controller.addEquipment(beakerControl1);

    controller.displayChemicalBoxes();
    controller.equipmentBoxes.selected = controller.equipmentBoxes.boxes[0];
    controller.updateEquipmentBoxMovement();

    controller.displayEquipmentBoxes();
    controller.equipmentBoxes.selected = controller.equipmentBoxes.boxes[0];
    controller.updateEquipmentBoxMovement();

    assert.expect(0);
});

QUnit.test('updateEquipmentBoxPlacement:', function(assert){
    controller.displayChemicalBoxes();
    controller.updateEquipmentBoxPlacement();

    controller.camera.setBounds(null);
    controller.camera.setPos([0, 0]);
    controller.displayEquipmentBoxes();
    mouseX = -1000;
    mouseY = -1000;
    controller.updateEquipmentBoxPlacement();

    mouseX = 0;
    mouseY = 0;
    controller.camera.setPos([EXP_BOUNDS[0], EXP_BOUNDS[1]]);
    controller.updateEquipmentBoxPlacement();

    assert.expect(0);
});

QUnit.todo('update:', function(assert){
    assert.true(false);
});

QUnit.todo('render:', function(assert){
    assert.true(false);
});

QUnit.todo('drawSelectedIndicator:', function(assert){
    assert.true(false);
});


QUnit.test('DisplayBoxList constructor:', function(assert){
    assert.deepEqual(dList.boxes, [], "New list should be empty");
    assert.equal(dList.selected, null, "Selected box should be null");
});

QUnit.test('DisplayBoxList selectBox:', function(assert){
    eList.unselect();
    assert.deepEqual(eList.selected, null, "Selected should be null with no selected box");

    eList.unselect();
    eList.add(beakerControl1);
    eList.add(beakerControl2);
    var b = eList.boxes[0].bounds();
    mouseX = b[0];
    mouseY = b[1] - 1000;
    var success = eList.selectBox();
    assert.false(success, "Should be unable to select a box with the mouse on the wrong position");
    assert.deepEqual(eList.selected, null, "Selected should be null with no selected box");

    eList.unselect();
    b = eList.boxes[0].bounds();
    mouseX = b[0] + 1;
    mouseY = b[1];
    success = eList.selectBox();
    var bObj = eList.selected.obj.equipment
    assert.true(success, "Should be able to select a box with the mouse on first equipment");
    assert.deepEqual(bObj.position, [mouseX - 5, mouseY - 10], "Coordinates should be centered on the first box index");
    assert.deepEqual(bObj, beaker1, "Selected should contain the first beaker");

    eList.unselect();
    b = eList.boxes[1].bounds();
    mouseX = b[0] + 1;
    mouseY = b[1];
    success = eList.selectBox();
    bObj = eList.selected.obj.equipment
    assert.true(success, "Should be able to select a box with the mouse on second equipment");
    assert.deepEqual(bObj.position, [mouseX - 6, mouseY - 3], "Coordinates should be centered on the second box index");
    assert.deepEqual(bObj, beaker2, "Selected should contain the second beaker");
});

QUnit.test('DisplayBoxList unselect:', function(assert){
    eList.add(beakerControl1);

    eList.selected = eList.get(0);
    assert.deepEqual(eList.selected, beakerControl1, "Selected should contain the beaker");

    eList.unselect();
    assert.deepEqual(eList.selected, null, "Selected should be null");

});

QUnit.test('DisplayBoxList get:', function(assert){
    eList.add(beakerControl1);
    assert.deepEqual(eList.get(0), beakerControl1, "Obtained beaker should be the one added");
    assert.deepEqual(eList.get(-1), undefined, "Obtained beaker should be undefined");
    assert.deepEqual(eList.get(1), undefined, "Obtained beaker should be undefined");
});

QUnit.test('DisplayBoxList createBox:', function(assert){
    assert.throws(dList.createBox, "Generic DisplayBoxList should throw error on createBox");
});

QUnit.test('DisplayBoxList add:', function(assert){
    eList.add(beakerControl1);

    assert.deepEqual(eList.get(0), beakerControl1, "Obtained beaker should be the one added");
});

QUnit.test('DisplayBoxList remove:', function(assert){
    eList.add(beakerControl1);
    eList.add(beakerControl2);
    eList.add(beakerControl3);

    assert.equal(eList.boxes.length, 3, "Should start with 3 pieces of Equipment");

    var success = eList.remove(beakerControl2);
    assert.true(success, "Should find and remove beaker 2");
    assert.equal(eList.boxes.length, 2, "Should now have 2 pieces of Equipment");

    var success = eList.remove(beakerControl2);
    assert.false(success, "Should failed to find and remove beaker 2, which is no longer in the list");
    assert.equal(eList.boxes.length, 2, "Should still have 2 pieces of Equipment");
});

QUnit.todo('DisplayBoxList draw:', function(assert){
    assert.false(true);
});


QUnit.test('EquipmentBoxList constructor:', function(assert){
    assert.deepEqual(eList.boxes, [], "New list should be empty");
    assert.equal(eList.selected, null, "Selected box should be null");
});

QUnit.test('EquipmentBoxList createBox:', function(assert){
    var newBox = eList.createBox(beakerControl1, 1);
    assert.deepEqual(newBox.obj, beakerControl1, "New Equipment box should have the given object");
    assert.equal(newBox.index, 1, "New Equipment box should have the given index");
});

QUnit.test('EquipmentBoxList place:', function(assert){
    eList = controller.equipmentBoxes;
    controller.addEquipment(beakerControl1);
    controller.addEquipment(beakerControl2);

    eList.unselect();
    var success = eList.place(controller);
    assert.false(success, "Should fail to place anything with no selection");
    assert.deepEqual(eList.selected, null, "Selected should be null");

    var b = eList.boxes[0].bounds();
    mouseX = b[0] + 1;
    mouseY = b[1];
    eList.selectBox();
    var place = controller.placedEquipment;
    assert.deepEqual(eList.selected.obj, beakerControl1, "Selected should be the first Beaker");
    assert.equal(place.length, 0, "There should be only no elements in the Experiment before placed list after placing one");

    success = eList.place(controller);
    place = controller.placedEquipment;
    assert.true(success, "Should place Equipment with selection made");
    assert.deepEqual(eList.selected, null, "Selected should be null");
    assert.equal(eList.boxes.length, 1, "There should be only one element in the list after placing one");
    assert.deepEqual(eList.get(0), beakerControl2, "The only remaining Equipment should be Beaker 2");
    assert.equal(place.length, 1, "There should be only one element in the Experiment placed list after placing one");
    assert.deepEqual(place[0], beakerControl1, "The only Equipment in the place list should be Beaker 2");
});

QUnit.test('EquipmentBoxList updateSelectPos:', function(assert){
    eList.add(beakerControl1);

    eList.unselect();
    var success = eList.updateSelectPos();
    assert.false(success, "Updating the selected position should fail with no selection");

    eList.selected = eList.boxes[0];
    mouseX = 100;
    mouseY = 200;
    success = eList.updateSelectPos();
    let pos = eList.selected.obj.equipment.position;
    assert.true(success, "Updating the selected position should succeed with a selection");
    assert.deepEqual(pos, [95, 190], "Should correctly center the Equipment to the mouse");
});

QUnit.todo('EquipmentBoxList drawSelected:', function(assert){
    assert.false(true);
});


QUnit.test('ChemicalBoxList constructor:', function(assert){
    assert.deepEqual(cList.boxes, [], "New list should be empty");
    assert.equal(cList.selected, null, "Selected box should be null");
});

QUnit.test('ChemicalBoxList createBox:', function(assert){
    var newBox = cList.createBox(chem, 1);
    assert.deepEqual(newBox.obj, chem, "New Equipment box should have the given object");
    assert.equal(newBox.index, 1, "New Equipment box should have the given index");
});


QUnit.test('DisplayBox constructor:', function(assert){
    assert.deepEqual(dBox1.obj, beaker1, "Object should be the given beaker");
    assert.equal(dBox1.index, 3, "Index should be 3");
});

QUnit.test('DisplayBox setObj:', function(assert){
    eBox1.setObj(null);
    assert.deepEqual(dBox2.obj, null, "Object should be null");

    eBox2.setObj(beakerControl1);
    assert.deepEqual(eBox2.obj, beakerControl1, "Object should be the set beaker");
});

QUnit.test('DisplayBox setIndex:', function(assert){
    assert.equal(dBox1.index, 3, "Index should be 3");

    dBox1.setIndex(6);
    assert.equal(dBox1.index, 6, "Index should be set to 6");
});

QUnit.todo('DisplayBox draw:', function(assert){
    assert.false(true);
});

QUnit.test('DisplayBox getImage:', function(assert){
    assert.throws(dBox1.getImage, "Generic DisplayBox should throw error on getImage");
});

QUnit.test('DisplayBox bounds:', function(assert){
    var b = dBox1.bounds();
    assert.equal(b[0], EXP_BOX_OFF_X + EXP_BOX_SIZE * 3, "X bounds coordinate should be that of the second index");
    assert.equal(b[1], EXP_BOX_OFF_Y + CANVAS_HEIGHT - EXP_BOX_SIZE, "Y bounds coordinate should be the same for all indexes");
    assert.equal(b[2], EXP_BOX_SIZE, "Width should be the size constant");
    assert.equal(b[3], EXP_BOX_SIZE, "Height should be the size constant");

    dBox2.setIndex(1);
    b = dBox2.bounds();
    assert.equal(b[0], EXP_BOX_OFF_X + EXP_BOX_SIZE * 1, "X bounds coordinate should be that of the second index");
    assert.equal(b[1], EXP_BOX_OFF_Y + CANVAS_HEIGHT - EXP_BOX_SIZE, "Y bounds coordinate should be the same for all indexes");
    assert.equal(b[2], EXP_BOX_SIZE, "Width should be the size constant");
    assert.equal(b[3], EXP_BOX_SIZE, "Height should be the size constant");
});


QUnit.test('EquipmentBox constructor:', function(assert){
    assert.deepEqual(eBox1.obj, beakerControl1, "Object should be the given beaker");
    assert.equal(eBox1.index, 1, "Index should be 1");
});

QUnit.todo('EquipmentBox getImage:', function(assert){
    assert.false(true);
});


QUnit.test('ChemicalBox constructor:', function(assert){
    assert.deepEqual(cBox.obj, chem, "Object should be the given beaker");
    assert.equal(cBox.index, 5, "Index should be 5");
});

QUnit.todo('ChemicalBox getImage:', function(assert){
    assert.false(true);
});


QUnit.test('ExperimentCamera constructor:', function(assert){
    assert.deepEqual(camera1.pos, [0, 0], "Position should default to [0, 0]");
    assert.deepEqual(camera1.basePos, null, "Base position should be null");
    assert.deepEqual(camera1.speed, [6, 6], "Speed should be [6, 6]");
    assert.deepEqual(camera1.bounds, null, "Bounds should be null");

    assert.deepEqual(camera2.pos, [10, 20], "Position should snap to [0, 0]");
    assert.deepEqual(camera2.basePos, null, "Base position should be null");
    assert.deepEqual(camera2.speed, [6, 6], "Speed should be [6, 6]");
    assert.deepEqual(camera2.bounds, [10, 20, 1000, 2000], "Bounds should be [10, 20, 1000, 2000]");

    assert.deepEqual(camera3.pos, [30, 50], "Position should default to [30, 50]");
    assert.deepEqual(camera3.basePos, [30, 50], "Base position should be [30, 50]");
    assert.deepEqual(camera3.speed, [6, 6], "Speed should be [6, 6]");
    assert.deepEqual(camera3.bounds, [0, 0, 100, 100], "Bounds should be [10, 20, 1000, 2000]");
});

QUnit.test('ExperimentCamera reset:', function(assert){
    camera1.reset();
    assert.deepEqual(camera1.pos, [0, 0], "Position should default to [0, 0]");
    assert.deepEqual(camera1.basePos, null, "Base position should be null");
    assert.deepEqual(camera1.bounds, null, "Bounds should be null");

    camera2.reset();
    assert.deepEqual(camera2.pos, [10, 20], "Position should snap to [0, 0]");
    assert.deepEqual(camera2.basePos, null, "Base position should be null");
    assert.deepEqual(camera2.bounds, [10, 20, 1000, 2000], "Bounds should be [10, 20, 1000, 2000]");

    camera3.reset();
    assert.deepEqual(camera3.pos, [30, 50], "Position should default to [30, 50]");
    assert.deepEqual(camera3.basePos, [30, 50], "Base position should be [30, 50]");
    assert.deepEqual(camera3.bounds, [0, 0, 100, 100], "Bounds should be [10, 20, 1000, 2000]");

});

QUnit.test('ExperimentCamera setPos:', function(assert){
    camera3.setPos([20, 60]);
    assert.deepEqual(camera3.pos, [20, 60], "New position should be [20, 60]");

    camera3.setPos([-20, 60]);
    assert.deepEqual(camera3.pos, [0, 60], "New position should snap to [0, 60]");

    camera3.setPos([40, 120]);
    assert.deepEqual(camera3.pos, [40, 100], "New position should snap to [40, 100]");
});

QUnit.test('ExperimentCamera setBasePos:', function(assert){
    camera1.setBasePos([56, 49]);
    assert.deepEqual(camera1.basePos, [56, 49], "New base pos should be set to [56, 49]");
});

QUnit.test('ExperimentCamera setSpeed:', function(assert){
    camera1.setSpeed([2, 4]);
    assert.deepEqual(camera1.speed, [2, 4], "New speed should be set to [2, 4]");
});

QUnit.test('ExperimentCamera setBounds:', function(assert){
    camera1.setBounds([2, 4, 100, 150]);
    assert.deepEqual(camera1.bounds, [2, 4, 100, 150], "New bounds should be set to [2, 4, 100, 150]");
});

QUnit.test('ExperimentCamera moveX:', function(assert){
    camera1.setPos([100, 60]);
    assert.equal(camera1.moveX(30), 130, "New position should be increased by 100");
});

QUnit.test('ExperimentCamera moveY:', function(assert){
    camera1.setPos([100, 60]);
    assert.equal(camera1.moveY(-20), 40, "New position should be decreased by 20");
});

QUnit.test('ExperimentCamera boundX:', function(assert){
    camera2.pos[0] = 40;
    camera2.boundX();
    assert.equal(camera2.pos[0], 40, "Position should not change");

    camera2.pos[0] = 10;
    camera2.boundX();
    assert.equal(camera2.pos[0], 10, "Position should not change");

    camera2.pos[0] = 0;
    camera2.boundX();
    assert.equal(camera2.pos[0], 10, "Position should snap to 10");

    camera2.pos[0] = 1010;
    camera2.boundX();
    assert.equal(camera2.pos[0], 1010, "Position should not change");

    camera2.pos[0] = 1011;
    camera2.boundX();
    assert.equal(camera2.pos[0], 1010, "Position should snap to 1010");
});

QUnit.test('ExperimentCamera boundY:', function(assert){
    camera2.pos[1] = 40;
    camera2.boundY();
    assert.equal(camera2.pos[1], 40, "Position should not change");

    camera2.pos[1] = 20;
    camera2.boundY();
    assert.equal(camera2.pos[1], 20, "Position should not change");

    camera2.pos[1] = 0;
    camera2.boundY();
    assert.equal(camera2.pos[1], 20, "Position should snap to 20");

    camera2.pos[1] = 2020;
    camera2.boundY();
    assert.equal(camera2.pos[1], 2020, "Position should not change");

    camera2.pos[1] = 2021;
    camera2.boundY();
    assert.equal(camera2.pos[1], 2020, "Position should snap to 2020");
});

QUnit.test('ExperimentCamera bound:', function(assert){
    camera2.pos[0] = 1011;
    camera2.pos[1] = 0;
    camera2.bound();
    assert.deepEqual(camera2.pos, [1010, 20], "Should keep position in bounds");
});

QUnit.test('ExperimentCamera left:', function(assert){
    camera1.setPos([10, 0]);
    camera1.setSpeed([4, 4]);

    camera1.left();
    assert.equal(camera1.pos[0], 14, "Should have moved to the left by the internal speed");

    camera1.left(5);
    assert.equal(camera1.pos[0], 19, "Should have moved to the left by the given speed");
});

QUnit.test('ExperimentCamera right:', function(assert){
    camera1.setPos([10, 0]);
    camera1.setSpeed([4, 4]);

    camera1.right();
    assert.equal(camera1.pos[0], 6, "Should have moved to the right by the internal speed");

    camera1.right(5);
    assert.equal(camera1.pos[0], 1, "Should have moved to the right by the given speed");
});

QUnit.test('ExperimentCamera up:', function(assert){
    camera1.setPos([0, 10]);
    camera1.setSpeed([3, 3]);

    camera1.up();
    assert.equal(camera1.pos[1], 13, "Should have moved up by the internal speed");

    camera1.up(4);
    assert.equal(camera1.pos[1], 17, "Should have moved up by the given speed");
});

QUnit.test('ExperimentCamera down:', function(assert){
    camera1.setPos([0, 10]);
    camera1.setSpeed([3, 3]);

    camera1.down();
    assert.equal(camera1.pos[1], 7, "Should have moved down by the internal speed");

    camera1.down(4);
    assert.equal(camera1.pos[1], 3, "Should have moved down by the given speed");
});

QUnit.todo('ExperimentCamera translateGraphics:', function(assert){
    assert.true(false);
});