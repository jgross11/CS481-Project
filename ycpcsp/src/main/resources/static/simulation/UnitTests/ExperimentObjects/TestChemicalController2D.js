var chem1;
var chem2;
var chem3;
var chem4;
var control1;
var control2;
var control3;
var control4;

QUnit.module("ChemicalController2D", {
    before(){
        initTestChemProperties();
    },
    beforeEach: function(){
        chem1 = idToChemical(ID_CHEM_TEST_BLUE, 6.0, 1).chemical;
        chem2 = idToChemical(ID_CHEM_TEST_BLACK, 4.0, 1).chemical;
        chem3 = idToChemical(ID_CHEM_TEST_BLACK, 10.0, 1).chemical;
        chem4 = idToChemical(ID_CHEM_TEST_BLACK, 9.0, 1).chemical;
        control1 = new ChemicalController2D(chem1);
        control2 = new ChemicalController2D(chem2);
        control3 = new ChemicalController2D(chem3);
        control4 = new ChemicalController2D(chem4);
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

QUnit.test('canPlace:', function(assert){
    assert.false(control1.canPlace(), "All ChemicalController objects should be not placeable by default");
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(control1.idToFunc(0), null, "ChemicalController2D should not have any function ids");
    assert.equal(control1.idToFunc(1), null, "ChemicalController2D should not have any function ids");
    assert.equal(control1.idToFunc(2), null, "ChemicalController2D should not have any function ids");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(control1.funcToId(null), null, "ChemicalController2D should not have any functions returned");
});

QUnit.test('getFuncDescriptions:', function(assert){
    let desc = control1.getFuncDescriptions();
    assert.equal(desc.length, 0, "Chemicals should have no function descriptions");
});

QUnit.todo('calculateMoles:', function(assert){
    assert.true(false);
});

QUnit.todo('calculateMatterState:', function(assert){
    assert.true(false);
});

QUnit.test('combine:', function(assert){
    control1.setChemical(null);
    assert.deepEqual(control1.combine(null), null, "Combine should fail with null chems parameter");

    control1.setChemical(chem1);
    assert.deepEqual(control1.combine([]), [chem1], "Combine should add nothing to the list");

    control1.setChemical(chem1);
    var result = control1.combine([chem2]);
    let beaker = new Beaker(ID_EQUIP_BEAKER_600mL);
    beaker.setContents(result);
    assert.notDeepEqual(result, null, "Combine should be successful");
    assert.equal(beaker.getTotalContentsMass(), 10.0, "Combined mass should be 10.0");
    assert.equal(chem1.mass, 6, "After combining, original mass should still be the same");
    assert.equal(chem2.mass, 4, "After combining, original mass should still be the same");

    control3.setChemical(chem3);
    let chemList = [chem1, chem4];
    result = control3.combine(chemList);
    beaker.setContents(result);
    assert.equal(result.length, 2, "Testing that combining common chemicals combines them, not stores them as two separate chemicals.");
    assert.equal(beaker.getTotalContentsMass(), 25, "Testing that combining common chemicals has the correct mass.");
    assert.equal(chem1.mass, 6, "After combining, original mass should still be the same");
    assert.equal(chem3.mass, 10, "After combining, original mass should still be the same");
    assert.equal(chem4.mass, 9, "After combining, original mass should still be the same");
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

QUnit.todo('drawShape:', function(assert){
    assert.true(false);
});