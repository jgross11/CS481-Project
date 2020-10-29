var flask;

QUnit.module("ErlenmeyerFlask", {
    beforeEach: function(){
        currentInstanceID = 0;
        flask = new ErlenmeyerFlask(ID_EQUIP_FLASK_25mL);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(flask.position, [0, 0], 'default position should be [0, 0]');
    assert.deepEqual(flask.size, [50, 80], 'default size should be [50, 80]');
    assert.equal(flask.mass, 15.0, 'default mass should be 15.0');
    assert.equal(flask.capacity, 25.0, 'default capacity should be 25.0');
    assert.equal(flask.residue, 0.03, 'default residue should be 0.03');
    assert.equal(flask.instanceID, 0, 'instanceID should be 0');
    assert.equal(flask.sprite, SPRITE_ERLENMEYER, 'sprite should be SPRITE_ERLENMEYER');
});

QUnit.test('getID:', function(assert){
    assert.equal(flask.getID(), ID_EQUIP_FLASK_25mL, 'Should get the correct ID for flask');

    assert.equal(new ErlenmeyerFlask(ID_EQUIP_FLASK_50mL).getID(), ID_EQUIP_FLASK_50mL, 'Should get the correct ID for flask');
    assert.equal(new ErlenmeyerFlask(ID_EQUIP_FLASK_100mL).getID(), ID_EQUIP_FLASK_100mL, 'Should get the correct ID for flask');
    assert.equal(new ErlenmeyerFlask(ID_EQUIP_FLASK_1000mL).getID(), ID_EQUIP_FLASK_1000mL, 'Should get the correct ID for flask');
});


var controller;

QUnit.module("ErlenmeyerFlaskController2D", {
    beforeEach: function(){
        flask = new ErlenmeyerFlask(ID_EQUIP_FLASK_25mL);
        controller = new ErlenmeyerFlaskController2D(flask);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, flask, "flask Equipment should be the given flask");
});

QUnit.test('canContain:', function(assert){
    assert.true(controller.canContain(idToChemical(ID_CHEM_TEST_RED).chemical), "Erlenmeyer flask can contain anything");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});