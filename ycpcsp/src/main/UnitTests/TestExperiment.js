QUnit.test('Experiment constructor:', function(assert){
    var exp = new Experiment("The Title", "The Name");

    assert.deepEqual(exp.equipment, [], 'equipment should be []');
    assert.equal(exp.title, "The Title", 'title should be "The Title"');
    assert.equal(exp.creator, "The Name", 'creator should be "The Name"');
});

QUnit.test('Experiment setEquipment:', function(assert){
    var exp = new Experiment();
    var equip = new Equipment([0, 0], [100, 100], 1, 1, null);

    exp.setEquipment([equip]);
    assert.deepEqual(exp.equipment, [equip],
        "Given Equipment list should be equal to Equipment list in the experiment");
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