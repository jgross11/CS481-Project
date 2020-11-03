var exp;
var beaker1;
var beaker2;

QUnit.module("Experiment", {
    beforeEach: function(){
        exp = new Experiment("The Title", "The Name");
        equip = new Equipment([0, 0], [100, 100], 1, null);
        beaker1 = new BeakerController2D(new Beaker(ID_EQUIP_BEAKER_50mL));
        beaker2 = new BeakerController2D(new Beaker(ID_EQUIP_BEAKER_250mL));
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(exp.equipment, [], 'equipment should be empty');
    assert.deepEqual(exp.chemicals, [], 'chemicals should be empty');
    assert.deepEqual(exp.instructions, [], "instructions should be empty.");
    assert.equal(exp.title, "The Title", 'title should be "The Title"');
    assert.equal(exp.creator, "The Name", 'creator should be "The Name"');
});

QUnit.test('setEquipment:', function(assert){
    exp.setEquipment([beaker1, beaker2]);
    assert.deepEqual(exp.equipment, [beaker1, beaker2],
        "Given Equipment list should be equal to Equipment list in the experiment");
});

QUnit.test('setChemicals:', function(assert){
    var chems = [
        new ChemicalController2D(new Chemical(5, "", 20.0, [0, 0, 0])),
        new ChemicalController2D(new Chemical(25, "", 10.0, [1, 40, 20])),
        new ChemicalController2D(new Chemical(30, "", 5.0, [1, 33, 7])),
    ]

    exp.setChemicals(chems);
    assert.deepEqual(exp.chemicals, chems,
        "Given Chemical list should be equal to Chemical list in the experiment");
});

QUnit.test('setInstructions:', function(assert){
    exp.equipment.push(beaker1);
    exp.equipment.push(beaker2);
    let eqs = exp.equipment;
    let instructions = [new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto))];

    exp.setInstructions(instructions);
    assert.deepEqual(exp.instructions, instructions,
        "Instructions in Experiment should equal the set Instructions.");
});

QUnit.test('setName:', function(assert){
    assert.equal(exp.title, "The Title", 'Initial title should be "The Title"');

    exp.setTitle("New");
    assert.equal(exp.title, "New", 'New title should be "New"');
});

QUnit.test('setCreator:', function(assert){
    assert.equal(exp.creator, "The Name", 'Initial creator should be "The Name"');

    exp.setCreator("Create");
    assert.equal(exp.creator, "Create", 'New creator should be "Create"');
});