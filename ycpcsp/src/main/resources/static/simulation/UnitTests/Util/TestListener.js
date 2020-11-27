var listen;
var func;
var obj;

QUnit.module("Listener", {
    beforeEach: function(){
        obj = [1, 2];
        func = function(x){
            x[0] = 3;
            x[1] = 4;
        };
        listen = new Listener(obj, func);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(listen.obj, obj, "Checking object is set");
    assert.deepEqual(listen.func, func, "Checking function is set");
});

QUnit.test('call:', function(assert){
    assert.deepEqual(listen.obj, [1, 2], "Checking listener object is the same before calling the listener");
    listen.call();
    assert.deepEqual(listen.obj, [3, 4], "Checking listener object is the new value after calling the listener");
});