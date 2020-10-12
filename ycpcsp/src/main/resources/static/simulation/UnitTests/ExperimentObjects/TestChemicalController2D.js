var chem1;
var chem2;
var chem3;
var control1;
var control2;
var control3;

QUnit.module("ChemicalController2D", {
    beforeEach: function(){
        chem1 = new Chemical(6.0, "equ", 20.0, [10, 20, 40]);
        chem2 = new Chemical(4.0, "equ", 20.0, [10, 10, 10]);
        chem3 = new Chemical(10.0, "equ", 20.0, [10, 10, 10]);
        control1 = new ChemicalController2D(chem1);
        control2 = new ChemicalController2D(chem2);
        control3 = new ChemicalController2D(chem3);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(control1.chemical, chem1, "The Chemical given to the Controller should be the same.");
});

QUnit.test('setChemical:', function(assert){
    control1.setChemical(null);
    assert.equal(control1.chemical, null, "The Chemical given to the Controller should be null.");

    control1.setChemical(chem1);
    assert.equal(control1.chemical, chem1, "The Chemical set to the Controller should be the same.");
});

QUnit.test('getObject:', function(assert){
    assert.equal(control1.getObject(), chem1, "The object obtained should be the same as the Chemical in the Controller.");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(control1.idToFunc(0), null, "ChemicalController2D should not have any function ids");
    assert.equal(control1.idToFunc(1), null, "ChemicalController2D should not have any function ids");
    assert.equal(control1.idToFunc(2), null, "ChemicalController2D should not have any function ids");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(control1.funcToId(null), null, "ChemicalController2D should not have any functions returned");
});

QUnit.test('canPlace:', function(assert){
    assert.false(control1.canPlace(), "All ChemicalController objects should be not placeable by default");
});

QUnit.todo('calculateMoles:', function(assert){
    assert.true(false);
});

QUnit.todo('calculateMatterState:', function(assert){
    assert.true(false);
});

QUnit.test('combine:', function(assert){
    control1.setChemical(null);
    control2.setChemical(null);
    assert.false(control1.combine(null), "Combine should fail");

    control1.setChemical(chem1);
    assert.false(control1.combine(control2), "Combine should fail");

    control1.setChemical(null);
    control2.setChemical(chem2);
    assert.false(control1.combine(control2), "Combine should fail");

    control1.setChemical(chem1);
    var result = control1.combine(control2);
    assert.true(result, "Combine should be successful");
    assert.equal(chem1.mass, 10.0, "Combined mass should be 15.0");
    assert.deepEqual(chem1.texture, [10, 16, 28], "Combined texture should be [10, 16, 28]");
});

QUnit.test('split:', function(assert){
    chem2 = control3.split(.4);

    assert.equal(chem3.mass, 4.0, "Remaining mass should be 4.0");
    assert.equal(chem2.mass, 6.0, "Taken mass should be 6.0");
    assert.deepEqual(chem2.name, chem3.name, "Split name should be the same as the original.")
    assert.deepEqual(chem2.equation, chem3.equation, "Split equation should be the same as the original.")
    assert.deepEqual(chem2.temperature, chem3.temperature, "Split temperature should be the same as the original.")
    assert.deepEqual(chem2.texture, chem3.texture, "Split texture should be the same as the original.")
    assert.equal(control3.split(-0.1), null, "Should be unable to split -0.1");
    assert.equal(control3.split(1.1), null, "Should be unable to split 1.1");

    control3.setChemical(null);
    assert.equal(control3.split(0.1), null, "Should be unable to split with no chemical");
});

QUnit.test('copyChem:', function(assert){
    var copied = control3.copyChem();
    assert.deepEqual(chem3, copied, "Copied chemical should be identical to original chemical");
});

QUnit.todo('drawRect:', function(assert){
    assert.true(false);
});