var obj;

QUnit.module("ExperimentObject", {
    beforeEach: function(){
        obj = new ExperimentObject(5.0);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(obj.mass, 5.0, "mass should be 5.0");
});

QUnit.test('setMass:', function(assert){
    obj.setMass(10.0);
    assert.equal(obj.mass, 10.0, "mass should be 10.0");

    obj.setMass(-1.0);
    assert.equal(obj.mass, 10.0, "mass should still be 10.0");

    obj.setMass("a");
    assert.equal(obj.mass, 10.0, "mass should still be 10.0");

    obj.setMass(0.0);
    assert.equal(obj.mass, 0.0, "mass should be 0.0");
});

QUnit.test('getMass:', function(assert){
    assert.equal(obj.getMass(), 5.0, "Checking mass from getter is correct");
});

QUnit.test('addMass:', function(assert){
    obj.addMass(2);
    assert.equal(obj.getMass(), 7.0, "Checking after adding mass, mass is correct");
});

QUnit.test('getID:', function(assert){
    assert.throws(obj.getID, "Generic ExperimentObject objects should throw error on getID");
});