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
var chemControl1;
var chemControl2;

QUnit.module("ContainerController2D", {
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

        chem1 = new Chemical(30, "", 20, [100, 120, 140]);
        chem2 = new Chemical(20, "", 20, [10, 20, 40]);
        chem3 = new Chemical(70, "", 20, [100, 120, 140]);
        chem4 = new Chemical(50, "", 20, [10, 20, 40]);
        chemControl1 = new ChemicalController2D(chem1);
        chemControl2 = new ChemicalController2D(chem2);
    }
});

QUnit.test('constructor:', function(assert){
    assert.equal(controller.equipment, container, "The Controller Equipment should be the given Container")
});

QUnit.test('idToFunc:', function(assert){
    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_POUR_INTO), controller.pourInto, "Should get the function pourInto");
    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_ADD_TO), controller.addTo, "Should get the function addTo");
});

QUnit.test('funcToId:', function(assert){
    assert.equal(controller.funcToId(controller.pourInto), ID_FUNC_CONTAINER_POUR_INTO, "Should get the ID for pourInto");
    assert.equal(controller.funcToId(controller.addTo), ID_FUNC_CONTAINER_ADD_TO, "Should get the ID for addTo");
});

QUnit.test('hasResidue:', function(assert){
    beaker1.setResidue(0.1);
    assert.false(beakerControl1.hasResidue(), "Should have no residue by default");

    beaker1.setContents(chemControl1.copyChem());
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
    beaker1.setContents([chemControl1.copyChem(), chemControl2.copyChem()]);
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

    beakerControl1.pourInto(null);
    assert.deepEqual(beakerControl1.equipment, null, "Container should still be empty");

    beakerControl1.pourInto(beakerControl2);
    assert.deepEqual(beakerControl1.equipment, null, "Container should still be empty");

    beakerControl1.setEquipment(beaker2);
    beakerControl1.pourInto(null);
    assert.deepEqual(beakerControl1.equipment, beaker2, "Container should still be empty");

    beakerControl1.setEquipment(beaker1);
    beakerControl2.setEquipment(beaker2);
    beakerControl1.pourInto(beakerControl2);
    var cont = beakerControl2.equipment.contents;
    assert.equal(cont[0].mass, 50, "Container should contain modified chemical with mass 50");
    assert.deepEqual(cont[0].texture, [64, 80, 100], "Container should contain modified chemical with color [64, 80, 100]");

    chem1.setMass(30);
    chem2.setMass(20);
    beaker1.setResidue(0.1);
    beaker1.setContents(chem1);
    beaker2.setContents(chem2);
    beakerControl1.pourInto(beakerControl2);
    cont = beakerControl2.equipment.contents;
    assert.equal(cont[0].mass, 47, "Container should contain modified chemical with mass 47 after leaving residue");

    beaker1.setContents(chem3);
    beaker2.setContents(chem4);
    beaker1.setResidue(0);
    beakerControl1.pourInto(beakerControl2);
    assert.equal(beakerControl2.equipment.contents[0].mass, 100, "Container poured into should be full with mass 50");
    assert.equal(beakerControl1.equipment.contents[0].mass, 20, "Container poured out should have 20 mass");

    chem1.setMass(5);
    chem2.setMass(10);
    beaker1.setResidue(0);
    beaker1.setContents([chem1, chem2]);
    beaker2.setContents(null);
    beakerControl1.pourInto(beakerControl2);
    assert.deepEqual(beaker2.getTotalContentsMass(), 15, "Beaker1 should have poured 15 units of chemical into beaker2");

    chem1.setMass(5);
    chem2.setMass(10);
    beaker1.setContents([chem1, chem2]);
    beaker2.setContents(null);
    beaker2.setCapacity(15);
    beakerControl1.pourInto(beakerControl2);
    assert.deepEqual(beaker2.getTotalContentsMass(), 15, "Beaker1 should have poured all 15 units of chemical into beaker2");

    chem1.setMass(5);
    chem2.setMass(10);
    beaker1.setContents([chem1, chem2]);
    beaker2.setContents(null);
    beaker2.setCapacity(12);
    beakerControl1.pourInto(beakerControl2);
    assert.deepEqual(beaker2.getTotalContentsMass(), 12, "Beaker1 should have poured 12 units of chemical into beaker2");
});

QUnit.test('pourOut:', function(assert){
    beaker1.setResidue(0.1);
    chem1.setMass(1);
    var chemCopy = chemControl1.copyChem();

    beaker1.setContents(null);
    assert.deepEqual(beakerControl1.pourOut(), [], "Beaker should pour nothing when it has no contents");

    beaker1.setContents(chemCopy);
    beakerControl1.pourOut()
    assert.true(beakerControl1.hasResidue(), "Beaker should have residue after pouring out");
    assert.deepEqual(beakerControl1.pourOut(), [], "Beaker should pour nothing when it only has residue");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    beaker1.setContents(chemCopy);
    beaker1.setResidue(0);
    assert.deepEqual(beakerControl1.pourOut(), [chem1], "Chemical poured out, no params, should be equal to original contents");
    assert.true(beaker1.isEmpty(), "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.pourOut(-1), [chemCopy], "Chemical poured out, negative param, should be equal to original contents");
    assert.true(beaker1.isEmpty(), "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    beaker1.setContents(chemCopy);
    assert.deepEqual(beakerControl1.pourOut(2), [chem1], "Chemical poured out, higher than real contents param, should be equal to original contents");
    assert.true(beaker1.isEmpty(), "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    chemCopy.setMass(0.6)
    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.pourOut(0.6), [chemCopy], "Chemical poured out, part of contents param, should be equal to new contents");
    assert.equal(beaker1.contents[0].mass, 0.4, "Container should have 0.4 mass remaining");

    beaker1.setContents([chemControl1.copyChem(), chemControl2.copyChem()]);
    assert.deepEqual(beaker1.contents, [chem1, chem2], "Should correctly set contents to the two given chemicals");

    assert.deepEqual(beakerControl1.pourOut(), [chem1, chem2], "Should get two chemicals after pouring them out");
    assert.true(beaker1.isEmpty(), "Beaker should be left with no contents")
});

QUnit.test('addTo:', function(assert){
    chem1.setMass(1);
    chem2.setMass(1);
    assert.true(beaker1.isEmpty(), "The container should initially be empty");

    beakerControl1.addTo(chemControl1);
    assert.deepEqual(beaker1.contents, [chem1], "The container should contain chemical 1");

    beakerControl1.addTo(chemControl2);
    assert.deepEqual(beaker1.contents[0].texture, [55, 70, 90], "The container should contain a mix of chemical 1 and 2");
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