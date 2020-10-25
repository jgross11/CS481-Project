var dispose;
var disposeControl;

QUnit.module("Disposer", {
    beforeEach: function(){
        dispose = new Disposer([1, 2], [10, 20], 5, null);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(dispose.position, [1, 2], "Should have the set position");
    assert.deepEqual(dispose.size, [10, 20], "Should have the set size");
    assert.equal(dispose.mass, 5, "Should have the set mass");
});

QUnit.module("DisposerController2D", {
    beforeEach: function(){
        dispose = new Disposer([1, 2], [10, 20], 5, null);
        disposeControl = new DisposerController2D(dispose);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(disposeControl.equipment, dispose, "Should have the set disposer");
});

QUnit.test('idToFunc:', function(assert){
    assert.deepEqual(disposeControl.idToFunc(ID_FUNC_DISPOSER_DISPOSE), disposeControl.dispose,
        "Should get the dispose function");
    assert.deepEqual(disposeControl.idToFunc(null), null, "Should find null on invalid id");
});

QUnit.test('funcToId:', function(assert){
    assert.deepEqual(disposeControl.funcToId(disposeControl.dispose), ID_FUNC_DISPOSER_DISPOSE,
        "Should get the ID for dispose function");
    assert.deepEqual(disposeControl.funcToId(null), null, "Should find null on invalid function");
});

QUnit.test('dispose:', function(assert){
    assert.throws(disposeControl.dispose, "Generic DisposerController2D should throw an error on dispose");
});