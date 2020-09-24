QUnit.test('EquipmentController2D constructor:', function(assert){
    var equip = new Equipment([0, 0], [0, 0], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);
    assert.equal(controller.equipment, equip, "The Equipment of the Controller should match the assigned Equipment");
});

QUnit.test('EquipmentController2D setEquipment:', function(assert){
    var equip = new Equipment([0, 0], [0, 0], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(null);

    assert.equal(controller.equipment, null, "The Equipment of the Controller should be null");
    controller.setEquipment(equip);
    assert.equal(controller.equipment, equip, "The Equipment of the Controller should match the assigned Equipment");

});

QUnit.test('EquipmentController2D x:', function(assert){
    var equip = new Equipment([8, 9], [2, 3], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);
    assert.equal(controller.x(), 8, "X position should be 8");
});

QUnit.test('EquipmentController2D y:', function(assert){
    var equip = new Equipment([8, 9], [2, 3], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);
    assert.equal(controller.y(), 9, "Y position should be 9");
});

QUnit.test('EquipmentController2D width:', function(assert){
    var equip = new Equipment([8, 9], [2, 3], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);
    assert.equal(controller.width(), 2, "Width should be 2");
});

QUnit.test('EquipmentController2D height:', function(assert){
    var equip = new Equipment([8, 9], [2, 3], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);
    assert.equal(controller.height(), 3, "Height should be 3");
});

QUnit.test('EquipmentController2D toRect:', function(assert){
    var equip = new Equipment([12, 14], [58, 29], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);

    assert.deepEqual(controller.toRect(), [12, 14, 58, 29], "Bounds of equipment should be [12, 14, 58, 29]");
});

QUnit.test('EquipmentController2D inBounds:', function(assert){
    var equip = new Equipment([10, -20], [5, 30], 5.0, "exp obj", null);
    var controller = new EquipmentController2D(equip);

    assert.false(controller.inBounds([0, 0]), "Point left of object should be out of bounds");
    assert.false(controller.inBounds([16, 0]), "Point right of object should be out of bounds");
    assert.false(controller.inBounds([12, -21]), "Point above object should be out of bounds");
    assert.false(controller.inBounds([12, 11]), "Point below object should be out of bounds");

    assert.true(controller.inBounds([12, 0]), "Point in object should be in bounds");
    assert.true(controller.inBounds([10, 0]), "Point on left edge of object should be in bounds");
    assert.true(controller.inBounds([15, 0]), "Point on right edge of object should be in bounds");
    assert.true(controller.inBounds([12, -20]), "Point on top edge of object should be in bounds");
    assert.true(controller.inBounds([12, 10]), "Point on bottom edge of object should be in bounds");

});

QUnit.todo('EquipmentController2D draw:', function(assert){
    assert.true(false);
});