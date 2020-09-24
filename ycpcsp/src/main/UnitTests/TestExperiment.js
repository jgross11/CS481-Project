QUnit.test('Experiment constructor:', function(assert){
    var exp = new Experiment();

    assert.deepEqual(exp.equipment, [], 'equipment should be []');
    assert.equal(exp.selectedEquipment, null, 'selectedEquipment should be null');
});

QUnit.test('Experiment setEquipment:', function(assert){
    var exp = new Experiment();
    var equip = new Equipment([0, 0], [100, 100], 1, "test", null);
    exp.setEquipment([equip]);
    assert.deepEqual(exp.equipment, [equip],
        "Given Equipment list should be equal to Equipment list in the experiment");
});