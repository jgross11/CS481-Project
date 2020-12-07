var equip1;
var equip2;
var equip3;
var equip4;
var equip5;
var control1;
var control2;
var control3;
var control4;
var control5;

QUnit.module("EquipmentController2D", {
    beforeEach: function(){
        equip1 = new Equipment([0, 0], [0, 0], 5.0, null);
        equip2 = new Equipment([8, 9], [2, 3], 5.0, null);
        equip3 = new Equipment([0, 0], [20, 30], 5.0, null);
        equip4 = new Equipment([12, 14], [58, 29], 5.0, null);
        equip5 = new Equipment([10, -20], [5, 30], 5.0, null);
        control1 = new EquipmentController2D(equip1);
        control2 = new EquipmentController2D(equip2);
        control3 = new EquipmentController2D(equip3);
        control4 = new EquipmentController2D(equip4);
        control5 = new EquipmentController2D(equip5);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(control1.equipment, equip1, "The Equipment of the Controller should match the assigned Equipment");
});

QUnit.test('setEquipment:', function(assert){
    control1.setEquipment(null);
    assert.equal(control1.equipment, null, "The Equipment of the Controller should be null");

    control1.setEquipment(equip1);
    assert.equal(control1.equipment, equip1, "The Equipment of the Controller should match the assigned Equipment");
});

QUnit.test('getObject:', function(assert){
    assert.equal(control1.getObject(), equip1, "The Object of the Controller should match the assigned Equipment");
});

QUnit.test('canPlace:', function(assert){
    assert.true(control1.canPlace(), "All EquipmentController objects should be placeable by default");
});

QUnit.test('x:', function(assert){
    assert.equal(control2.x(), 8, "X position should be 8");
});

QUnit.test('y:', function(assert){
    assert.equal(control2.y(), 9, "Y position should be 9");
});

QUnit.test('width:', function(assert){
    assert.equal(control2.width(), 2, "Width should be 2");
});

QUnit.test('height:', function(assert){
    assert.equal(control2.height(), 3, "Height should be 3");
});

QUnit.test('setCenter:', function(assert){
    control3.setCenter(50, 100);
    assert.equal(equip3.position[0], 40, "Center x position should be 40");
    assert.equal(equip3.position[1], 85, "Center y position should be 85");
});

QUnit.test('getCenter:', function(assert){
    equip1.setPosition([10, 15]);
    equip1.setSize([26, 40]);
    let pos = control1.getCenter();
    assert.equal(pos[0], 23, "Center x should be 23");
    assert.equal(pos[1], 35, "Center y should be 35");
});

QUnit.test('keepInBounds:', function(assert){
    let b = [10, 110, 90, 40];
    equip1.setSize([20, 20]);
    equip1.setPosition([-10, 90]);
    control1.keepInBounds(b);
    assert.deepEqual(equip1.position, [0, 100], "Should snap center to upper left corner of bounds");

    equip1.setPosition([121, 151]);
    control1.keepInBounds(b);
    assert.deepEqual(equip1.position, [90, 140], "Should snap center to lower right corner of bounds");
});

QUnit.test('toRect:', function(assert){
    assert.deepEqual(control4.toRect(), [12, 14, 58, 29], "Bounds of equipment should be [12, 14, 58, 29]");
});

QUnit.test('inBounds:', function(assert){
    assert.false(control5.inBounds([0, 0]), "Point left of object should be out of bounds");
    assert.false(control5.inBounds([16, 0]), "Point right of object should be out of bounds");
    assert.false(control5.inBounds([12, -21]), "Point above object should be out of bounds");
    assert.false(control5.inBounds([12, 11]), "Point below object should be out of bounds");

    assert.true(control5.inBounds([12, 0]), "Point in object should be in bounds");
    assert.true(control5.inBounds([10, 0]), "Point on left edge of object should be in bounds");
    assert.true(control5.inBounds([15, 0]), "Point on right edge of object should be in bounds");
    assert.true(control5.inBounds([12, -20]), "Point on top edge of object should be in bounds");
    assert.true(control5.inBounds([12, 10]), "Point on bottom edge of object should be in bounds");
});

QUnit.test('reset:', function(assert){
    let listen = new Listener(null, null);
    equip5.addPositionListener(listen);
    assert.deepEqual(equip5.positionListeners, [listen], "Checking the listener was added");

    control5.reset();
    assert.deepEqual(equip5.positionListeners, [], "Checking the listener was removed");
});

QUnit.test('update:', function(assert){
    control1.update();
    assert.expect(0);
});

QUnit.todo('drawSprite:', function(assert){
    assert.true(false);
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});

QUnit.test('shouldRender:', function(assert){
    equip1.setPosition([0, 0]);
    equip1.setSize([10, 10]);
    assert.true(control1.shouldRender([5, 5, 100, 100]), "Should render on intersecting bounds");
    assert.true(control1.shouldRender([10, 7, 100, 100]), "Should render on touching bounds");
    assert.false(control1.shouldRender([11, 11, 100, 100]), "Should not render on not touching bounds");
});

QUnit.todo('drawActionsList:', function(assert){
    assert.true(false);
});