QUnit.test('ExperimentObjectController2D constructor:', function(assert){
    let controller = new ExperimentObjectController2D();

    assert.expect(0);
});

QUnit.test('ExperimentObjectController2D getObject:', function(assert){
    let controller = new ExperimentObjectController2D();

    assert.throws(controller.getObject, "All ExperimentObjectController2D objects must implement getObject:");
});

QUnit.test('ExperimentObjectController2D canPlace:', function(assert){
    let controller = new ExperimentObjectController2D();

    assert.throws(controller.getObject, "All ExperimentObjectController2D objects must implement canPlace");
});

QUnit.test('ExperimentObjectController2D idToFunc:', function(assert){
    let controller = new ExperimentObjectController2D();

    assert.throws(controller.idToFunc, "All ExperimentObjectController2D objects must implement idToFunc");
});

QUnit.test('ExperimentObjectController2D idToFunc:', function(assert){
    let controller = new ExperimentObjectController2D();

    assert.throws(controller.idToFunc, "All ExperimentObjectController2D objects must implement idToFunc");
});