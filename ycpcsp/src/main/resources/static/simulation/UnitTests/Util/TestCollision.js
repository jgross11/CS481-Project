QUnit.module("Collision", {
    beforeEach: function(){
    }
});

QUnit.test('pointInRect2D:', function(assert){
    var bounds = [10, -20, 5, 30];

    assert.false(pointInRect2D(bounds, [0, 0]), "Point left of rect should be out of bounds");
    assert.false(pointInRect2D(bounds, [16, 0]), "Point right of rect should be out of bounds");
    assert.false(pointInRect2D(bounds, [12, -21]), "Point above rect should be out of bounds");
    assert.false(pointInRect2D(bounds, [12, 11]), "Point below rect should be out of bounds");

    assert.true(pointInRect2D(bounds, [12, 0]), "Point in rect should be in bounds");
    assert.true(pointInRect2D(bounds, [10, 0]), "Point on left edge of rect should be in bounds");
    assert.true(pointInRect2D(bounds, [15, 0]), "Point on right edge of rect should be in bounds");
    assert.true(pointInRect2D(bounds, [12, -20]), "Point on top edge of rect should be in bounds");
    assert.true(pointInRect2D(bounds, [12, 10]), "Point on bottom edge of rect should be in bounds");
});