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
    assert.false(beakerControl1.hasResidue(), "Should have no residue by default");

    beakerControl1.addTo(chemControl1);
    assert.false(beakerControl1.hasResidue(), "Should have no residue after adding chemical");

    beakerControl1.pourOut();
    assert.true(beakerControl1.hasResidue(), "Should have residue after pouring out chemical");
});

QUnit.test('checkForMass:', function(assert){
    assert.false(beakerControl1.checkForMass(), "Should not have updated contents");
    chem1.setMass(0);
    assert.false(beakerControl1.checkForMass(), "Should have updated contents to null");
    assert.equal(beaker1.contents, null, "Contents should be null");
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
    assert.equal(cont.mass, 50, "Container should contain modified chemical with mass 50");
    assert.deepEqual(cont.texture, [64, 80, 100], "Container should contain modified chemical with color [64, 80, 100]");

    chem1.setMass(30);
    chem2.setMass(20);
    beaker1.setResidue(0.1);
    beaker1.setContents(chem1);
    beaker2.setContents(chem2);
    beakerControl1.pourInto(beakerControl2);
    cont = beakerControl2.equipment.contents;
    assert.equal(cont.mass, 47, "Container should contain modified chemical with mass 47 after leaving residue");

    beaker1.setContents(chem3);
    beaker2.setContents(chem4);
    beaker1.setResidue(0);
    beakerControl1.pourInto(beakerControl2);
    assert.equal(beakerControl2.equipment.contents.mass, 100, "Container poured into should be full with mass 50");
    assert.equal(beakerControl1.equipment.contents.mass, 20, "Container poured out should have 20 mass");
});

QUnit.test('pourOut:', function(assert){
    chem1.setMass(1);
    var chemCopy = chemControl1.copyChem();

    beaker1.setContents(null);
    assert.deepEqual(beakerControl1.pourOut(), null, "Chemical should pour null when it has no contents");

    beaker1.setContents(chemCopy);
    beakerControl1.pourOut()
    assert.deepEqual(beakerControl1.pourOut(), null, "Chemical should pour null when it only has residue");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    beaker1.setContents(chemCopy);
    beaker1.setResidue(0);
    assert.deepEqual(beakerControl1.pourOut(), chem1, "Chemical poured out, no params, should be equal to original contents");
    assert.equal(beaker1.contents, null, "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.pourOut(-1), chemCopy, "Chemical poured out, negative param, should be equal to original contents");
    assert.equal(beaker1.contents, null, "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    beaker1.setContents(chemCopy);
    assert.deepEqual(beakerControl1.pourOut(2), chem1, "Chemical poured out, higher than real contents param, should be equal to original contents");
    assert.equal(beaker1.contents, null, "Container should have no chemical remaining");

    chem1.setMass(1);
    chemCopy = chemControl1.copyChem();
    chemCopy.setMass(0.6)
    beaker1.setContents(chem1);
    assert.deepEqual(beakerControl1.pourOut(0.6), chemCopy, "Chemical poured out, part of contents param, should be equal to new contents");
    assert.equal(beaker1.contents.mass, 0.4, "Container should have 0.4 mass remaining");
});

QUnit.test('addTo:', function(assert){
    chem1.setMass(1);
    chem2.setMass(1);
    assert.deepEqual(beaker.contents, null, "The container should initially be empty");

    beakerControl1.addTo(chemControl1);
    assert.deepEqual(beaker1.contents, chem1, "The container should contain chemical 1");

    beakerControl1.addTo(chemControl2);
    assert.deepEqual(beaker1.contents.texture, [55, 70, 90], "The container should contain a mix of chemical 1 and 2");
});

QUnit.test('emptyOut:', function(assert){
    assert.equal(beakerControl1.emptyOut(), null, "Emptying an empty container should give null");
    assert.equal(beaker1.contents, null, "Emptying a container should leave it with null contents");

    beaker1.setContents(chem1);
    assert.equal(beakerControl1.emptyOut(), chem1, "Emptying a container with chemicals should give the chemicals");
    assert.equal(beaker1.contents, null, "Emptying a container should leave it with null contents");
});

QUnit.test('hasSpace:', function(assert){
    assert.false(controller.hasSpace(chem1), "Should not have space");
    assert.true(controller.hasSpace(null), "Should have space");

    chem1.setMass(5);
    assert.true(controller.hasSpace(chem1), "Should have space");

    chem1.setMass(10);
    assert.false(controller.hasSpace(chem1), "Should have space");
});

QUnit.test('remainingSpace:', function(assert){
    beaker1.setContents(null);
    assert.equal(beakerControl1.remainingSpace(), 100, "With no chemicals, the remaining space should be the capacity of 100");

    chem.setMass(10);
    beaker1.setContents(chem);
    assert.equal(beakerControl1.remainingSpace(), 90, "With 10 mass of chemicals, the remaining space should be 90");
});

QUnit.test('maxPourAmount:', function(assert){
    chem1.setMass(70);
    chem2.setMass(50);
    assert.equal(beakerControl1.maxPourAmount(null), null, "Null Containers shouldn't pour into each other");

    assert.equal(beakerControl1.maxPourAmount(beakerControl2), null, "Null Containers shouldn't pour into a container");
    beakerControl2.setEquipment(beaker2);
    assert.equal(beakerControl1.maxPourAmount(beakerControl2), null, "Containers with no contents shouldn't pour into a container");

    beakerControl1.setEquipment(beaker1);
    beakerControl2.setEquipment(beaker2);
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
    controller.equipment.setContents(chem);

    assert.deepEqual(controller.equipment.contents, chem, "Before resetting, controller's container should have the set Chemical.");

    controller.reset();
    assert.deepEqual(controller.equipment.contents, null, "After resetting, controller's container should have null.");
});

QUnit.test('update:', function(assert){
    controller.update();
    assert.expect(0);
});