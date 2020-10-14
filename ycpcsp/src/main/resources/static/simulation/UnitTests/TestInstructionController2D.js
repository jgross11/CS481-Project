var beaker1;
var beaker2;
var ins;
var controller;
var chem1;
var chem2;

QUnit.module("InstructionController2D", {
    beforeEach: function(){
        beaker1 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0));
        beaker2 = new BeakerController2D(new Beaker([0, 0], [0, 0], 1, 100, 0));
        ins = new Instruction(beaker1, beaker2, beaker1.pourInto);
        controller = new InstructionController2D(ins);
        chem1 = new Chemical(6.0, "equ", 20.0, [10, 20, 40]);
        chem2 = new Chemical(4.0, "equ", 20.0, [10, 10, 10]);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(controller.instruction, ins, "The Controller should have the given Instruction.");
});

QUnit.test('setInstruction:', function(assert){
    controller.setInstruction(null);
    assert.deepEqual(controller.instruction, null, "The Controller's Instruction should be null.");

    controller.setInstruction(ins);
    assert.deepEqual(controller.instruction, ins, "The Controller should have the given Instruction.");
});

QUnit.test('activate:', function(assert){
    beaker1.equipment.setContents(chem1);
    beaker2.equipment.setContents(chem2);

    controller.activate();
    assert.equal(beaker1.equipment.contents, null, "Instruction should empty out beaker1");
    assert.equal(beaker2.equipment.contents.mass, 10, "Instruction should have left 10 mass in beaker2");

    ins.setReceiver(null);
    chem1 = new Chemical(6.0, "equ", 20.0, [10, 20, 40]);
    chem2 = new Chemical(4.0, "equ", 20.0, [10, 10, 10]);
    beaker1.equipment.setContents(chem1);
    beaker2.equipment.setContents(chem2);
    controller.activate();
    assert.equal(beaker1.equipment.contents.mass, 6, "Instruction should do nothing to beaker 1 using null receiver");
    assert.equal(beaker2.equipment.contents.mass, 4, "Instruction should do nothing to beaker 2 using null receiver");
});
