var experiment;

function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();
    experiment.equipment.push(new Beaker([200, 200], 20.0, 50.0, 0.01, "Test Beaker"));
    console.log("good");
}

function draw(){
    background(220);
    experiment.render();
}