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

var dList;
var eList;
var cList;

var eBox1;
var eBox2;
var dBox1;
var dBox2;
var cBox;

function createGraphics(){}

QUnit.module("ExperimentController2D", {
    beforeEach: function(){
        currentInstanceID = 1;
        mouseX = 0;
        mouseY = 0;
        exp = new Experiment("a title", "a name");
        controller = new ExperimentController2D(exp);

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
        chem = new Chemical(1, "", 20.0, [2, 4, 7]);

        dList = new DisplayBoxList();
        eList = new EquipmentBoxList();
        cList = new ChemicalBoxList();

        eBox1 = new EquipmentBox(beakerControl1, 1);
        eBox2 = new EquipmentBox(null, 2);

        dBox1 = new DisplayBox(beaker1, 3);
        dBox2 = new DisplayBox(null, 4);

        cBox = new ChemicalBox(chem, 5);
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

QUnit.test('setSelectedEquipment:', function(assert){
    controller.setSelectedEquipment(null);
    assert.equal(controller.selectedEquipment, null,
        "Selected Equipment in Controller should be null.");

    controller.setSelectedEquipment(beakerControl1);
    assert.equal(controller.selectedEquipment, beakerControl1,
        "Selected Equipment in Controller should be the set Equipment.");
});

QUnit.test('setMovingEquipment:', function(assert){
    controller.movingEquipAnchor = null;
    controller.setMovingEquipment(null);
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
    beaker1.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    beaker2.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);
    let eqs = exp.equipment;
    let instructions = [];
    for(var i = 0; i < 2; i++) instructions.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    var chemControl = new ChemicalController2D(new Chemical(1, "", 20.0, [0, 0, 0]));
    instructions.push(new InstructionController2D(new Instruction(eqs[0], chemControl, eqs[0].addTo)));

    exp.setInstructions(instructions);
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1");

    beaker1.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    beaker2.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    beaker1.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    beaker2.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3, ending the instruction list");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should not have changed from 3");

    controller.reset();
    assert.equal(controller.instructionCounter, 0, "Instruction should be on 0 after reset");

    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 0, "Instruction should still be on 0 without placed beakers");

    beaker1.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    beaker2.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    controller.placeEquipment(0);
    controller.placeEquipment(1);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "Instruction should be on 1 after placing beakers");

    beaker1.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    beaker2.setContents(new Chemical(5, "", 20.0, [0, 0, 0]));
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should be on 2");

    controller.unPlaceEquipment(eqs[0]);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 2, "Instruction should still be on 2 without beaker 0 in the Experiment");

    controller.placeEquipment(0);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 3, "Instruction should be on 3 with beaker 0 in the Experiment");
});

QUnit.test('isDisplayEquipment:', function(assert){
    controller.reset();
    assert.true(controller.isDisplayEquipment(), "By default, the Equipment list should show");

    controller.displayedBoxList = null;
    assert.false(controller.isDisplayEquipment(), "The Equipment list should not show");

    controller.displayedBoxList = controller.equipmentBoxes
    assert.true(controller.isDisplayEquipment(), "The Equipment list should show");
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

    beaker1.setContents(new Chemical(1, "", 20.0, [2, 4, 7]));
    assert.deepEqual(beaker1.contents, chem, "Beaker 1 should have chem");
    assert.deepEqual(beaker2.contents, null, "Beaker 2 should be empty");

    controller.placeEquipment(0);
    controller.placeEquipment(1);
    controller.nextInstruction();
    assert.equal(controller.instructionCounter, 1, "instructionCounter should be on 1");
    assert.deepEqual(beaker1.contents, null, "Beaker 1 should have poured its contents");
    assert.deepEqual(beaker2.contents, chem, "Beaker 2 should have received beaker 1 contents");
});

QUnit.test('findEquipmentByPosition:', function(assert){
    var exp = new Experiment("a title", "a name");
    var controller = new ExperimentController2D(exp);
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

    assert.deepEqual(controller.findEquipmentByInstanceID(1), beakerControl1, "Should find the first beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(2), beakerControl2, "Should find the second beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(3), beakerControl3, "Should find the third beaker.");
    assert.deepEqual(controller.findEquipmentByInstanceID(4), null, "Should find null.");
});

QUnit.test('experimentMouseX:', function(assert){
    mouseX = 100;
    assert.equal(controller.experimentMouseX(), 100 - EXP_BOUNDS[0], "Experiment mouse position for X should translate left by the x coordinate of the experiment.");
});

QUnit.test('experimentMouseY:', function(assert){
    mouseY = 300;
    assert.equal(controller.experimentMouseY(), 300 - EXP_BOUNDS[1], "Experiment mouse position for X should translate left by the x coordinate of the experiment.");
});

QUnit.test('experimentMousePos:', function(assert){
    var pos = controller.experimentMousePos();
    assert.equal(pos[0], controller.experimentMouseX(), "Index 0 of pos should be the x mouse coordinate.");
    assert.equal(pos[1], controller.experimentMouseY(), "Index 1 of pos should be the y mouse coordinate.");
});

QUnit.test('selectedEquipFunction:', function(assert){
    var result;
    controller.addEquipment(beakerControl1, true);
    controller.addEquipment(beakerControl2, true);
    beaker1.setContents(chem);
    var goodX = 105 + EXP_BOUNDS[0];
    var goodY = 5 + EXP_BOUNDS[1];
    var badX = -1000;
    var badY = -1000;

    controller.setSelectedEquipment(beakerControl1);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(null);
    assert.false(result, "Calling the function without a valid function should fail.");

    controller.setSelectedEquipment(null);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
    assert.false(result, "Calling the function without selected equipment should fail.");

    controller.setSelectedEquipment(beakerControl1);
    mouseX = badX;
    mouseY = badY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
    assert.false(result, "Calling the function without a valid equipment in selection range should fail.");

    controller.setSelectedEquipment(beakerControl1);
    mouseX = goodX;
    mouseY = goodY;
    result = controller.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
    assert.true(result, "Calling the function with valid setup should succeed.");
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

QUnit.todo('render:', function(assert){
    controller.render();
    assert.true(false);
});

QUnit.todo('drawEquipSquare:', function(assert){
    controller.drawEquipSquare();
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