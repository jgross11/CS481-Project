var cylinder;

QUnit.module("GraduatedCylinder", {
    beforeEach: function(){
        currentInstanceID = 0;
        cylinder = new GraduatedCylinder(ID_EQUIP_GRADUATED_25mL);
    }
});

QUnit.test('constructor:', function(assert){
    assert.deepEqual(cylinder.position, [0, 0], 'default position should be [0, 0]');
    assert.deepEqual(cylinder.size, [23, 80], 'default size should be [23, 80]');
    assert.equal(cylinder.mass, 15.0, 'default mass should be 15.0');
    assert.equal(cylinder.capacity, 25.0, 'default capacity should be 25.0');
    assert.equal(cylinder.residue, 0.03, 'default residue should be 0.03');
    assert.equal(cylinder.instanceID, 0, 'instanceID should be 0');
    assert.equal(cylinder.sprite, SPRITE_GRADUATED, 'sprite should be SPRITE_GRADUATED');
});

QUnit.test('getID:', function(assert){
    assert.equal(cylinder.getID(), ID_EQUIP_GRADUATED_25mL, 'Should get the correct ID for flask');

    assert.equal(new GraduatedCylinder(ID_EQUIP_GRADUATED_50mL).getID(), ID_EQUIP_GRADUATED_50mL, 'Should get the correct ID for cylinder');
    assert.equal(new GraduatedCylinder(ID_EQUIP_GRADUATED_100mL).getID(), ID_EQUIP_GRADUATED_100mL, 'Should get the correct ID for cylinder');
    assert.equal(new GraduatedCylinder(ID_EQUIP_GRADUATED_1000mL).getID(), ID_EQUIP_GRADUATED_1000mL, 'Should get the correct ID for cylinder');
});


var controller;

QUnit.module("GraduatedCylinderController2D", {
    beforeEach: function(){
        cylinder = new GraduatedCylinder(ID_EQUIP_GRADUATED_25mL);
        controller = new GraduatedCylinderController2D(cylinder);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, cylinder, "cylinder Equipment should be the given cylinder");
});

QUnit.test('canContain:', function(assert){
    assert.true(controller.canContain(idToChemical(ID_CHEM_TEST_RED).chemical), "Graduated cylinder can contain anything");
});

QUnit.todo('draw:', function(assert){
    assert.true(false);
});