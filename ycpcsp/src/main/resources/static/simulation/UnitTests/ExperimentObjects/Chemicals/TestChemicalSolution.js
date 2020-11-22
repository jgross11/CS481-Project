var beaker;
var eyeDropper;
var water;
var salt;

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
    }
});

QUnit.test('test:', function(assert){
    // TODO give this a proper name
    beaker.addTo(water);
    beaker.addTo(salt);
    beaker.checkForSolutions();
    beaker.pourInto(eyeDropper);

    assert.false(eyeDropper.equipment.isEmpty());
    console.log(beaker.equipment.contents);

});
