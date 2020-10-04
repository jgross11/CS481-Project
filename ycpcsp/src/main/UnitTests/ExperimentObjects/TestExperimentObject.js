QUnit.test('ExperimentObject constructor:', function(assert){
    var obj = new ExperimentObject(5.0, "exp obj");
    assert.equal(obj.mass, 5.0, "mass should be 5.0");
    assert.equal(obj.name, "exp obj", 'name should be "exp obj"');
});

QUnit.test('ExperimentObject setMass:', function(assert){
    var obj = new ExperimentObject(5, "exp obj");
    obj.setMass(10.0);
    assert.equal(obj.mass, 10.0, "mass should be 10.0");
});

QUnit.test('ExperimentObject setName:', function(assert){
    var obj = new ExperimentObject(5, "exp obj");
    obj.setName("object");
    assert.equal(obj.name, "object", 'name should be "object"');
});