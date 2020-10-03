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