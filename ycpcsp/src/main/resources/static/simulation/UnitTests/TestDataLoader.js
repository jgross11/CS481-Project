QUnit.module("DataLoader", {
    before: function(){
    }
});

QUnit.test('loadSessionData:', function(assert){
    loadSessionData();

    let data = sessionStorage.getItem(SESSION_EXPERIMENT_NAME);
    assert.notEqual(data, null, "Session data should not be null");
    assert.notEqual(data, undefined, "Session data should not be undefined");
});

QUnit.todo('parseExperiment:', function(assert){
    parseExperiment(getTestJSON);
    assert.false(true);
});

QUnit.todo('parseEquipment:', function(assert){
    assert.false(true);
});

QUnit.todo('parseChemicals:', function(assert){
    assert.false(true);
});

QUnit.todo('parseInstructions:', function(assert){
    assert.false(true);
});

QUnit.todo('experimentToJSON:', function(assert){
    assert.false(true);
});

QUnit.test('getTestJSON:', function(assert){
    let data = getTestJSON();
    assert.notEqual(data, null, "Test json should not be null");
    assert.notEqual(data, undefined, "Test json should not be undefined");
});