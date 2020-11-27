class Listener{

    /**
    Create a new Listener with the given object to be used with the listener
    equipment: The object which this Listener will interact with
    func: The function to call
    */
    constructor(obj, func){
        this.obj = obj;
        this.func = func;
    }

    /**
    Run the function of this Listener
    */
    call(){
        this.func(this.obj);
    }

}