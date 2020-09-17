var experiment;

function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();
    var b = new Beaker([200, 200], 20.0, 50.0, 0.01, "Test Beaker");
    experiment.equipment.push(b);
    b.setMass(10);
    b.setMass(-10);
    b.setMass(10);
    b.setMass(0);
    b.setMass(0.1);
}

function draw(){
    background(220);
    experiment.render();
}