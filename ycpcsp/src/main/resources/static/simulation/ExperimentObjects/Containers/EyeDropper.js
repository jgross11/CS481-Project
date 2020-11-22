/**
An eye dropped used to transfer small amounts of liquid
*/
class EyeDropper extends Container{

    constructor(){
        super([0, 0], [20, 90], 0.5, 1, 0.1, SPRITE_EYE_DROPPER);
    }

    /**
    Get the ID representing an EyeDropper
    */
    getID(){
        return ID_EQUIP_EYE_DROPPER;
    }
}

// Constants for identifying which functions have which ids
let ID_FUNC_EYE_DROPPER_DROP = 4;

// Constant for the base size of a drop of a liquid
EYE_DROPPER_DROP_SIZE = 0.04;
// Constant for the additional size a drop can be, anywhere from 0% to 100% of this number
EYE_DROPPER_DROP_SIZE_RANDOM = 0.02;

/**
A class for handling controlling an EyeDropper in a 2D environment
*/
class EyeDropperController2D extends ContainerController2D{

    /**
    Create a new EyeDropperController to control the given EyeDropper
    eyeDropper: The EyeDropper to control
    */
    constructor(eyeDropper){
        super(eyeDropper);
    }

    /**
    Convert the given id to its corresponding function
    id: The id to convert
    returns: The function of the id
    */
    idToFunc(id){
        let f = super.idToFunc(id);
        if(f !== null) return f;

        switch(id){
            case ID_FUNC_EYE_DROPPER_DROP: return this.drop;
            default: return null;
        }
    }

    /**
    Convert the given function to its corresponding id
    func: The function to convert
    returns: The id of the function
    */
    funcToId(func){
        let id = super.idToFunc(func);
        if(id !== null) return id;

        switch(func){
            case this.drop: return ID_FUNC_EYE_DROPPER_DROP;
            default: return null;
        }
    }

    /**
    Get a list of all possible functions which this EyeDropperController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        let disc = super.getFuncDescriptions();
        disc.push("Drop");
        return disc;
    }

    /**
    Place one drop of this Controller's EyeDropper into the given container
    contControl: The ContainerController2D which the EyeDropper will drop into
    returns: true if the drop could be placed, false otherwise
    */
    drop(contControl){
        // Get one drop from the EyeDropper with some randomness
        let chems = this.pourOut(EYE_DROPPER_DROP_SIZE + EYE_DROPPER_DROP_SIZE_RANDOM * Math.random());

        // If no chemicals could be obtained, return false
        if(chems.length === 0) return false;

        // The one drop should be only one chemical, add that to the given ContainerController
        contControl.addTo(new ChemicalController2D(chems[0]));
    }

    /**
    Determine if this Controller's EyeDropper can contain the given Chemical.
    Eye droppers can only hold liquids
    chemical: The Chemical to test if it can be contained
    returns: true if the Chemical can be contained, false otherwise
    */
    canContain(chemical){
        // If the chemical is not a liquid, return false
        if(chemical.getMatterState() !== MATTER_STATE_LIQUID) return false;

        // Check to see the chemical is the same as the one in the EyeDropper, or if it is empty
        return this.placeSameChemical(chemical);
    }

    /**
    Draw this Controller's EyeDropper along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the chemicals
        this.drawContentsRect(graphics, EYE_DROPPER_X_OFFSET, EYE_DROPPER_Y_OFFSET,
            EYE_DROPPER_WIDTH_OFFSET, EYE_DROPPER_HEIGHT_OFFSET);

        // Draw the base EyeDropper sprite
        super.draw(graphics);
    }

}
