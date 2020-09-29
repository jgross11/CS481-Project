QUnit.test('ChemicalController2D constructor:', function(assert){
    var chem = new Chemical(10.0, "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);

    assert.equal(controller.chemical, chem, "The Chemical given to the Controller should be the same.");
});

QUnit.test('ChemicalController2D setChemical:', function(assert){
    var chem = new Chemical(10.0, "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(null);

    assert.equal(controller.chemical, null, "The Chemical given to the Controller should be null.");

    controller.setChemical(chem);
    assert.equal(controller.chemical, chem, "The Chemical set to the Controller should be the same.");
});

QUnit.test('ChemicalController2D getObject:', function(assert){
    var chem = new Chemical(10.0, "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);

    assert.equal(controller.getObject(), chem, "The object obtained should be the same as the Chemical in the Controller.");
});

QUnit.todo('ChemicalController2D calculateMoles:', function(assert){
    var chem = new Chemical(10.0, "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);

    assert.true(false);
});

QUnit.todo('ChemicalController2D calculateMatterState:', function(assert){
    var chem = new Chemical(10.0, "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);

    assert.true(false);
});

QUnit.test('ChemicalController2D combine:', function(assert){
    var chem1 = new Chemical(6.0, "equ", 20.0, [10, 20, 40]);
    var chem2 = new Chemical(4.0, "equ", 20.0, [10, 10, 10]);
    var controller = new ChemicalController2D(null);

    assert.false(controller.combine(null), "Combine should fail");
    assert.false(controller.combine(chem2), "Combine should fail");

    controller.setChemical(chem1);
    var result = controller.combine(chem2);
    assert.true(result, "Combine should be successful");
    assert.equal(chem1.mass, 10.0, "Combined mass should be 15.0");
    assert.deepEqual(chem1.texture, [10, 16, 28], "Combined texture should be [10, 16, 28]");
});

QUnit.test('ChemicalController2D split:', function(assert){
    var chem1 = new Chemical(10.0, "equ", 20.0, [10, 20, 40]);
    var controller = new ChemicalController2D(chem1);
    var chem2 = controller.split(.4);

    assert.equal(chem1.mass, 4.0, "Remaining mass should be 4.0");
    assert.equal(chem2.mass, 6.0, "Taken mass should be 6.0");
    assert.deepEqual(chem2.name, chem1.name, "Split name should be the same as the original.")
    assert.deepEqual(chem2.equation, chem1.equation, "Split equation should be the same as the original.")
    assert.deepEqual(chem2.temperature, chem1.temperature, "Split temperature should be the same as the original.")
    assert.deepEqual(chem2.texture, chem1.texture, "Split texture should be the same as the original.")
    assert.equal(controller.split(-0.1), null, "Should be unable to split -0.1");
    assert.equal(controller.split(1.1), null, "Should be unable to split 1.1");

    controller.setChemical(null);
    assert.equal(controller.split(0.1), null, "Should be unable to split with no chemical");
});

QUnit.todo('ChemicalController2D drawRect:', function(assert){
    var chem = new Chemical(10.0, "equ", 20.0, [1, 2, 3]);
    var controller = new ChemicalController2D(chem);
    assert.true(false);
});