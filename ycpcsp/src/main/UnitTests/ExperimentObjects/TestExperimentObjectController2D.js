QUnit.test('ExperimentObjectController2D constructor:', function(assert){
    let controller = new ExperimentObjectController2D();
    assert.expect(0);
});

QUnit.test('ExperimentObjectController2D getObject:', function(assert){
    let controller = new ExperimentObjectController2D();
    assert.throws(controller.getObject, "A generic ExperimentObjectController2D object should throw an error");
});