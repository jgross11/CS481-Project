var container;
var controller;
var beaker1;
var beaker2;
var beakerControl1;
var beakerControl2;

var chem1;
var chem2;
var chem3;
var chem4;
var chem5;
var chem6;
var chem7;
var chemControl1;
var chemControl2;
var chemControl3;
var chemControl4;
var chemControl5;
var chemControl6;
var chemControl7;

var DELTA = 0.001;

QUnit.module("ContainerController2D", {
    before: function(){
        initTestChemProperties();
    },
    beforeEach: function(){
        container = new Container([0, 0], [0, 0], 0, 8, 0, null);
        controller = new ContainerController2D(container);
        beaker1 = new Beaker(ID_EQUIP_BEAKER_50mL);
        beaker1.setResidue(0.1);
        beaker1.setMass(1);
        beaker1.setCapacity(100);
        beaker2 = new Beaker(ID_EQUIP_BEAKER_50mL);
        beaker2.setResidue(0.1);
        beaker2.setMass(0);
        beaker2.setCapacity(100);

        beakerControl1 = new BeakerController2D(beaker1);
        beakerControl2 = new BeakerController2D(beaker2);

        chemControl1 = idToChemical(COMPOUND_WATER_ID, 30, 1);
        chemControl2 = idToChemical(COMPOUND_WATER_ID, 20, 1);
        chemControl3 = idToChemical(COMPOUND_WATER_ID, 70, 1);
        chemControl4 = idToChemical(COMPOUND_WATER_ID, 50, 1);
        chemControl5 = idToChemical(COMPOUND_TABLE_SALT_ID, 50, 1);
        chemControl6 = idToChemical(ELEMENT_CARBON_ATOMIC_NUM, 1, 1);
        chemControl7 = idToChemical(ELEMENT_CHLORINE_ATOMIC_NUM, 1, 1);
        chem1 = chemControl1.chemical;
        chem2 = chemControl2.chemical;
        chem3 = chemControl3.chemical;
        chem4 = chemControl4.chemical;
        chem5 = chemControl5.chemical;
        chem6 = chemControl6.chemical;
        chem7 = chemControl7.chemical;
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, container, "The Controller Equipment should be the given Container")
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_POUR_INTO), controller.pourInto, "Should get the function pourInto");
    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_ADD_TO), controller.addTo, "Should get the function addTo");
    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_EMPTY_IN_TRASH), controller.emptyOut, "Should get the function emptyOut");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(controller.funcToId(controller.pourInto), ID_FUNC_CONTAINER_POUR_INTO, "Should get the ID for pourInto");
    assert.equal(controller.funcToId(controller.addTo), ID_FUNC_CONTAINER_ADD_TO, "Should get the ID for addTo");
    assert.equal(controller.funcToId(controller.emptyOut), ID_FUNC_CONTAINER_EMPTY_IN_TRASH, "Should get the ID for emptyOut");
});

QUnit.test('updateContentsTemperature:', function(assert){
    beaker1.setContents(chem1);
    beakerControl1.updateContentsTemperature(17);
    assert.equal(chem1.temperature, 17, "Checking that chemicals inside containers have updated temperature");
});

QUnit.test('getFuncDescriptions:', function(assert){
    let desc = controller.getFuncDescriptions();
    assert.equal(desc.length, 3, "Containers should have three function descriptions");
});

QUnit.test('hasResidue:', function(assert){
    beaker1.setResidue(0.1);
    assert.false(beakerControl1.hasResidue(), "Should have no residue by default");

    beaker1.setContents(chemControl1.chemical.copyChem());
    assert.false(beakerControl1.hasResidue(), "Should have no residue after adding chemical");

    beakerControl1.pourOut();
    assert.true(beakerControl1.hasResidue(), "Should have residue after pouring out chemical");
});

QUnit.test('checkForMass:', function(assert){
    beaker1.setContents([chem1]);
    assert.false(beakerControl1.checkForMass(), "Should not have updated contents");
    assert.deepEqual(beaker1.contents, [chem1], "Contents should have chem1");

    chem1.setMass(0);
    assert.true(beakerControl1.checkForMass(), "Should have updated contents to empty");
    assert.true(beaker1.isEmpty(), "Contents should be empty");

    chem1.setMass(1);
    chem2.setMass(1);
    beaker1.setContents([chemControl1.chemical.copyChem(), chemControl2.chemical.copyChem()]);
    assert.deepEqual(beaker1.contents, [chem1, chem2], "Contents should be the two chemicals");

    beaker1.contents[0].setMass(0);
    chem1.setMass(0);
    assert.deepEqual(beaker1.contents, [chem1, chem2], "Contents should still be the two chemicals");

    assert.true(beakerControl1.checkForMass(), "Should have removed a chemical");
    assert.deepEqual(beaker1.contents, [chem2], "Contents should be the one chemical remaining");
});

