var container;
var chem;

QUnit.module("Container", {
    beforeEach: function(){
        currentInstanceID = 1;
        chem = new Chemical(1, "eq", 20, [100, 0, 0]);
        container = new Container([10, 5], [12, 20], 10.0, 200.0, 0.15);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(container.position, [10, 5], 'position should be [10, 5]');
    assert.deepEqual(container.size, [12, 20], 'size should be [12, 20]');
    assert.equal(container.mass, 10.0, 'mass should be 10.0');
    assert.equal(container.contents, null, 'contents should be null');
    assert.equal(container.capacity, 200.0, 'capacity should be 200.0');
    assert.equal(container.residue, 0.15, 'residue should be 0.15');
    assert.equal(container.instanceID, 1, 'name should be 1');
    assert.equal(container.sprite, null, 'sprite should be null');
});

QUnit.test('setContents:', function(assert){
    container.setContents(null);
    assert.deepEqual(container.contents, null, 'contents should be null');
    container.setContents(chem);
    assert.deepEqual(container.contents, chem, 'contents should be the same as the set contents');
});

QUnit.test('setCapacity:', function(assert){
    container.setCapacity(100.0);
    assert.equal(container.capacity, 100.0, 'capacity should be 100.0');
});

QUnit.test('setResidue:', function(assert){
    container.setResidue(0.05);
    assert.equal(container.residue, 0.05, 'residue should be 0.05');
});