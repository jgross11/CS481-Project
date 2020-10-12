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
    assert.throws(control5.reset, "A generic EquipmentController2D object should throw an error on unimplemented reset");
});

QUnit.todo('drawSprite:', function(assert){
    assert.true(false);
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});