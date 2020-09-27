/**
A class which keeps track of the responsible objects for an instruction in an experiment
*/
class Instruction{

    /**
    Create a new instruction for an Experiment, which describes what an actor will do to a receiver
    actor: The ExperimentObject which will act on the receiver
    receiver: The ExperimentObject which will be acted upon by the actor
    action: The function of the actor which will be performed on the receiver,
        the function should take one parameter, which will be the receiver
    */
    constructor(actor, receiver, action){
        this.actor = actor;
        this.receiver = receiver;
        this.action = action;
    }

    /**
    Set the actor used by this Instruction
    actor: The ExperimentObject to set as the actor
    */
    setActor(actor){
        this.actor = actor;
    }

    /**
    Set the receiver used by this Instruction
    receiver: The ExperimentObject to set as the receiver
    */
    setReceiver(receiver){
        this.receiver = receiver;
    }

    /**
    Set the action used by this Instruction
    action: The function of the actor which will be performed on the receiver,
        the function should take one parameter, which will be the receiver
    */
    setAction(action){
        this.action = action;
    }

}