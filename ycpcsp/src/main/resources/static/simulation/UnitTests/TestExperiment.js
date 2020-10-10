QUnit.test('Experiment constructor:', function(assert){
    var exp = new Experiment("The Title", "The Name");

    assert.deepEqual(exp.equipment, [], 'equipment should be empty');
    assert.deepEqual(exp.chemicals, [], 'chemicals should be empty');
    assert.deepEqual(exp.instructions, [], "instructions should be empty.");
    assert.equal(exp.title, "The Title", 'title should be "The Title"');
    assert.equal(exp.creator, "The Name", 'creator should be "The Name"');
});

QUnit.test('Experiment setEquipment:', function(assert){
    var exp = new Experiment("The Title", "The Name");
    var equip = new Equipment([0, 0], [100, 100], 1, 1, null);

    exp.setEquipment([equip]);
    assert.deepEqual(exp.equipment, [equip],
        "Given Equipment list should be equal to Equipment list in the experiment");
});

QUnit.test('Experiment setChemicals:', function(assert){
    var exp = new Experiment("The Title", "The Name");
    var chems = [
        new ChemicalController2D(new Chemical(5, "", 20.0, [0, 0, 0])),
        new ChemicalController2D(new Chemical(25, "", 10.0, [1, 40, 20])),
        new ChemicalController2D(new Chemical(30, "", 5.0, [1, 33, 7])),
    ]

    exp.setChemicals(chems);
    assert.deepEqual(exp.chemicals, chems,
        "Given Chemical list should be equal to Chemical list in the experiment");
});

QUnit.test('ExperimentController2D setInstructions:', function(assert){
    var exp = new Experiment("a title", "a name");
    exp.equipment.push(new BeakerController2D(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, 1)));
    exp.equipment.push(new BeakerController2D(new Beaker([250, 200], [150, 150], 20.0, 50.0, 0.01, 2)));
    let eqs = exp.equipment;
    let instructions = [new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto))];

    exp.setInstructions(instructions);
    assert.deepEqual(exp.instructions, instructions,
        "Instructions in Experiment should equal the set Instructions.");
});

QUnit.test('Experiment setName:', function(assert){
    var exp = new Experiment("The Title", "The Name");

    assert.equal(exp.title, "The Title", 'Initial title should be "The Title"');

    exp.setTitle("New");
    assert.equal(exp.title, "New", 'New title should be "New"');
});

QUnit.test('Experiment setCreator:', function(assert){
    var exp = new Experiment("The Title", "The Name");

    assert.equal(exp.creator, "The Name", 'Initial creator should be "The Name"');

    exp.setCreator("Create");
    assert.equal(exp.creator, "Create", 'New creator should be "Create"');
});