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

QUnit.todo('DataLoader experimentToJSON:', function(assert){
    assert.false(true);
});

QUnit.test('DataLoader getTestJSON:', function(assert){
    let data = getTestJSON();
    assert.notEqual(data, null, "Test json should not be null");
    assert.notEqual(data, undefined, "Test json should not be undefined");
});