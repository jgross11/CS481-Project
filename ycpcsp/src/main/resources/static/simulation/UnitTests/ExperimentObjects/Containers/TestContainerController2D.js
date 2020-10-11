QUnit.test('ContainerController2D constructor:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 0, 0, 2, null);
    var controller = new ContainerController2D(container);

    assert.equal(controller.equipment, container, "The Controller Equipment should be the given Container")
});

QUnit.test('ContainerController2D idToFunc:', function(assert){
    var controller = new ContainerController2D(null);

    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_POUR_INTO), controller.pourInto, "Should get the function pourInto");
    assert.equal(controller.idToFunc(ID_FUNC_CONTAINER_ADD_TO), controller.addTo, "Should get the function addTo");
});

QUnit.test('ContainerController2D funcToId:', function(assert){
    var controller = new ContainerController2D(null);

    assert.equal(controller.funcToId(controller.pourInto), ID_FUNC_CONTAINER_POUR_INTO, "Should get the ID for pourInto");
    assert.equal(controller.funcToId(controller.addTo), ID_FUNC_CONTAINER_ADD_TO, "Should get the ID for addTo");
});

QUnit.test('ContainerController2D hasResidue:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 100, 0.1, 0, 2);
    var controller = new BeakerController2D(container);
    let chem = new ChemicalController2D(new Chemical(10.0, "eq", 20.0, null));

    assert.false(controller.hasResidue(), "Should have no residue by default");

    controller.addTo(chem);
    assert.false(controller.hasResidue(), "Should have no residue after adding chemical");

    controller.pourOut();
    assert.false(controller.hasResidue(), "Should have residue after pouring out chemical");
});

QUnit.test('ContainerController2D checkForMass:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 100, 0.1, 0, 2);
    var controller = new BeakerController2D(container);
    let chem = new Chemical(10.0, "eq", 20.0, null);

    assert.false(controller.checkForMass(), "Should not have updated contents");
    chem.setMass(0);
    assert.false(controller.checkForMass(), "Should have updated contents to null");
    assert.equal(container.contents, null, "Contents should be null");
});

QUnit.test('ContainerController2D pourInto:', function(assert){
    var chem1 = new Chemical(30, "", 20, [100, 120, 140]);
    var chem2 = new Chemical(20, "", 20, [10, 20, 40]);
    var chem3 = new Chemical(70, "", 20, [100, 120, 140]);
    var chem4 = new Chemical(50, "", 20, [10, 20, 40]);
    var c1 = new Beaker([0, 0], [0, 0], 1, 100, 0, 5);
    c1.setContents(chem1);
    var c2 = new Beaker([0, 0], [0, 0], 0, 100, 0, 6);
    c2.setContents(chem2);
    var controller1 = new BeakerController2D(null);
    var controller2 = new BeakerController2D(null);

    controller1.pourInto(null);
    assert.deepEqual(controller1.equipment, null, "Container should still be empty");

    controller1.pourInto(controller2);
    assert.deepEqual(controller1.equipment, null, "Container should still be empty");

    controller1.setEquipment(c2);
    controller1.pourInto(null);
    assert.deepEqual(controller1.equipment, c2, "Container should still be empty");

    controller1.setEquipment(c1);
    controller2.setEquipment(c2);
    controller1.pourInto(controller2);
    var cont = controller2.equipment.contents;
    assert.equal(cont.mass, 50, "Container should contain modified chemical with mass 50");
    assert.deepEqual(cont.texture, [64, 80, 100], "Container should contain modified chemical with color [64, 80, 100]");

    chem1.setMass(30);
    chem2.setMass(20);
    c1.setResidue(0.1);
    c1.setContents(chem1);
    c2.setContents(chem2);
    controller1.pourInto(controller2);
    cont = controller2.equipment.contents;
    assert.equal(cont.mass, 47, "Container should contain modified chemical with mass 47 after leaving residue");

    c1.setContents(chem3);
    c2.setContents(chem4);
    c1.setResidue(0);
    controller1.pourInto(controller2);
    assert.equal(controller2.equipment.contents.mass, 100, "Container poured into should be full with mass 50");
    assert.equal(controller1.equipment.contents.mass, 20, "Container poured out should have 20 mass");
});

QUnit.test('ContainerController2D pourOut:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 3, 100, 0.1, 2);
    var controller = new BeakerController2D(container);
    var chem = new Chemical(1.0, "eq", 20.0, null);
    var chemCopy = new Chemical(1.0, "eq", 20.0, null);

    container.setContents(null);
    assert.deepEqual(controller.pourOut(), null, "Chemical should pour null when it has no contents");

    container.setContents(new Chemical(1.0, "eq", 20.0, null));
    controller.pourOut()
    assert.deepEqual(controller.pourOut(), null, "Chemical should pour null when it only has residue");

    container.setContents(chem);
    container.setResidue(0);
    assert.deepEqual(controller.pourOut(), chemCopy, "Chemical poured out, no params, should be equal to original contents");
    assert.equal(container.contents, null, "Container should have no chemical remaining");

    chem = new Chemical(1.0, "eq", 20.0, null);
    chemCopy = new Chemical(1.0, "eq", 20.0, null);
    container.setContents(chem);
    assert.deepEqual(controller.pourOut(-1), chemCopy, "Chemical3 poured out, negative param, should be equal to original contents");
    assert.equal(container.contents, null, "Container should have no chemical remaining");

    chem = new Chemical(1.0, "eq", 20.0, null);
    chemCopy = new Chemical(1.0, "eq", 20.0, null);
    container.setContents(chem);
    assert.deepEqual(controller.pourOut(2), chemCopy, "Chemical poured out, higher than real contents param, should be equal to original contents");
    assert.equal(container.contents, null, "Container should have no chemical remaining");

    chem = new Chemical(1.0, "eq", 20.0, null);
    chemCopy = new Chemical(0.6, "eq", 20.0, null);
    container.setContents(chem);
    assert.deepEqual(controller.pourOut(0.6), chemCopy, "Chemical poured out, part of contents param, should be equal to new contents");
    assert.equal(container.contents.mass, 0.4, "Container should have 0.4 mass remaining");
});

