var beaker;
var gym;
var chem;

QUnit.module("Scale", {
    beforeEach: function(){
        currentInstanceID = 0;
        gym = new Scale([8, 9], [102, 100], 5.0, 150.0, 0.2);
        beaker = new Beaker([8, 9], [102, 100], 5.0, 150.0, 0.2);
        chem = new Chemical(5.0, "equ", 20.0, [1, 2, 3], 0.5);
    }
});


QUnit.test('constructor:', function(assert){
    assert.deepEqual(gym.position, [8, 9], 'position should be [8, 9]');
    assert.deepEqual(gym.size, [102, 100], 'size should be [102, 100]');
    assert.equal(gym.mass, 5.0, 'mass should be 5.0');
    assert.equal(gym.capacity, 150.0, 'capacity should be 150.0');
    assert.equal(gym.residue, 0.2, 'residue should be 0.2');
    assert.equal(gym.instanceID, 0, 'instanceID should be 0');
});
