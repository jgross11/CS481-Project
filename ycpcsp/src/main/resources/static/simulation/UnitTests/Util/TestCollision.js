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

QUnit.test('rectInRect2D:', function(assert){
    let r1 = [50, 40, 100, 60];
    assert.true(rectInRect2D(r1, [40, 40, 20, 20]), "r2 left of r1, intersecting");
    assert.true(rectInRect2D(r1, [30, 40, 20, 20]), "r2 left of r1, touching");
    assert.false(rectInRect2D(r1, [29, 40, 20, 20]), "r2 left of r1, not touching");

    assert.true(rectInRect2D(r1, [140, 30, 20, 20]), "r2 right of r1, intersecting");
    assert.true(rectInRect2D(r1, [150, 30, 20, 20]), "r2 right of r1, touching");
    assert.false(rectInRect2D(r1, [151, 30, 20, 20]), "r2 right of r1, not touching");

    assert.true(rectInRect2D(r1, [50, 30, 20, 20]), "r2 above r1, intersecting");
    assert.true(rectInRect2D(r1, [50, 20, 20, 20]), "r2 above r1, touching");
    assert.false(rectInRect2D(r1, [50, 19, 20, 20]), "r2 above r1, not touching");

    assert.true(rectInRect2D(r1, [60, 90, 20, 20]), "r2 below r1, intersecting");
    assert.true(rectInRect2D(r1, [60, 100, 20, 20]), "r2 below r1, touching");
    assert.false(rectInRect2D(r1, [60, 101, 20, 20]), "r2 below r1, not touching");
});

QUnit.test('between:', function(assert){
    assert.true(between(1, 1, 2), "Compare value equal to lower bound");
    assert.true(between(1.5, 1, 2), "Compare value in the middle of lower and upper bound");
    assert.true(between(2, 1, 2), "Compare value equal to upper bound");
    assert.false(between(.9, 1, 2), "Compare value below lower bound");
    assert.false(between(2.1, 1, 2), "Compare value above to upper bound");
});