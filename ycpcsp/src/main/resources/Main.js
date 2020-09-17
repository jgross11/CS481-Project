var experiment;

function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();
    var b = new Beaker([200, 200], 20.0, 50.0, 0.01, "Test Beaker");
    experiment.equipment.push(b);
}

function draw(){
    background(220);
    experiment.render();
}