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