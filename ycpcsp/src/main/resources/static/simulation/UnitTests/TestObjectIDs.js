QUnit.test('ObjectIDs idToEquipment:', function(assert){
    assert.equal(idToEquipment(ID_EQUIP_BEAKER_TEST, 0).constructor.name, "BeakerController2D",
        "Should create a BeakerController2D");
});

QUnit.test('ObjectIDs idToChemical:', function(assert){
    assert.equal(idToChemical(ID_CHEM_TEST_SMALL_RED, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
    assert.equal(idToChemical(ID_CHEM_TEST_SMALL_BLUE, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
    assert.equal(idToChemical(ID_CHEM_TEST_LARGE_WHITE, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
});