QUnit.test('pourInto:', function(assert){
    beaker1.setContents(chem1);
    beaker2.setContents(chem2);
    beaker1.setResidue(0);
    beaker2.setResidue(0);
    beakerControl1.setEquipment(null);
    beakerControl2.setEquipment(null);

    assert.false(beakerControl1.pourInto(null), "Pouring into a null object should fail");
    assert.deepEqual(beakerControl1.equipment, null, "Container should still be empty");

    assert.false(beakerControl1.pourInto(beaker1), "Pouring into not a beaker controller should fail");
    assert.deepEqual(beakerControl1.equipment, null, "Container should still be empty");

    assert.false(beakerControl1.pourInto(beakerControl2), "Pouring into a controller with no beaker should fail");
    assert.deepEqual(beakerControl1.equipment, null, "Container should still be empty");

    beakerControl1.setEquipment(beaker2);
    assert.false(beakerControl1.pourInto(null), "Pouring null into a controller with no beaker should fail");
    assert.deepEqual(beakerControl1.equipment, beaker2, "Container should still be empty");

    beakerControl1.setEquipment(beaker1);
    beakerControl2.setEquipment(beaker2);
    assert.true(beakerControl1.pourInto(beakerControl2), "Pouring into a valid controller should succeed");
    assert.equal(beaker2.getTotalContentsMass(), 50, "Container should contain modified chemical with mass 50");

    chem1.setMass(30);
    chem2.setMass(20);
    beaker1.setResidue(0.1);
    beaker1.setContents(chem1);
    beaker2.setContents(chem2);
    assert.true(beakerControl1.pourInto(beakerControl2), "Pouring into a valid controller should succeed");
    assert.equal(beaker2.getTotalContentsMass(), 47, "Container should contain modified chemical with mass 47 after leaving residue");

    beaker1.setContents(chem3);
    beaker2.setContents(chem4);
    beaker1.setResidue(0);
    assert.true(beakerControl1.pourInto(beakerControl2), "Pouring into a valid controller should succeed");
    assert.equal(beakerControl2.equipment.getTotalContentsMass(), 100, "Container poured into should be full with mass 100");
    assert.equal(beakerControl1.equipment.getTotalContentsMass(), 20, "Container poured out should have 20 mass");

    chem1.setMass(5);
    chem2.setMass(10);
    beaker1.setResidue(0);
    beaker1.setContents([chem1, chem2]);
    beaker2.setContents(null);
    assert.true(beakerControl1.pourInto(beakerControl2), "Pouring into a valid controller should succeed");
    assert.deepEqual(beaker2.getTotalContentsMass(), 15, "Beaker1 should have poured 15 units of chemical into beaker2");

    chem1.setMass(5);
    chem2.setMass(10);
    beaker1.setContents([chem1, chem2]);
    beaker2.setContents(null);
    beaker2.setCapacity(15);
    assert.true(beakerControl1.pourInto(beakerControl2));
    assert.deepEqual(beaker2.getTotalContentsMass(), 15, "Beaker1 should have poured all 15 units of chemical into beaker2");

    chem1.setMass(5);
    chem2.setMass(10);
    beaker1.setContents([chem1, chem2]);
    beaker2.setContents(null);
    beaker2.setCapacity(12);
    assert.true(beakerControl1.pourInto(beakerControl2), "Pouring into a valid controller should succeed");
    assert.deepEqual(beaker2.getTotalContentsMass(), 12, "Beaker1 should have poured 12 units of chemical into beaker2");
});

