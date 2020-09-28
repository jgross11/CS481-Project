QUnit.test('Container constructor:', function(assert){
    var container = new Container([10, 5], [12, 20], 10.0, 200.0, 0.15, 1, null);

    assert.deepEqual(container.position, [10, 5], 'position should be [10, 5]');
    assert.deepEqual(container.size, [12, 20], 'size should be [12, 20]');
    assert.equal(container.mass, 10.0, 'mass should be 10.0');
    assert.equal(container.capacity, 200.0, 'capacity should be 200.0');
    assert.equal(container.residue, 0.15, 'residue should be 0.15');
    assert.equal(container.instanceID, 1, 'name should be 1');
    assert.equal(container.sprite, null, 'sprite should be null');
});

QUnit.test('Container setContents:', function(assert){
    var container = new Container([10, 5], [12, 20], 10.0, 200.0, 0.15, 1, null);
    assert.deepEqual(container.contents, null, 'contents should be null');
    var chem = new Chemical(1, "name", "eq", 20, [100, 0, 0]);
    container.setContents(chem);
    assert.deepEqual(container.contents, chem, 'contents should be the same as the set contents');
});

QUnit.test('Container setCapacity:', function(assert){
    var container = new Container([10, 5], [12, 20], 10.0, 200.0, 0.15, 1, null);
    container.setCapacity(100.0);
    assert.equal(container.capacity, 100.0, 'capacity should be 100.0');
});

QUnit.test('Container setResidue:', function(assert){
    var container = new Container([10, 5], [12, 20], 10.0, 200.0, 0.15, 1, null);
    container.setResidue(0.05);
    assert.equal(container.residue, 0.05, 'residue should be 0.05');
});