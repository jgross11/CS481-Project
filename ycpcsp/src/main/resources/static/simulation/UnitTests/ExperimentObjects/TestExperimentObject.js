QUnit.test('ExperimentObject constructor:', function(assert){
    var obj = new ExperimentObject(5.0);

    assert.equal(obj.mass, 5.0, "mass should be 5.0");
});

QUnit.test('ExperimentObject setMass:', function(assert){
    var obj = new ExperimentObject(5);
    obj.setMass(10.0);
    assert.equal(obj.mass, 10.0, "mass should be 10.0");

    obj.setMass(-1.0);
    assert.equal(obj.mass, 10.0, "mass should still be 10.0");

    obj.setMass("a");
    assert.equal(obj.mass, 10.0, "mass should still be 10.0");

    obj.setMass(0.0);
    assert.equal(obj.mass, 0.0, "mass should be 0.0");
});

QUnit.test('ExperimentObject getID:', function(assert){
    var obj = new ExperimentObject(5);

    assert.throws(obj.getID, "Generic ExperimentObject objects should throw error on getID");
});