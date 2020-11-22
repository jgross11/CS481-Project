var beaker;
var eyeDropper;
var water;
var salt;
var saltMore;
var hydrogen;

QUnit.module("ChemicalSolution", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        beaker = idToEquipment(ID_EQUIP_BEAKER_600mL);
        eyeDropper = idToEquipment(ID_EQUIP_EYE_DROPPER);
        water = idToChemical(COMPOUND_WATER_ID, 0, 1);
        water.chemical.setVolume(200);

        salt = idToChemical(COMPOUND_TABLE_SALT_ID, 0, 1);
        salt.chemical.setVolume(200);

        saltMore = idToChemical(COMPOUND_TABLE_SALT_ID, 0, 1);
        saltMore.chemical.setVolume(50);

        hydrogen = idToChemical(COMPOUND_HYDROGEN_GAS_ID, 0, 1);
        hydrogen.chemical.setVolume(50);
    }
});

QUnit.test('test:', function(assert){
    // TODO give this a proper name
    beaker.addTo(water);
    beaker.addTo(salt);
    beaker.checkForSolutions();
    beaker.pourInto(eyeDropper);

    assert.false(eyeDropper.equipment.isEmpty());

    beaker.addTo(saltMore);
    assert.false(beaker.equipment.isEmpty());

    beaker.addTo(hydrogen);
    assert.false(beaker.equipment.isEmpty());

});
