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