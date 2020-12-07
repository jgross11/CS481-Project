/**
A class which keeps track of the responsible objects for an instruction in an experiment
*/
class Instruction{

    /**
    Create a new Instruction for an Experiment, which describes what an actor will do to a receiver
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


/**
A class that handles using an Instruction
*/
class InstructionController2D{

    /**
    Create a Controller to handle an Instruction
    instruction: the Instruction to use for this Controller
    */
    constructor(instruction){
        this.instruction = instruction;
    }

    /**
    Set this Controller's Instruction
    instruction: the Instruction to use for this Controller
    */
    setInstruction(instruction){
        this.instruction = instruction;
    }

    /**
    Cause the actor of this Controller's Instruction to perform its action on the receiver
    */
    activate(){
        let ins = this.instruction;
        let rec = ins.receiver;
        let act = ins.actor;

        ins.action.bind(act, rec)();
    }

}