/**
A class that keeps track of a single Chemical. This can be a single element, or a compound
*/
class Chemical extends ExperimentObject{

    /**
    Create a new Chemical with the given information
    mass: A floating point value, the amount of mass in this Chemical, in grams
    instanceID: A unique integer specifying this Chemical
    equation: A string, the equation for the components of this Chemical
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    texture: Either a list of rgb colors [red, green, blue] representing the color of this chemical
                or an image file representing the texture of this chemical
    */
    constructor(mass, instanceID, equation, temperature, texture){
        super(mass, instanceID);
        this.equation = equation;
        this.temperature = temperature;
        // The current state of matter for this Chemical, based on temperature
        this.matterState = null;
        this.texture = texture;

        var controller = new ChemicalController2D(this);
        controller.calculateMoles();
    }

    /**
    Set the equation of this Chemical
    equation: A string, the equation for the components of this Chemical
    */
    setEquation(equation){
        this.equation = equation;
    }

    /**
    Set the temperature of this chemical, this also automatically updates the state of matter
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    */
    setTemperature(temperature){
        this.temperature = temperature;
        var control = new ChemicalController2D(this);
        control.calculateMoles();
    }

    /**
    Set the texture to use for rendering this Chemical
    texture: Either a list of rgb colors [red, green, blue] representing the color of this chemical
                or an image file representing the texture of this chemical
    */
    setTexture(texture){
        this.texture = texture;
    }

}