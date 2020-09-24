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