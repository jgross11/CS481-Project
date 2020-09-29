QUnit.test('InstructionController2D constructor:', function(assert){
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0, 3));
    var beaker2 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0, 4));
    var ins = new Instruction(beaker1, beaker2, beaker1.pourInto);
    var controller = new InstructionController2D(ins);

    assert.deepEqual(controller.instruction, ins, "The Controller should have the given Instruction.");
});

QUnit.test('InstructionController2D setInstruction:', function(assert){
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0, 3));
    var beaker2 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0, 4));
    var ins = new Instruction(beaker1, beaker2, beaker1.pourInto);
    var controller = new InstructionController2D(null);

    assert.deepEqual(controller.instruction, null, "The Controller's Instruction should be null.");

    controller.setInstruction(ins);
    assert.deepEqual(controller.instruction, ins, "The Controller should have the given Instruction.");
});

QUnit.test('InstructionController2D activate:', function(assert){
    var beaker1 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0, 3));
    var beaker2 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0, 4));
    var ins = new Instruction(beaker1, beaker2, beaker1.pourInto);
    var controller = new InstructionController2D(ins);
    var chem1 = new Chemical(6.0, "equ", 20.0, [10, 20, 40]);
    var chem2 = new Chemical(4.0, "equ", 20.0, [10, 10, 10]);
    beaker1.equipment.setContents(chem1);
    beaker2.equipment.setContents(chem2);

    controller.activate();
    assert.equal(beaker1.equipment.contents, null, "Instruction should empty out beaker1");
    assert.equal(beaker2.equipment.contents.mass, 10, "Instruction should have left 10 mass in beaker2");
});
