var beaker1;
var beaker2;
var beakerControl1;
var beakerControl2;
var ins;
var controller;
var chemControl1;
var chemControl2;
var chem1;
var chem2;

var count = 0;

QUnit.module("InstructionController2D", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        beaker1 = new Beaker(ID_EQUIP_BEAKER_150mL);
        beakerControl1 = new BeakerController2D(beaker1);
        beaker1.setResidue(0);
        beaker1.setCapacity(10000);
        beaker2 = new Beaker(ID_EQUIP_BEAKER_150mL);
        beakerControl2 = new BeakerController2D(beaker2);
        beaker2.setResidue(0);
        beaker2.setCapacity(10000);
        ins = new Instruction(beakerControl1, beakerControl2, beakerControl1.pourInto);
        controller = new InstructionController2D(ins);
        chemControl1 = idToChemical(ID_CHEM_TEST_BLUE, 6.0, 1);
        chemControl2 = idToChemical(ID_CHEM_TEST_BLACK, 4.0, 1);
        chem1 = chemControl1.chemical;
        chem2 = chemControl2.chemical;
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
    beakerControl1.emptyOut();
    beakerControl2.emptyOut();
    chem1.setMass(6.0);
    chem2.setMass(4.0);
    beaker1.setContents(chemControl1.copyChem());
    beaker2.setContents(chemControl2.copyChem());

    controller.activate();
    assert.true(beaker1.isEmpty(), "Instruction should empty out beaker1");
    assert.equal(beaker2.getTotalContentsMass(), 10, "Instruction should have left 10 grams in beaker2");

    ins.setReceiver(null);
    beakerControl1.emptyOut();
    beakerControl2.emptyOut();
    chem1.setMass(6.0);
    chem2.setMass(4.0);
    beaker1.setContents(chemControl1.copyChem());
    beaker2.setContents(chemControl2.copyChem());
    controller.activate();
    assert.equal(beaker1.getTotalContentsMass(), 6, "Instruction should do nothing to beaker 1 using null receiver");
    assert.equal(beaker2.getTotalContentsMass(), 4, "Instruction should do nothing to beaker 2 using null receiver");
});
