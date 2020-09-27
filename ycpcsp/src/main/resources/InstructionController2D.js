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
    Set the current instruction for this Controller
    instruction: the Instruction to use for this Controller
    */
    setInstruction(instruction){
        this.instruction = instruction;
    }

    /**
    Cause the actor of the Instruction of this Controller to perform its action on the receiver
    */
    activate(){
        let ins = this.instruction;
        let rec = ins.receiver;
        let act = ins.actor;

        var func = ins.action.bind(act, rec);
        func();
    }

}