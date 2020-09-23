QUnit.test('ContainerController2D constructor:', function(assert){
    var container = new Container([0, 0], [0, 0], 0, 0, 0, "", null);
    var controller = new ContainerController2D(container);
    assert.equal(controller.equipment, container, "The Controller Equipment should be the given Container")
});

QUnit.todo('ContainerController2D pourOut:', function(assert){
    assert.true(false);
});

QUnit.todo('ContainerController2D addTo:', function(assert){
    assert.true(false);
});

QUnit.test('ContainerController2D canContain:', function(assert){
    var controller = new ContainerController2D(new Container([0, 0], [0, 0], 0, 0, 0, "", null));
    assert.throws(controller.canContain, "A generic ContainerController2D object should throw an error on canContain");
});