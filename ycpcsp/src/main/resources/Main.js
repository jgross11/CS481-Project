var experiment;

function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();

    experiment.equipment.push(new Beaker([400, 200], [200, 200], 20.0, 50.0, 0.01, "Test Beaker 1"));
    experiment.equipment.push(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, "Test Beaker 2"));
}

function draw(){
    background(220);
    experiment.render();
}