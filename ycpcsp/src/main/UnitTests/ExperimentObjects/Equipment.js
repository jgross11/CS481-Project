QUnit.test('Testing a class working', function(assert){
    var equip = new Equipment([5, 0], [4, 2], 10, "equip", null);

    assert.equal(equip.position[0], 5, 'Equipment should initially have 5 for x position');
});