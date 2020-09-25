QUnit.test('ContainerController2D constructor:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 0, 0, "", null);
    var controller = new ContainerController2D(container);
    assert.equal(controller.equipment, container, "The Controller Equipment should be the given Container")
});

QUnit.test('ContainerController2D pourOut:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 0, 0, "", null);
    var controller = new ContainerController2D(container);
    let chem = new Chemical(1.0, "chem", "eq", 20.0, null);
    container.setContents(chem);
    assert.deepEqual(controller.pourOut(), chem, "Chemical poured out should be equal to original contents");
});

QUnit.test('ContainerController2D addTo:', function(assert){
    var container = new Beaker([0, 0], [0, 0], 0, 0, 0, "");
    var controller = new BeakerController2D(container);
    let chem1 = new Chemical(1.0, "chem", "eq", 20.0, [200, 50, 10]);
    let chem2 = new Chemical(1.0, "chem", "eq", 20.0, [4, 4, 4]);
    assert.deepEqual(container.contents, null, "The container should initially be empty");
    controller.addTo(chem1);
    assert.deepEqual(container.contents, chem1, "The container should contain chemical 1");
    controller.addTo(chem2);
    assert.deepEqual(container.contents.texture, [102, 27, 7], "The container should contain a mix of chemical 1 and 2");
});

QUnit.test('ContainerController2D canContain:', function(assert){
    var controller = new ContainerController2D(new Container([0, 0], [0, 0], 0, 0, 0, "", null));
    assert.throws(controller.canContain, "A generic ContainerController2D object should throw an error on canContain");
});