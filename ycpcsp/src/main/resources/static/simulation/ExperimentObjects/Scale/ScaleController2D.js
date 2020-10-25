// Constants for identifying which functions have which ids
let ID_FUNC_To_Take_Weight = 0;

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
        this.ScaleObject.ObjectToBeWeighed = NewObjectTOBeWeighed;
        this.ScaleObject.DisplayedWeight = this.ScaleObject.ObjectToBeWeighed.getTotalMass();
    }
    idToFunc(id){
        switch(id){
            case ID_FUNC_To_Take_Weight: return this.updateMass;
            case ID_FUNC_Zero_Out_Value: return this.zeroOut;
        }
    }

    /**
     Convert the given function to its corresponding id
     func: The function to convert
     returns: The id of the function
     */

    funcToId(func){
        switch(func){
            case this.updateMass(): return ID_FUNC_To_Take_Weight;
            case this.zeroOut: return  ID_FUNC_Zero_Out_Value;
            default: return null;
        }
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
        ScaleObject.ZeroOut = ScaleObject.getHeldWeight();
    }

    clearZeroOut(){
        ScaleObject.ZeroOut = 0.0;
    }

}