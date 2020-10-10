QUnit.test('DataLoader loadSessionData:', function(assert){
    loadSessionData();

    let data = sessionStorage.getItem(SESSION_EXPERIMENT_NAME);
    assert.notEqual(data, null, "Session data should not be null");
    assert.notEqual(data, undefined, "Session data should not be undefined");
});

QUnit.todo('DataLoader parseExperiment:', function(assert){
    parseExperiment(getTestJSON);
    assert.false(true);
});

QUnit.todo('DataLoader parseEquipment:', function(assert){
    assert.false(true);
});

QUnit.todo('DataLoader parseChemicals:', function(assert){
    assert.false(true);
});

QUnit.todo('DataLoader parseInstructions:', function(assert){
    assert.false(true);
});

QUnit.test('DataLoader idToEquipment:', function(assert){
    assert.equal(idToEquipment(ID_EQUIP_BEAKER_TEST, 0).constructor.name, "BeakerController2D",
        "Should create a BeakerController2D");
});

QUnit.test('DataLoader idToChemical:', function(assert){
    assert.equal(idToChemical(ID_CHEM_TEST_SMALL_RED, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
    assert.equal(idToChemical(ID_CHEM_TEST_SMALL_BLUE, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
    assert.equal(idToChemical(ID_CHEM_TEST_LARGE_WHITE, 1, 1).constructor.name, "ChemicalController2D",
        "Should create a ChemicalController2D");
});

QUnit.test('DataLoader getTestJSON:', function(assert){
    let data = getTestJSON();
    assert.notEqual(data, null, "Test json should not be null");
    assert.notEqual(data, undefined, "Test json should not be undefined");
});