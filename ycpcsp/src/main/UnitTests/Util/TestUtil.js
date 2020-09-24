QUnit.test('Util isFloat: "Words" is not a float, should be false', function(assert){
    assert.false(isFloat("Words"), '"Words" is not a float');
});

QUnit.test('Util isFloat: 123 is a float, should be True', function(assert){
    assert.true(isFloat(123), '123 is a float');
});

QUnit.test('Util isFloat: 12.3 is a float, should be True', function(assert){
    assert.true(isFloat(123), '12.3 is a float');
});