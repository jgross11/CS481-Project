var equip;

QUnit.module("Equipment", {
    beforeEach: function(){
        currentInstanceID = 1;
        equip = new Equipment([5, 0], [4, 2], 10.0, null);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(equip.position, [5, 0], 'position should be [5, 0]');
    assert.deepEqual(equip.size, [4, 2], 'size should be [5, 0]');
    assert.equal(equip.mass, 10.0, 'mass should be 10.0');
    assert.equal(equip.instanceID, 1, 'instance ID should be 1');
    assert.equal(equip.sprite, null, 'sprite should be null');
    assert.deepEqual(equip.positionListeners, [], 'Position listeners should be empty');
});

QUnit.test('addPositionListener:', function(assert){
    let listen = new Listener(null, null);
    equip.addPositionListener(listen);
    assert.deepEqual(equip.positionListeners, [listen], "Listener should be added");

    equip.addPositionListener(listen);
    assert.deepEqual(equip.positionListeners, [listen], "Adding the same listeners should not change the list");
});

QUnit.test('removePositionListener:', function(assert){
    let listen = new Listener(null, null);
    equip.addPositionListener(listen);
    assert.deepEqual(equip.positionListeners, [listen], "Listener should be added");

    equip.removePositionListener(equip);
    assert.deepEqual(equip.positionListeners, [listen], "Removing something not in the list should do nothing");

    equip.removePositionListener(listen);
    assert.deepEqual(equip.positionListeners, [], "Removing the listen should empty the list");
});

QUnit.test('randomizeMass:', function(assert){
    let oldMass = equip.mass;
    equip.randomizeMass();
    assert.notEqual(equip.mass, oldMass, "Checking that randomized mass is different from the original mass");
});

QUnit.test('setPosition:', function(assert){
    equip.setPosition([12, 13]);
    assert.deepEqual(equip.position, [12, 13], 'position should be [12, 13]');

    equip.addPositionListener(new Listener(equip, function(eq){
        eq.setSize([0, 1]);
    }));
    equip.setPosition([10, 10]);
    assert.deepEqual(equip.size, [0, 1], "Size should be set to that of the listener's function's value");
    assert.deepEqual(equip.position, [10, 10], "Should still set the position correctly");
});

QUnit.test('setSize:', function(assert){
    equip.setSize([22, 23]);
    assert.deepEqual(equip.size, [22, 23], 'size should be [22, 23]');
});

QUnit.test('setInstanceID:', function(assert){
    equip.setInstanceID(1);
    assert.equal(equip.instanceID, 1, 'name should be 1');
});

QUnit.test('setSprite:', function(assert){
    equip.setSprite("SPRITE_BEAKER");
    assert.equal(equip.sprite, "SPRITE_BEAKER", 'size should be SPRITE_BEAKER');
});