QUnit.test('pourOut:', function(assert){
    beaker1.setResidue(0.1);
    chem1.setMass(1);
    var chemCopy = chemControl1.chemical.copyChem();

    beaker1.setContents(null);
    assert.deepEqual(beakerControl1.pourOut(), [], "Beaker should pour nothing when it has no contents");

    beaker1.setContents(chemCopy);
    beakerControl1.pourOut()
    assert.true(beakerControl1.hasResidue(), "Beaker should have residue after pouring out");
    assert.deepEqual(beakerControl1.pourOut(), [], "Beaker should pour nothing when it only has residue");

    chem1.setMass(1);
    chemCopy = chemControl1.chemical.copyChem();
    beaker1.setContents(chemCopy);
    beaker1.setResidue(0);
    assert.deepEqual(beakerControl1.pourOut(), [chem1], "Chemical poured out, no params, should be equal to original contents");
    assert.true(beaker1.isEmpty(), "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.chemical.copyChem();
    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.pourOut(-1), [chemCopy], "Chemical poured out, negative param, should be equal to original contents");
    assert.true(beaker1.isEmpty(), "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.chemical.copyChem();
    beaker1.setContents(chemCopy);
    assert.deepEqual(beakerControl1.pourOut(2), [chem1], "Chemical poured out, higher than real contents param, should be equal to original contents");
    assert.true(beaker1.isEmpty(), "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.chemical.copyChem();
    chemCopy.setMass(0.6)
    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.pourOut(0.6), [chemCopy], "Chemical poured out, part of contents param, should be equal to new contents");
    assert.equal(beaker1.contents[0].mass, 0.4, "Container should have 0.4 mass remaining");

    beaker1.setContents([chemControl1.chemical.copyChem(), chemControl2.chemical.copyChem()]);
    assert.deepEqual(beaker1.contents, [chem1, chem2], "Should correctly set contents to the two given chemicals");

    assert.deepEqual(beakerControl1.pourOut(), [chem2, chem1], "Should get two chemicals after pouring them out");
    assert.true(beaker1.isEmpty(), "Beaker should be left with no contents")
});

QUnit.test('addTo:', function(assert){
    chem1.setMass(1);
    chem2.setMass(1);
    assert.true(beaker1.isEmpty(), "The container should initially be empty");

    assert.true(beakerControl1.addTo(chemControl1), "Should successfully add the chemical");
    assert.deepEqual(beaker1.contents, [chem1], "The container should contain chemical 1");

    assert.true(beakerControl1.addTo(chemControl2), "Should successfully add the chemical");

    assert.false(beakerControl1.addTo(null), "Should fail to add a null parameter");

    assert.false(beakerControl1.addTo(chem1), "Should fail to add a non chemical controller parameter");
});

QUnit.test('checkForSolutions:', function(assert){
    var s;

    beaker1.setCapacity(1000);
    beaker1.setResidue(0);

    beakerControl1.emptyOut();
    beakerControl1.addTo(chemControl4);
    assert.false(beakerControl1.checkForSolutions(), "Checking no solution is made with only one chemical");

    beakerControl1.addTo(chemControl6);
    assert.false(beakerControl1.checkForSolutions(), "Checking no solution is made with only one water soluble chemical");

    beakerControl1.emptyOut();
    beakerControl1.addTo(chemControl4);
    beakerControl1.addTo(chemControl5);
    assert.equal(beaker1.getTotalContentsMass(), 100, "Checking the mass of the contents before making a solution.");
    assert.equal(beaker1.contents.length, 2, "Checking there are two chemicals in the beaker before making a solution");
    assert.true(beakerControl1.checkForSolutions(), "Checking a solution is made with salt and water");
    assert.equal(beaker1.contents.length, 1, "Checking the beaker has one chemical in the beaker after making a solution");
    assert.equal(beaker1.getTotalContentsMass(), 100, "Checking that the mass of the contents is the same after making a solution.");
    s = beaker1.contents[0];
    assert.equal(s.solute.getID(), COMPOUND_WATER_ID, "Checking that the solute is the water");
    assert.equal(s.solvents[0].getID(), COMPOUND_TABLE_SALT_ID, "Checking that the solvent is the salt");

    beakerControl1.addTo(new ChemicalController2D(chem4.copyChem()));
    assert.equal(beaker1.contents.length, 2, "Checking there are two chemicals in the beaker before adding to a solution");
    assert.equal(beaker1.getTotalContentsMass(), 150, "Checking the mass of the contents before adding to a solution.");
    assert.true(beakerControl1.checkForSolutions(), "Checking a solution is added to with water and salt water");
    assert.equal(beaker1.contents.length, 1, "Checking there is one chemical in the beaker after adding to a solution");
    assert.equal(beaker1.getTotalContentsMass(), 150, "Checking the mass of the contents after adding to a solution.");

    beakerControl1.emptyOut();
    beakerControl1.addTo(chemControl4);
    beakerControl1.addTo(chemControl5);
    beakerControl1.addTo(chemControl7);
    assert.equal(beaker1.getTotalContentsMass(), 101, "Checking the mass of the contents before making a solution.");
    assert.equal(beaker1.contents.length, 3, "Checking there are three chemicals in the beaker before making a solution");
    assert.true(beakerControl1.checkForSolutions(), "Checking a solution is made with salt, chlorine, and water");
    assert.equal(beaker1.contents.length, 1, "Checking the beaker has one chemical in the beaker after making a solution");
    assert.equal(beaker1.getTotalContentsMass(), 101, "Checking that the mass of the contents is the same after making a solution.");
    s = beaker1.contents[0];
    assert.equal(s.solute.getID(), COMPOUND_WATER_ID, "Checking that the solute is the water");
    assert.equal(s.solvents.length, 2, "Checking there are two solvents")
    var salt = s.solvents[0];
    var chlorine = s.solvents[1];
    if(chlorine.getID() === COMPOUND_TABLE_SALT_ID){
        let temp = chlorine;
        chlorine = salt;
        salt = temp;
    }
    assert.equal(chlorine.getID(), ELEMENT_CHLORINE_ATOMIC_NUM, "Checking that the solvents include chlorine");
    assert.equal(salt.getID(), COMPOUND_TABLE_SALT_ID, "Checking that the solvents include salt");

});

QUnit.test('removeOverflow:', function(assert){
    beaker1.setCapacity(50);
    var c

    chem1.setVolume(100);
    beaker1.contents = [chem1];
    c = beaker1.getTotalContentsVolume();
    assert.true(Math.abs(c - 100) < DELTA, "Volume in beaker should be 100, was " + c);

    beakerControl1.removeOverflow();
    c = beaker1.getTotalContentsVolume();
    assert.true(Math.abs(c - 50) < DELTA, "After removing overflow, volume in beaker should be 50, was " + c);

    chem1.setVolume(20);
    chem5.setVolume(40);
    beaker1.contents = [chem1, chem5];
    c = beaker1.getTotalContentsVolume();
    assert.true(Math.abs(c - 60) < DELTA, "Volume in beaker should be 60, was " + c);

    beakerControl1.removeOverflow();
    c = beaker1.getTotalContentsVolume();
    assert.true(Math.abs(c - 50) < DELTA,
        "After removing overflow of some chemical with a second one still remaining, volume in beaker should be 50, was " + c);

    chem1.setVolume(40);
    chem5.setVolume(50);
    beaker1.contents = [chem1, chem5];
    c = beaker1.getTotalContentsVolume();
    assert.true(Math.abs(c - 90) < DELTA, "Volume in beaker should be 80, was " + c);

    beakerControl1.removeOverflow();
    c = beaker1.getTotalContentsVolume();
    assert.true(Math.abs(c - 50) < DELTA,
        "After removing all overflow of one chemical and some of a second, volume in beaker should be 50, was " + c);
});

QUnit.test('removeVolume:', function(assert){
    chem4.setVolume(10);
    beaker1.setContents(chem4);
    assert.equal(beaker1.getTotalContentsVolume(), 10, "Checking that the container has the volume of the chemical");

    beakerControl1.removeVolume(4);
    assert.equal(beaker1.getTotalContentsVolume(), 6, "Checking that removing part of one chemical leaves the correct amount behind");

    chem4.setVolume(10);
    chem5.setVolume(5);
    beaker1.setContents([chem4, chem5]);
    assert.equal(beaker1.getTotalContentsVolume(), 15, "Checking that the container has the volume of the chemicals");

    beakerControl1.removeVolume(6);
    assert.equal(beaker1.getTotalContentsVolume(), 9, "Checking that removing all of one chemical and some of another leaves the correct amount behind");
    assert.equal(beaker1.contents.length, 1, "Checking that exactly 1 chemical is left")
});

QUnit.test('emptyOut:', function(assert){
    assert.deepEqual(beakerControl1.emptyOut(), [], "Emptying an empty container should return an empty list");
    assert.true(beaker1.isEmpty(), "Emptying a container should leave it with null contents");

    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.emptyOut(), [chem1], "Emptying a container with chemicals should give the chemicals");
    assert.true(beaker1.isEmpty(), "Emptying a container should leave it with empty contents");
});

