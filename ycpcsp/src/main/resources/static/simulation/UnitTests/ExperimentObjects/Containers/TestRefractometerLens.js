var lens;

QUnit.module("RefractometerLens", {
    beforeEach: function(){
        lens = new RefractometerLens();
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(lens.position, [0, 0], "Checking default position");
    assert.deepEqual(lens.size, [40, 20], "Checking default size");
    assert.equal(lens.mass, 0.1, "Checking default mass");
    assert.equal(lens.capacity, 0.1, "Checking default capacity");
    assert.equal(lens.residue, 0, "Checking default residue");
    assert.equal(lens.sprite, SPRITE_REFRACTOMETER, "Checking default sprite");
});

QUnit.test('getID:', function(assert){
    assert.equal(lens.getID(), ID_EQUIP_REFRACTOMETER_LENS, "Checking ID for the lens is found");
});


var lensControl;

QUnit.module("RefractometerLensController2D", {
    beforeEach: function(){
        lens = new RefractometerLens();
        lensControl = new RefractometerLensController2D(lens);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(lensControl.equipment, lens, "Checking equipment is set");
});

QUnit.test('canContain:', function(assert){
    let chemControl = idToChemical(COMPOUND_WATER_ID, 0.01, 1);
    let c = chemControl.chemical;

    c.setTemperature(50);
    chemControl.calculateMatterState();
    assert.true(lensControl.canContain(c), "Checking can contain liquid");

    c.setTemperature(150);
    chemControl.calculateMatterState();
    assert.false(lensControl.canContain(c), "Checking cannot contain gas");

    c.setTemperature(-50);
    chemControl.calculateMatterState();
    assert.true(lensControl.canContain(c), "Checking can contain solid");

    lens.setContents(c);
    let newChem = idToChemical(COMPOUND_HYDROGEN_GAS_ID, 0.01, 1);
    newChem.chemical.setTemperature(0);
    newChem.calculateMatterState();
    assert.false(lensControl.canContain(newChem.chemical), "Checking cannot contain a different chemical than the one held");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});