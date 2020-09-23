/**
A class for handling controlling a Beaker in a 2D environment
*/
class BeakerController2D extends ContainerController2D{
    /**
    Create a new BeakerController to control the given Beaker
    beaker: The Beaker which this controller will control
    */
    constructor(beaker){
        super(beaker);
    }

    canContain(chemical){
        return true;
    }

}