var container;
var chem1;
var chem2;

QUnit.module("Container", {
    beforeEach: function(){
        currentInstanceID = 1;
        chem1 = new Chemical(1, new ChemProperties(ID_CHEM_TEST_RED), 20, 1);
        chem2 = new Chemical(5, new ChemProperties(ID_CHEM_TEST_BLUE), 20, 1);
        container = new Container([10, 5], [12, 20], 10.0, 200.0, 0.15);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(container.position, [10, 5], 'position should be [10, 5]');
    assert.deepEqual(container.size, [12, 20], 'size should be [12, 20]');
    assert.equal(container.mass, 10.0, 'mass should be 10.0');
    assert.true(container.isEmpty(), 'contents should be empty');
    assert.equal(container.capacity, 200.0, 'capacity should be 200.0');
    assert.equal(container.residue, 0.15, 'residue should be 0.15');
    assert.equal(container.instanceID, 1, 'name should be 1');
    assert.equal(container.sprite, null, 'sprite should be null');
});

QUnit.test('setContents:', function(assert){
    container.setContents(null);
    assert.true(container.isEmpty(), 'contents should be empty');
    container.setContents(chem1);
    assert.deepEqual(container.contents, [chem1], 'contents should be the same as the set contents');
});

QUnit.test('getTotalContentsMass:', function(assert){
    assert.true(container.isEmpty(), 'Container should initially be empty');

    container.setContents(chem1);
    assert.equal(container.getTotalContentsMass(), 1, 'With chemical 1, total mass should be 1');

    container.setContents([chem1, chem2]);
    assert.equal(container.getTotalContentsMass(), 6, 'With chemicals 1 and 2, total mass should be 6');

    container.setContents([chem2]);
    assert.equal(container.getTotalContentsMass(), 5, 'With chemical 2, total mass should be 5');
});

QUnit.test('getTotalContentsVolume:', function(assert){
    assert.true(container.isEmpty(), 'Container should initially be empty');

    container.setContents(chem1);
    let v = container.getTotalContentsVolume();
    assert.true(Math.abs(v - 1.66666667) < DELTA, "With 1 chemical, total volume should be 1.66666667, was " + v);

    container.setContents([chem1, chem2]);
    v = container.getTotalContentsVolume();
    assert.true(Math.abs(v - 8.80952381) < DELTA, "With 2 chemicals, total volume should be 8.80952381, was " + v);

    container.setContents([chem2]);
    v = container.getTotalContentsVolume();
    assert.true(Math.abs(v - 7.14285714) < DELTA, "With 1 different chemical, total volume should be 7.14285714, was " + v);
});

QUnit.test('getTotalMass:', function(assert){
    assert.equal(container.getTotalMass(), 10, 'Empty container should have just its mass of 10');

    container.setContents(chem1);
    assert.equal(container.getTotalMass(), 11, 'Container with chem1 should have total mass of 11');
});

QUnit.test('isEmpty:', function(assert){
    assert.true(container.isEmpty(), 'Container should initially be empty');

    container.setContents(chem1);
    assert.false(container.isEmpty(), 'With chem1, container should not be empty');
});

QUnit.test('setCapacity:', function(assert){
    container.setCapacity(100.0);
    assert.equal(container.capacity, 100.0, 'capacity should be 100.0');
});

QUnit.test('setResidue:', function(assert){
    container.setResidue(0.05);
    assert.equal(container.residue, 0.05, 'residue should be 0.05');
});