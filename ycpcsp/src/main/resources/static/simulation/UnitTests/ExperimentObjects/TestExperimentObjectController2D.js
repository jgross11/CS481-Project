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
    assert.throws(controller.getObject, "All ExperimentObjectController2D objects should throw error on getObject:");
});

QUnit.test('canPlace:', function(assert){
    assert.throws(controller.getObject, "All ExperimentObjectController2D objects should throw error on canPlace");
});

QUnit.test('idToFunc:', function(assert){
    assert.throws(controller.idToFunc, "All ExperimentObjectController2D objects should throw error on idToFunc");
});

QUnit.test('idToFunc:', function(assert){
    assert.throws(controller.idToFunc, "All ExperimentObjectController2D objects should throw error on idToFunc");
});

QUnit.test('getFuncDescriptions:', function(assert){
    assert.throws(controller.getFuncDescriptions, "ExperimentObjectController2D objects should throw error on getFuncDescriptions");
});