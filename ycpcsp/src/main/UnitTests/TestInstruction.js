QUnit.test('Instruction constructor:', function(assert){
    var beaker1 = new Beaker([0, 0], [0, 0], 1, 100, 0, 1);
    var beaker2 = new Beaker([0, 0], [0, 0], 1, 100, 0, 2);
    var ins = new Instruction(beaker1, beaker2, beaker1.pourInto);

    assert.equal(ins.actor, beaker1, "Given actor should be beaker1");
    assert.equal(ins.receiver, beaker2, "Given receiver should be beaker2");
    assert.equal(ins.action, beaker1.pourInto, "Given action should be beaker1.pourInto");
});

QUnit.test('Instruction setActor:', function(assert){
    var beaker1 = new Beaker([0, 0], [0, 0], 1, 100, 0, 1);
    var beaker2 = new Beaker([0, 0], [0, 0], 1, 100, 0, 2);
    var ins = new Instruction(null, beaker2, beaker1.pourInto);

    assert.equal(ins.actor, null, "Actor should be null");

    ins.setActor(beaker1);
    assert.equal(ins.actor, beaker1, "Actor should be beaker1");
});

QUnit.test('Instruction setActor:', function(assert){
    var beaker1 = new Beaker([0, 0], [0, 0], 1, 100, 0, 1);
    var beaker2 = new Beaker([0, 0], [0, 0], 1, 100, 0, 2);
    var ins = new Instruction(beaker1, null, beaker1.pourInto);

    assert.equal(ins.receiver, null, "Receiver should be null");

    ins.setReceiver(beaker2);
    assert.equal(ins.receiver, beaker2, "Receiver should be beaker2");
});

QUnit.test('Instruction setAction:', function(assert){
    var beaker1 = new Beaker([0, 0], [0, 0], 1, 100, 0, 1);
    var beaker2 = new Beaker([0, 0], [0, 0], 1, 100, 0, 2);
    var ins = new Instruction(beaker1, beaker2, null);

    assert.equal(ins.action, null, "Action should be null");

    ins.setActor(beaker1.pourInto);
    assert.equal(ins.action, beaker1.pourInto, "Action should be beaker2");
});
