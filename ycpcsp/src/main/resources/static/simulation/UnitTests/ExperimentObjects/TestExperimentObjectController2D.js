var controller;

QUnit.module("ExperimentObjectController2D", {
    beforeEach: function(){
        controller = new ExperimentObjectController2D();
    }
});

QUnit.test('constructor:', function(assert){
    assert.expect(0);
});

QUnit.test('getObject:', function(assert){
    assert.throws(controller.getObject, "All ExperimentObjectController2D objects must implement getObject:");
});

QUnit.test('canPlace:', function(assert){
    assert.throws(controller.getObject, "All ExperimentObjectController2D objects must implement canPlace");
});

QUnit.test('idToFunc:', function(assert){
    assert.throws(controller.idToFunc, "All ExperimentObjectController2D objects must implement idToFunc");
});

QUnit.test('idToFunc:', function(assert){
    assert.throws(controller.idToFunc, "All ExperimentObjectController2D objects must implement idToFunc");
});