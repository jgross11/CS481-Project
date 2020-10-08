QUnit.test('Chemical constructor:', function(assert){
    var chem = new Chemical(5.0, "equ", 20.0, [1, 2, 3]);

    assert.equal(chem.mass, 5.0, "Initial mass should be 5.0");
    assert.equal(chem.equation, "equ", "Initial equation should be 'equ'");
    assert.equal(chem.temperature, 20.0, "Initial temperature should be 20.0");
    assert.deepEqual(chem.texture, [1, 2, 3], "Initial texture should be [1, 2, 3]");
});

QUnit.test('Chemical setEquation:', function(assert){
    var chem = new Chemical(5.0, "equ", 20.0, [1, 2, 3]);

    assert.equal(chem.equation, "equ", "Initial equation should be 'equ', was " + chem.equation);

    chem.setEquation("equ2");
    assert.equal(chem.equation, "equ2", "New equation should be 'equ2', was " + chem.equation);
});

QUnit.test('Chemical setTemperature:', function(assert){
    var chem = new Chemical(5.0, "equ", 20.0, [1, 2, 3]);

    assert.equal(chem.temperature, 20.0, "Initial temperature should be 20.0, was " + chem.temperature);

    chem.setTemperature(10.0);
    assert.equal(chem.temperature, 10.0, "New temperature should be 10.0, was " + chem.temperature);
});

QUnit.test('Chemical setTexture:', function(assert){
    var chem = new Chemical(5.0, "equ", 20.0, [1, 2, 3]);

    assert.deepEqual(chem.texture, [1, 2, 3], "Initial texture should be [1, 2, 3], was " + chem.texture);

    chem.setTexture([4, 5, 6]);
    assert.deepEqual(chem.texture, [4, 5, 6], "New texture should be [4, 5, 6], was " + chem.texture);
});

QUnit.test('Chemical setConcentration:', function(assert){
    var chem = new Chemical(5.0, "equ", 20.0, [1, 2, 3], 0.5);

    assert.equal(chem.concentration, 0.5, "Initial concentration should be 0.5, was " + chem.temperature);

    chem.setConcentration(1.0);
    assert.equal(chem.concentration, 1.0, "New concentration should be 1, was " + chem.temperature);

    chem.setConcentration(0);
    assert.equal(chem.concentration, 0, "New concentration should be 0, was " + chem.temperature);

    chem.setConcentration(0.3);
    assert.equal(chem.concentration, 0.3, "New concentration should be 0.3, was " + chem.temperature);

    chem.setConcentration(2);
    assert.equal(chem.concentration, 1, "New concentration should be 1, was " + chem.temperature);

    chem.setConcentration(-1);
    assert.equal(chem.concentration, 0, "New concentration should be 1, was " + chem.temperature);
});
