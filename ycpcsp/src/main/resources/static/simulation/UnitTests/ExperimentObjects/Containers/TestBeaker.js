var beaker;

QUnit.module("Beaker", {
    beforeEach: function(){
        currentInstanceID = 0;
        beaker = new Beaker(ID_EQUIP_BEAKER_50mL);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(beaker.position, [0, 0], 'default position should be [0, 0]');
    assert.deepEqual(beaker.size, [60, 60], 'default size should be [60, 60]');
    assert.equal(beaker.mass, 15.0, 'default mass should be 15.0');
    assert.equal(beaker.capacity, 50.0, 'default capacity should be 50.0');
    assert.equal(beaker.residue, 0.03, 'default residue should be 0.03');
    assert.equal(beaker.instanceID, 0, 'instanceID should be 0');
    assert.equal(beaker.sprite, SPRITE_BEAKER, 'sprite should be SPRITE_BEAKER');
});

QUnit.test('getID:', function(assert){
    assert.equal(beaker.getID(), ID_EQUIP_BEAKER_50mL, 'Should get the correct ID for beaker');

    assert.equal(new Beaker(ID_EQUIP_BEAKER_150mL).getID(), ID_EQUIP_BEAKER_150mL, 'Should get the correct ID for beaker');
    assert.equal(new Beaker(ID_EQUIP_BEAKER_250mL).getID(), ID_EQUIP_BEAKER_250mL, 'Should get the correct ID for beaker');
    assert.equal(new Beaker(ID_EQUIP_BEAKER_600mL).getID(), ID_EQUIP_BEAKER_600mL, 'Should get the correct ID for beaker');
});