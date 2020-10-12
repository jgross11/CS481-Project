QUnit.module("InstanceID", {
    beforeEach: function(){
    }
});

QUnit.test("nextInstanceID:", function(assert){
    currentInstanceID = 0;
    assert.equal(nextInstanceID(), 0, "First ID should be 0");
    assert.equal(nextInstanceID(), 1, "Second ID should be 1");
    assert.equal(nextInstanceID(), 2, "Third ID should be 2");
});