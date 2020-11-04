QUnit.module("ObjectIDs", {
    beforeEach: function(){
    }
});

QUnit.test('idToEquipment:', function(assert){
    assert.equal(idToEquipment(ID_EQUIP_BEAKER_50mL).constructor.name, "BeakerController2D",
        "Should create a BeakerController2D");
    assert.equal(idToEquipment(ID_EQUIP_BEAKER_150mL).constructor.name, "BeakerController2D",
        "Should create a BeakerController2D");
    assert.equal(idToEquipment(ID_EQUIP_BEAKER_250mL).constructor.name, "BeakerController2D",
        "Should create a BeakerController2D");
    assert.equal(idToEquipment(ID_EQUIP_BEAKER_600mL).constructor.name, "BeakerController2D",
        "Should create a BeakerController2D");
});

QUnit.test('idToChemical:', function(assert){
    assert.equal(idToChemical(ID_CHEM_TEST_RED, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
    assert.equal(idToChemical(ID_CHEM_TEST_BLUE, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
    assert.equal(idToChemical(ID_CHEM_TEST_WHITE, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
});