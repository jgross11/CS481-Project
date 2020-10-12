var beaker1;
var beaker2;
var ins;

QUnit.module("Instruction", {
    beforeEach: function(){
        beaker1 = new Beaker([0, 0], [0, 0], 1, 100, 0);
        beaker2 = new Beaker([0, 0], [0, 0], 1, 100, 0);
        ins = new Instruction(beaker1, beaker2, beaker1.pourInto);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(ins.actor, beaker1, "Given actor should be beaker1");
    assert.equal(ins.receiver, beaker2, "Given receiver should be beaker2");
    assert.equal(ins.action, beaker1.pourInto, "Given action should be beaker1.pourInto");
});

QUnit.test('setActor:', function(assert){
    ins.setActor(null);
    assert.equal(ins.actor, null, "Actor should be null");

    ins.setActor(beaker1);
    assert.equal(ins.actor, beaker1, "Actor should be beaker1");
});

QUnit.test('setActor:', function(assert){
    ins.setReceiver(null);
    assert.equal(ins.receiver, null, "Receiver should be null");

    ins.setReceiver(beaker2);
    assert.equal(ins.receiver, beaker2, "Receiver should be beaker2");
});

QUnit.test('setAction:', function(assert){
    ins.setAction(null);
    assert.equal(ins.action, null, "Action should be null");

    ins.setAction(beaker1.pourInto);
    assert.equal(ins.action, beaker1.pourInto, "Action should be beaker1 pourInto");
});
