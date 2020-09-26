QUnit.test('ChemicalController2D constructor:', function(assert){
    var chem = new Chemical(10.0, "test chem", "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);
    assert.equal(controller.chemical, chem, "The Chemical given to the Controller should be the same.");
});

QUnit.test('ChemicalController2D setChemical:', function(assert){
    var chem = new Chemical(10.0, "test chem", "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(null);
    assert.equal(controller.chemical, null, "The Chemical given to the Controller should be null.");
    controller.setChemical(chem);
    assert.equal(controller.chemical, chem, "The Chemical set to the Controller should be the same.");
});

QUnit.todo('ChemicalController2D calculateMoles:', function(assert){
    var chem = new Chemical(10.0, "test chem", "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);
    assert.true(false);
});

QUnit.todo('ChemicalController2D calculateMatterState:', function(assert){
    var chem = new Chemical(10.0, "test chem", "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);
    assert.true(false);
});

QUnit.todo('ChemicalController2D combine:', function(assert){
    var chem1 = new Chemical(10.0, "chem1", "equ", 20.0, [10, 20, 40]);
    var chem2 = new Chemical(13.0, "chem2", "equ", 20.0, [6, 6, 6]);
    var controller = new ChemicalController2D(null);
    assert.false(controller.combine(null), "Combine should fail");
    assert.false(controller.combine(chem2), "Combine should fail");

    controller.setChemical(chem1);
    var result = controller.combine(chem2);
    assert.true(result, "Combine should be successful");
    assert.equal(chem1.mass, 23.0, "Combined mass should be 23.0");
    assert.deepEqual(chem1.texture, [13, 23, 43], "Combined texture should be [13, 23, 43]");
});