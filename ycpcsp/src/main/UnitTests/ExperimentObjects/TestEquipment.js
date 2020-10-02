QUnit.test('Equipment constructor:', function(assert){
    var equip = new Equipment([5, 0], [4, 2], 10.0, "equip", null);

    assert.deepEqual(equip.position, [5, 0], 'position should be [5, 0]');
    assert.deepEqual(equip.size, [4, 2], 'size should be [5, 0]');
    assert.equal(equip.mass, 10.0, 'mass should be 10.0');
    assert.equal(equip.name, "equip", 'name should be "equip"');
    assert.equal(equip.sprite, null, 'sprite should be null');
});

QUnit.test('Equipment setPosition:', function(assert){
    var equip = new Equipment([0, 0], [0, 0], 10.0, "equip", null);
    equip.setPosition([12, 13]);

    assert.deepEqual(equip.position, [12, 13], 'position should be [12, 13]');
});

QUnit.test('Equipment setSize:', function(assert){
    var equip = new Equipment([0, 0], [0, 0], 10.0, "equip", null);
    equip.setSize([22, 23]);

    assert.deepEqual(equip.size, [22, 23], 'size should be [22, 23]');
});

QUnit.test('Equipment setSprite:', function(assert){
    var equip = new Equipment([0, 0], [0, 0], 10.0, "equip", null);
    equip.setSprite("SPRITE_BEAKER");

    assert.equal(equip.sprite, "SPRITE_BEAKER", 'size should be SPRITE_BEAKER');
});

QUnit.test('Equipment inBounds:', function(assert){
    var equip = new Equipment([10, -20], [5, 30], 5.0, "exp obj", null);

    assert.false(equip.inBounds([0, 0]), "Point left of object should be out of bounds");
    assert.false(equip.inBounds([16, 0]), "Point right of object should be out of bounds");
    assert.false(equip.inBounds([12, -21]), "Point above object should be out of bounds");
    assert.false(equip.inBounds([12, 11]), "Point below object should be out of bounds");

    assert.true(equip.inBounds([12, 0]), "Point in object should be in bounds");
    assert.true(equip.inBounds([10, 0]), "Point on left edge of object should be in bounds");
    assert.true(equip.inBounds([15, 0]), "Point on right edge of object should be in bounds");
    assert.true(equip.inBounds([12, -20]), "Point on top edge of object should be in bounds");
    assert.true(equip.inBounds([12, 10]), "Point on bottom edge of object should be in bounds");

});

QUnit.todo('Equipment draw:', function(assert){
    assert.true(false);
});