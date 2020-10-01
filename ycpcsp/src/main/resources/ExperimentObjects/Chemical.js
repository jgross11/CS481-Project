/**
A class that keeps track of a single Chemical. This can be a single element, or a compound.
*/
class Chemical extends ExperimentObject{

    /**
    Create a new Chemical with the given information
    mass: A floating point value, the amount of mass in this Chemical, in grams
    equation: A string, the equation for the components of this Chemical
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    texture: Either a list of rgb colors [red, green, blue] representing the color of this Chemical
                or an image file representing the texture of this Chemical
    concentration: A floating point value in the range [0, 1] of the concentration of the chemical, default: 1
    */
    constructor(mass, equation, temperature, texture, concentration = 1){
        super(mass);
        this.equation = equation;
        this.temperature = temperature;
        this.texture = texture;
        this.concentration = concentration;

        // The current state of matter for this Chemical, based on temperature
        this.matterState = null;

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
    Set the temperature of this Chemical, this also automatically updates the state of matter
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    */
    setTemperature(temperature){
        this.temperature = temperature;
        var control = new ChemicalController2D(this);
        control.calculateMoles();
    }

    /**
    Set the texture to use for rendering this Chemical
    texture: Either a list of rgb colors [red, green, blue] representing the color of this Chemical
                or an image file representing the texture of this Chemical
    */
    setTexture(texture){
        this.texture = texture;
    }

    /**
    Set the concentration of this Chemical
    concentration: A floating point value, the concentration, in the range [0, 1]
        If not in that range, it will be placed in the range
    */
    setConcentration(concentration){
        if(concentration > 1) concentration = 1;
        else if(concentration < 0) concentration = 0;
        this.concentration = concentration;
    }

}