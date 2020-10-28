var chem1;

QUnit.module("ChemProperties ", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        chem1 = new ChemProperties("test chem", 2, "person");
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(chem1.chem, "test chem", "Should have given object as ");
});