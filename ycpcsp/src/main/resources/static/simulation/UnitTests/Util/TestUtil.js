QUnit.module("Util", {
    beforeEach: function(){
    }
});

QUnit.test('isFloat:', function(assert){
    assert.true(isFloat(123), '12.3 is a float');
    assert.true(isFloat(123), '123 is a float');
    assert.false(isFloat("Words"), '"Words" is not a float');
});

QUnit.test('sortArrayByKey:', function(assert){
    let getList = function(){ return [
        {"a": 3, "b": 5, "c": 4, "id": 0},
        {"a": 2, "b": 3, "c": 3, "id": 1},
        {"a": 3, "b": 5, "c": 1, "id": 2},
        {"a": 3, "b": 4, "c": 2, "id": 3},
        {"a": 2, "b": 5, "c": 5, "id": 4}
    ];}
    var list;

    list = sortArrayByKey(getList(), "c", false);
    assert.equal(list[0].id, 2, "Testing sorting based on one element");
    assert.equal(list[1].id, 3, "Testing sorting based on one element");
    assert.equal(list[2].id, 1, "Testing sorting based on one element");
    assert.equal(list[3].id, 0, "Testing sorting based on one element");
    assert.equal(list[4].id, 4, "Testing sorting based on one element");

    list = sortArrayByKey(getList(), ["b", "c"], true);
    assert.equal(list[0].id, 1, "Testing sorting based on two elements");
    assert.equal(list[1].id, 3, "Testing sorting based on two elements");
    assert.equal(list[2].id, 2, "Testing sorting based on two elements");
    assert.equal(list[3].id, 0, "Testing sorting based on two elements");
    assert.equal(list[4].id, 4, "Testing sorting based on two elements");

    list = sortArrayByKey(getList(), ["a", "b", "c"], true);
    assert.equal(list[0].id, 1, "Testing sorting based on three elements");
    assert.equal(list[1].id, 4, "Testing sorting based on three elements");
    assert.equal(list[2].id, 3, "Testing sorting based on three elements");
    assert.equal(list[3].id, 2, "Testing sorting based on three elements");
    assert.equal(list[4].id, 0, "Testing sorting based on three elements");
});

QUnit.test('arraySortCompare:', function(assert){
    assert.equal(arraySortCompare({"a": 1}, {"a": 2}, "a"), -1, "First parameter lower than second parameter");
    assert.equal(arraySortCompare({"a": 3}, {"a": 2}, "a"), 1, "First parameter greater than second parameter");
    assert.equal(arraySortCompare({"a": 2}, {"a": 2}, "a"), 0, "First parameter equal to second parameter");
});