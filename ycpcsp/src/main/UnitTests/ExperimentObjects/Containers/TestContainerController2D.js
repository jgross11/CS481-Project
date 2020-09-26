QUnit.test('ContainerController2D constructor:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 0, 0, "", null);
    var controller = new ContainerController2D(container);
    assert.equal(controller.equipment, container, "The Controller Equipment should be the given Container")
});

QUnit.test('ContainerController2D pourOut:', function(assert){
    var chem1 = new Chemical(30, "", "", 20, [100, 120, 140]);
    var chem2 = new Chemical(20, "", "", 20, [10, 20, 40]);
    var c1 = new Container([0, 0], [0, 0], 1, 100, 0, "", null);
    c1.setContents(chem1);
    var c2 = new Container([0, 0], [0, 0], 0, 100, 0, "", null);
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
    let cont = controller2.equipment.contents;
    assert.equal(cont.mass, 50, "Container should contain modified chemical with mass 50");
    assert.deepEqual(cont.texture, [64, 80, 100], "Container should contain modified chemical with color [64, 80, 100]");
});

QUnit.test('ContainerController2D pourOut:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 0, 0, "", null);
    var controller = new ContainerController2D(container);
    let chem = new Chemical(1.0, "chem", "eq", 20.0, null);
    container.setContents(chem);
    assert.deepEqual(controller.pourOut(), chem, "Chemical poured out should be equal to original contents");
});

QUnit.test('ContainerController2D addTo:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 0, 100, 0, "");
    var controller = new BeakerController2D(container);
    let chem1 = new Chemical(1.0, "chem", "eq", 20.0, [200, 50, 10]);
    let chem2 = new Chemical(1.0, "chem", "eq", 20.0, [4, 4, 4]);
    assert.deepEqual(container.contents, null, "The container should initially be empty");
    controller.addTo(chem1);
    assert.deepEqual(container.contents, chem1, "The container should contain chemical 1");
    controller.addTo(chem2);
    assert.deepEqual(container.contents.texture, [102, 27, 7], "The container should contain a mix of chemical 1 and 2");
});

QUnit.test('ContainerController2D hasSpace:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 10, 0, "", null);
    var controller = new ContainerController2D(container);
    var chem = new Chemical(11, "chem", "eq", 20.0, [0, 0, 0]);
    assert.false(controller.hasSpace(chem), "Should not have space");
    assert.true(controller.hasSpace(null), "Should have space");
    chem.setMass(5);
    assert.true(controller.hasSpace(chem), "Should have space");
    chem.setMass(10);
    assert.true(controller.hasSpace(chem), "Should have space");
});

QUnit.test('ContainerController2D canContain:', function(assert){
    var controller = new ContainerController2D(new Container([0, 0], [0, 0], 0, 0, 0, "", null));
    assert.throws(controller.canContain, "A generic ContainerController2D object should throw an error on canContain");
});