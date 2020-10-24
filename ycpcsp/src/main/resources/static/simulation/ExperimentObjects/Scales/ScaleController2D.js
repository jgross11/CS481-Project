// Constants for identifying which functions have which ids
let ID_FUNC_Scale_Take_Weight = 1;
let ID_FUNC_Scale_Div_Weight = 2;

class ScaleController2D extends EquipmentController2D{

    constructor(Scale){
        super(Scale);
    }

        /**
        Convert the given id to its corresponding function
        id: The id to convert
        returns: The function of the id
        */
    idToFunc(id){
        switch(id){
            case ID_FUNC_Scale_Div_Weight: return this.zeroScaleVisibleWeight;
            case ID_FUNC_Scale_Take_Weight: return this.getWeight;
        }
    }

        /**
        Convert the given function to its corresponding id
        func: The function to convert
        returns: The id of the function
        */

    funcToId(func){
        switch(func){
            case this.getWeight: return ID_FUNC_Scale_Take_Weight;
            case this.zeroScaleVisibleWeight return ID_FUNC_Scale_Div_Weight;
            default: return null;
        }
    }

    hasResidue(){
        let eq = this.equipment;
        if(eq.heldWeight === null) return false;
        //TODO make it so that the only time there is residue if if the thing being weighed is a chemical and not another pieace of equipment
        return eq.residue * capacity >= eq.contents.mass
    }

    checkForMass(){
        let HeldWeight = this.equipments.heldWeight;
        if(HeldWeight !== null && HeldWeight === 0){
            this.removeObject();
            return true;
        }
        return false;
    }



}