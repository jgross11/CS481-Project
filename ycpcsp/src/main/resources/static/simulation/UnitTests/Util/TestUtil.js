QUnit.module("Util", {
    beforeEach: function(){
    }
});

QUnit.test('isFloat:', function(assert){
    assert.true(isFloat(123), '12.3 is a float');
    assert.true(isFloat(123), '123 is a float');
    assert.false(isFloat("Words"), '"Words" is not a float');
});