QUnit.test('ContainerController2D addTo:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 0, 100, 0, 2);
    var controller = new BeakerController2D(container);
    let chem1 = new Chemical(1.0, "eq", 20.0, [200, 50, 10]);
    let chem2 = new Chemical(1.0, "eq", 20.0, [4, 4, 4]);
    let chemControl1 = new ChemicalController2D(chem1);
    let chemControl2 = new ChemicalController2D(chem2);

    assert.deepEqual(container.contents, null, "The container should initially be empty");

    controller.addTo(chemControl1);
    assert.deepEqual(container.contents, chem1, "The container should contain chemical 1");

    controller.addTo(chemControl2);
    assert.deepEqual(container.contents.texture, [102, 27, 7], "The container should contain a mix of chemical 1 and 2");
});

QUnit.test('ContainerController2D emptyOut:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 0, 100, 0, 2, null);
    var controller = new BeakerController2D(container);
    var chem = new Chemical(10, "eq", 20.0, [0, 0, 0]);

    assert.equal(controller.emptyOut(), null, "Emptying an empty container should give null");
    assert.equal(container.contents, null, "Emptying a container should leave it with null contents");

    container.setContents(chem);
    assert.equal(controller.emptyOut(), chem, "Emptying a container with chemicals should give the chemicals");
    assert.equal(container.contents, null, "Emptying a container should leave it with null contents");
});

QUnit.test('ContainerController2D hasSpace:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 10, 0, 2, null);
    var controller = new ContainerController2D(container);
    var chem = new Chemical(11, "eq", 20.0, [0, 0, 0]);

    assert.false(controller.hasSpace(chem), "Should not have space");
    assert.true(controller.hasSpace(null), "Should have space");

    chem.setMass(5);
    assert.true(controller.hasSpace(chem), "Should have space");

    chem.setMass(10);
    assert.true(controller.hasSpace(chem), "Should have space");
});

QUnit.test('ContainerController2D remainingSpace:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 0, 100, 0, 2, null);
    var controller = new BeakerController2D(container);
    var chem = new Chemical(10, "eq", 20.0, [0, 0, 0]);

    container.setContents(null);
    assert.equal(controller.remainingSpace(), 100, "With no chemicals, the remaining space should be the capacity of 100");

    container.setContents(chem);
    assert.equal(controller.remainingSpace(), 90, "With 10 mass of chemicals, the remaining space should be 90");
});

QUnit.test('ContainerController2D maxPourAmount:', function(assert){
    var chem1 = new Chemical(70, "", 20, [100, 120, 140]);
    var chem2 = new Chemical(50, "", 20, [10, 20, 40]);
    var c1 = new Beaker([0, 0], [0, 0], 1, 100, 0, 5);
    var c2 = new Beaker([0, 0], [0, 0], 0, 100, 0, 6);
    var controller1 = new BeakerController2D(null);
    var controller2 = new BeakerController2D(null);

    assert.equal(controller1.maxPourAmount(null), null, "Null Containers shouldn't pour into each other");

    assert.equal(controller1.maxPourAmount(controller2), null, "Null Containers shouldn't pour into a container");
    controller2.setEquipment(c2);
    assert.equal(controller1.maxPourAmount(controller2), null, "Containers with no contents shouldn't pour into a container");

    controller1.setEquipment(c1);
    controller2.setEquipment(c2);
    assert.equal(controller1.maxPourAmount(controller2), null, "Containers with no contents shouldn't pour into a container");

    c1.setContents(chem1);
    c2.setContents(chem2);
    assert.equal(controller1.maxPourAmount(controller2), 50, "Container should be able to hold 50");

    chem1.setMass(10);
    assert.equal(controller1.maxPourAmount(controller2), 10, "Container should be able to hold 50");
});

QUnit.test('ContainerController2D canContain:', function(assert){
    var controller = new ContainerController2D(new Container([0, 0], [0, 0], 0, 0, 0, "", null));
    assert.throws(controller.canContain, "A generic ContainerController2D object should throw an error on canContain");
});


QUnit.test('ContainerController2D reset:', function(assert){
    var chem = new Chemical(70, "", 20, [100, 120, 140]);
    var controller = new ContainerController2D(new Container([0, 0], [0, 0], 0, 0, 0, "", null));
    controller.equipment.setContents(chem);

    assert.deepEqual(controller.equipment.contents, chem, "Before resetting, controller's container should have the set Chemical.");

    controller.reset();
    assert.deepEqual(controller.equipment.contents, null, "After resetting, controller's container should have null.");
});
