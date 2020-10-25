// Constants for identifying which functions have which ids
let ID_FUNC_To_Take_Weight = 1;

class ScaleController2D extends EquipmentController2D{

    constructor(ScaleObject){
        super(ScaleObject);

    }

    /**
     Convert the given id to its corresponding function
     id: The id to convert
     returns: The function of the id
     */
    //TODO ScaleObject(Needs)
    // To either set the object that the scale is weighing or to update the object that the scale is weighing
    setScaleObject(NewObjectTOBeWeighed){
        this.equipment.setObjectToBeWeighed(NewObjectTOBeWeighed);
        this.equipment.DisplayedWeight = this.equipment.ObjectToBeWeighed.equipment.getTotalMass();
        console.log(this.equipment.ObjectToBeWeighed);
    }

    idToFunc(id){
        switch(id){
            case ID_FUNC_To_Take_Weight: return this.setScaleObject;
            default: return null;
        }
    }

    /**
     Convert the given function to its corresponding id
     func: The function to convert
     returns: The id of the function
     */

    funcToId(func){
        switch(func){
            case this.setScaleObject: return ID_FUNC_To_Take_Weight;
            default: return null;
        }
    }

    /**
    Reset this Controller's Scale by resetting the zero value and removing equipment
    */
    reset(){
        this.equipment.setObjectToBeWeighed(null);
        this.equipment.setZeroOut(0);
    }

    /**
    Get a list of all possible functions which this ScaleController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Place Equipment"];
    }

    /**
        The zero out function takes the current weight on the scale
        and stores it into the the zeroOut field in the scale object
        After that it substracts the zerout value from the displayed
        Weight
        Example
        Beaker weight 15.00
        zeroOut()
        zeroout value in the scale object becomes 15.00
        displayed weight which is equal to displayedWeight = Equipment.totalWeight - ZeroutValue
        so becomes displayedWeight = 15.00 - 15.00 = 0
    */
    zeroOut(){
        this.equipment.ZeroOut = ScaleObject.getHeldWeight();
    }

    clearZeroOut(){
        this.equipment.ZeroOut = 0.0;
    }

}