QUnit.test('hasSpace:', function(assert){
    chem1.setMass(10);
    container.setCapacity(5);
    assert.false(controller.hasSpace(chem1), "Should not have space");
    assert.true(controller.hasSpace(null), "Should have space");

    chem1.setMass(5);
    assert.true(controller.hasSpace(chem1), "Should have space");

    chem1.setMass(10);
    assert.false(controller.hasSpace(chem1), "Should not have space");

    chem1.setMass(2);
    chem2.setMass(2);
    container.setContents([chem1, chem2]);
    assert.false(controller.hasSpace(chem1), "Should not have space");

    chem1.setMass(5.00000000000000000001);
    controller.emptyOut();
    assert.true(controller.hasSpace(chem1), "Checking chem with a slight overflow has space");
});

QUnit.test('remainingSpace:', function(assert){
    beaker1.setContents(null);
    assert.equal(beakerControl1.remainingSpace(), 100, "With no chemicals, the remaining space should be the capacity of 100");

    chem1.setMass(10);
    beaker1.setContents(chem1);
    assert.equal(beakerControl1.remainingSpace(), 90, "With 10 mass of chemicals, the remaining space should be 90");

    chem1.setMass(10);
    chem2.setMass(20);
    beaker1.setContents([chem1, chem2]);
    assert.equal(beakerControl1.remainingSpace(), 70, "With two chemicals, a total of 30 mass, the remaining space should be 70");
});

