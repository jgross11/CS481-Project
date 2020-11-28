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

QUnit.test('getColorListObjectFromInt:', function(assert){
    var c;

    c = getColorListObjectFromInt(getColorInt([1, 2, 3, 4]));
    assert.deepEqual(c, [1, 2, 3, 4], "Checking converting from a list to an int and back to a list works.");

    c = getColorListObjectFromInt(getColorInt([0, 0, 0, 0]));
    assert.deepEqual(c, [0, 0, 0, 0], "Checking converting from a list to an int and back to a list works.");

    c = getColorListObjectFromInt(getColorInt([255, 255, 34, 76]));
    assert.deepEqual(c, [255, 255, 34, 76], "Checking converting from a list to an int and back to a list works.");

    c = getColorListObjectFromInt(getColorInt([176, 52, 63, 255]));
    assert.deepEqual(c, [176, 52, 63, 255], "Checking converting from a list to an int and back to a list works.");
});

QUnit.test('getColorInt:', function(assert){
    var c;

    c = getColorInt(getColorListObjectFromInt(0));
    assert.deepEqual(c, 0, "Checking converting from an int to a list and back to an int works.");

    c = getColorInt(getColorListObjectFromInt(-1));
    assert.deepEqual(c, -1, "Checking converting from an int to a list and back to an int works.");

    c = getColorInt(getColorListObjectFromInt(1));
    assert.deepEqual(c, 1, "Checking converting from an int to a list and back to an int works.");

    c = getColorInt(getColorListObjectFromInt(-765467));
    assert.deepEqual(c, -765467, "Checking converting from an int to a list and back to an int works.");

    c = getColorInt(getColorListObjectFromInt(4653467));
    assert.deepEqual(c, 4653467, "Checking converting from an int to a list and back to an int works.");

    c = getColorInt(getColorListObjectFromInt(2147483647));
    assert.deepEqual(c, 2147483647, "Checking converting from an int to a list and back to an int works.");

    c = getColorInt(getColorListObjectFromInt(-2147483648));
    assert.deepEqual(c, -2147483648, "Checking converting from an int to a list and back to an int works.");
});

QUnit.test('colorRatio:', function(assert){
    assert.deepEqual(colorRatio([20, 30], 2, [0, 4], 2), [10, 17], "Checking correct ratio is found");
    assert.deepEqual(colorRatio([0, 0, 0], 1, [12, 15, 30], 2), [8, 10, 20], "Checking correct ratio is found");
    assert.deepEqual(colorRatio([8, 24, 80, 120], 8, [4, 8, 12, 16], 2), [7.2, 20.8, 66.4, 99.2], "Checking correct ratio is found");
    assert.deepEqual(colorRatio([255], 5, [255], 2), [255], "Checking correct ratio is found");
    assert.deepEqual(colorRatio([255], 2, [0], 2), [127.5], "Checking correct ratio is found");
});

QUnit.test('colorRatioMultiple:', function(assert){
    assert.deepEqual(colorRatioMultiple(
        [[2], [6]],
        [1, 3]),
    [5], "Checking correct ratio is found");

    assert.deepEqual(colorRatioMultiple(
        [[20, 30], [0, 4]],
        [2, 2]),
    [10, 17], "Checking correct ratio is found");

    assert.deepEqual(colorRatioMultiple(
        [[1, 2], [4, 3], [39, 20]],
        [2, 3, 5]),
    [20.9, 11.3], "Checking correct ratio is found");
});