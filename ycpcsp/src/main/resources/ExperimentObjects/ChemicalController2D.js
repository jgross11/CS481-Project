/**
A class used to perform operations on chemicals in the context of a 2D environment
*/
class ChemicalController2D{

    /**
    Create a new Controller with the given chemical
    chemical: The chemical which this Controller will control
    */
    constructor(chemical){
        this.chemical = chemical;
    }

    /**
    Determine the number of moles of the chemical in this controller
    returns: A floating point value, the number of moles
    */
    calculateMoles(){
        // TODO implement
        return 0;
    }

    /**
    Determine the state of matter of the chemical of this Controller.
    The result is stored in the matterState field in the chemical
    */
    calculateMatterState(){
        // TODO implement
    }

    draw(){
        super.draw();
        console.log("draw container");
    }

}