QUnit.test('maxPourAmount:', function(assert){
    beakerControl1.setEquipment(null);
    beakerControl2.setEquipment(null);
    chem1.setMass(70);
    chem2.setMass(50);
    assert.equal(beakerControl1.maxPourAmount(null), null, "Null Containers shouldn't pour into each other");

    assert.equal(beakerControl1.maxPourAmount(beakerControl2), null, "Null Containers shouldn't pour into a container");
    beakerControl2.setEquipment(beaker2);
    assert.equal(beakerControl1.maxPourAmount(beakerControl2), null, "Containers with no contents shouldn't pour into a container");

    beakerControl1.setEquipment(beaker1);
    beakerControl2.setEquipment(beaker2);
    beaker1.setContents(null);
    beaker2.setContents(null);
    assert.equal(beakerControl1.maxPourAmount(beakerControl2), null, "Containers with no contents shouldn't pour into a container");

    beaker1.setContents(chem1);
    beaker2.setContents(chem2);
    assert.equal(beakerControl1.maxPourAmount(beakerControl2), 50, "Container should be able to hold 50");

    chem1.setMass(10);
    assert.equal(beakerControl1.maxPourAmount(beakerControl2), 10, "Container should be able to hold 50");
});

QUnit.test('canContain:', function(assert){
    assert.throws(controller.canContain, "A generic ContainerController2D object should throw an error on canContain");
});

QUnit.test('placeSameChemical:', function(assert){
    beakerControl1.emptyOut();
    assert.true(beakerControl1.placeSameChemical(chem1), "Checking that an empty container can hold a new chemical without it being a new chemical");

    beaker1.setContents(chem1);
    assert.true(beakerControl1.placeSameChemical(chem2), "Checking that a container with one chemical can hold a new chemical of the same kind");
    assert.false(beakerControl1.placeSameChemical(chem5), "Checking that a container with one chemical cannot hold a new chemical of a different kind without holding more than one kind of chemical");
});

QUnit.test('reset:', function(assert){
    controller.equipment.setContents(chem1);
    assert.deepEqual(controller.equipment.contents, [chem1], "Before resetting, controller's container should have the set Chemical.");

    controller.reset();
    assert.true(controller.equipment.isEmpty(), "After resetting from one chemical, controller's container should be empty.");

    controller.equipment.setContents([chem1, chem2]);
    assert.deepEqual(controller.equipment.contents, [chem1, chem2], "Before resetting, controller's container should have the set Chemical.");

    controller.reset();
    assert.true(controller.equipment.isEmpty(), "After resetting from two chemicals, controller's container should be empty.");
});

QUnit.test('update:', function(assert){
    controller.update();
    assert.expect(0);
});

QUnit.todo('drawContentsRect:', function(assert){
    assert.true(false);
});