QUnit.test('Beaker constructor:', function(assert){
    var beaker = new Beaker([8, 9], [102, 100], 5.0, 150.0, 0.2, "beak");

    assert.deepEqual(beaker.position, [8, 9], 'position should be [8, 9]');
    assert.deepEqual(beaker.size, [102, 100], 'size should be [102, 100]');
    assert.equal(beaker.mass, 5.0, 'mass should be 5.0');
    assert.equal(beaker.capacity, 150.0, 'capacity should be 150.0');
    assert.equal(beaker.residue, 0.2, 'residue should be 0.2');
    assert.equal(beaker.name, "beak", 'name should be "beak"');
    assert.equal(beaker.sprite, SPRITE_BEAKER, 'sprite should be SPRITE_BEAKER');
});

QUnit.test('Beaker canContain:', function(assert){
    var beaker = new Beaker([8, 9], [102, 100], 5.0, 150.0, 0.2, "beak");
    assert.true(beaker.canContain(null), "Beaker can contain anything");
});