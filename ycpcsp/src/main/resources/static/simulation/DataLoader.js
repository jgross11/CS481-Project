let SESSION_EXPERIMENT_NAME = "experimentData";

// Constants for the fields of JSON for Experiment parsing to JSON
let EXP_JSON_TITLE = "title";
let EXP_JSON_CREATOR = "creator";
let EXP_JSON_EQUIPMENT = "equipment";
let EXP_JSON_EQUIP_OBJ_ID = "object_ID";
let EXP_JSON_EQUIP_AMOUNT = "amount";
let EXP_JSON_CHEMICALS = "chemicals";
let EXP_JSON_CHEM_ID = "id";
let EXP_JSON_CHEM_MASS = "mass";
let EXP_JSON_CHEM_CONCENTRATION = "concentration";
let EXP_JSON_INSTRUCTIONS = "steps";
let EXP_JSON_INS_STEP_NUM = "step_number";
let EXP_JSON_INS_ACTOR_INDEX = "actor_index";
let EXP_JSON_INS_ACTOR_IS_EQUIP = "actor_ID";
let EXP_JSON_INS_RECEIVER_INDEX = "receiver_index";
let EXP_JSON_INS_RECEIVER_IS_EQUIP = "receiver_ID";
let EXP_JSON_INS_FUNC_ID = "function_ID";

/**
Function to load data from the session storage
*/
// backend communication functions must be async
async function loadSessionData(){
    /*
        this function warrants an explanation
        postData POSTS the user object via JSON to the address 'receiveData-submit'
        this takes some time (obviously), and so when the server responds
        the .then function is called, which executes an async function
        that is given the server response. The data is then de-JSON'd
        (the reason that the async keyword is necessary)
        into a usable format, and then the logic handling
        a good / bad response is executed.
    */
    let experiment = getTestJSON();
    sessionStorage.setItem(SESSION_EXPERIMENT_NAME, JSON.stringify(experiment));


    postData('simulation-data', experiment).then(function(data){
        // successful login - store login info in session
        if(data){
            // store user information in session info
            sessionStorage.setItem(SESSION_EXPERIMENT_NAME, data);
        }
        else{
            console.log("Failed to load experiment data");
        }
    });
}

/**
Given a json object of correct format, generate and return an Experiment object with the corresponding information
rawData: The data to parse
returns: The Experiment object
*/
function parseExperiment(rawData){
    // Create the base Experiment with the title and creator
    let exp = new Experiment(rawData[EXP_JSON_TITLE], rawData[EXP_JSON_CREATOR]);

    // Set the Equipment in the Experiment from the raw data
    exp.setEquipment(parseEquipment(rawData[EXP_JSON_EQUIPMENT]));

    // Set the Chemicals in the Experiment from the raw data
    exp.setChemicals(parseChemicals(rawData[EXP_JSON_CHEMICALS]));

    // Set the Instructions in the Experiment from the raw data
    exp.setInstructions(parseInstructions(exp.equipment, exp.chemicals, rawData[EXP_JSON_INSTRUCTIONS]));

    // Return the parsed object
    return exp;
}

/**
Parse out the Equipment from the given json list of Equipment
rawEquips: The list of Equipment
return: A list of parsed EquipmentController2D objects
*/
function parseEquipment(rawEquips){
    // Parse all of the Equipment out of the json
    let equips = [];
    for(var i = 0; i < rawEquips.length; i++){
        // Get the Equipment
        let rawEq = rawEquips[i];

        // Get the attributes
        var amount = rawEq[EXP_JSON_EQUIP_AMOUNT];
        var id = rawEq[EXP_JSON_EQUIP_OBJ_ID];

        // Create the appropriate Equipment
        for(var j = 0; j < amount; j++){
            equips.push(idToEquipment(id));
        }
    }
    return equips;
}

/**
Parse out the Chemicals from the given json list of Chemicals
rawChems: The list of Chemicals
return: A list of parsed ChemicalController2D objects
*/
function parseChemicals(rawChems){
    // Parse all of the Chemicals out of the json
    let chems = [];
    for(var i = 0; i < rawChems.length; i++){
        let rawChem = rawChems[i];
        chems.push(idToChemical(
            rawChem[EXP_JSON_CHEM_ID],
            rawChem[EXP_JSON_CHEM_MASS],
            rawChem[EXP_JSON_CHEM_CONCENTRATION]
        ));
    }
    return chems;
}

/**
Parse out the Instructions from the given json list of Instructions
rawIns: The list of Instructions
equips: The parsed list of EquipmentController2D objects for the instructions to reference
chems: The parsed list of ChemicalController2D objects for the instructions to reference
return: A list of parsed InstructionController2D objects
*/
function parseInstructions(equips, chems, rawIns){
    // Parse the Instructions in the Experiment
    let instructions = [];
    for(var i = 0; i < rawIns.length; i++){
        let ins = rawIns[i];
        let actI = ins[EXP_JSON_INS_ACTOR_INDEX];
        let recI = ins[EXP_JSON_INS_ACTOR_INDEX];
        let act = (ins[EXP_JSON_INS_ACTOR_IS_EQUIP]) ? equips[actI] : chems[actI];
        let rec = (ins[EXP_JSON_INS_RECEIVER_IS_EQUIP]) ? equips[recI] : chems[recI];
        let func = act.idToFunc(ins[EXP_JSON_INS_FUNC_ID]);

        instructions.push(new InstructionController2D(new Instruction(act, rec, func)));
    }
    return instructions;
}

/**
Create a simplified json version of an Experiment
exp): The Experiment to convert
returns: The json object
*/
function experimentToJSON(exp){
    // Get the basic information
    let expJSON = {};
    expJSON[EXP_JSON_TITLE] = exp.title;
    expJSON[EXP_JSON_CREATOR] = exp.creator;

    // Get the Equipment
    let equips = [];
    let equipTypes = {};
    exp.equipment.forEach(function(eqCont){
        let eq = eqCont.equipment;
        let id = eq.getID();
        if(id in equipTypes) equipTypes[id]++;
        else equipTypes[id] = 1;
    });
    for(var key in equipTypes){
        let newEquip = {};
        newEquip[EXP_JSON_EQUIP_OBJ_ID] = parseInt(key);
        newEquip[EXP_JSON_EQUIP_AMOUNT] = equipTypes[key];
        equips.push(newEquip);
    }
    expJSON[EXP_JSON_EQUIPMENT] = equips;


    // Get the Chemicals
    let chems = [];
    exp.chemicals.forEach(function(chemCont){
        let chem = chemCont.chemical;

        let newChem = {};
        newChem[EXP_JSON_CHEM_ID] = chem.getID();
        newChem[EXP_JSON_CHEM_MASS] = chem.mass;
        newChem[EXP_JSON_CHEM_CONCENTRATION] = chem.concentration;
        chems.push(newChem);
    });
    expJSON[EXP_JSON_CHEMICALS] = chems;


    // Get the Instructions
    let instructions = [];
    exp.instructions.forEach(function(insCont, index){
        let eqs = exp.equipment;
        let chs = exp.chemicals;
        let ins = insCont.instruction;

        let act = ins.actor;
        let actEquip = act instanceof EquipmentController2D;
        let actI = (actEquip) ? eqs.indexOf(act) : chs.indexOf(act);

        let rec = ins.receiver;
        let recEquip = rec instanceof EquipmentController2D;
        let recI = (recEquip) ? eqs.indexOf(rec) : chs.indexOf(rec);

        let action = ins.action;

        let newIns = {};
        newIns[EXP_JSON_INS_STEP_NUM] = index;
        newIns[EXP_JSON_INS_ACTOR_INDEX] = actI;
        newIns[EXP_JSON_INS_ACTOR_IS_EQUIP] = actEquip;
        newIns[EXP_JSON_INS_RECEIVER_INDEX] = recI;
        newIns[EXP_JSON_INS_RECEIVER_IS_EQUIP] = recEquip;
        newIns[EXP_JSON_INS_FUNC_ID] = act.funcToId(action);
        instructions.push(newIns);
    });
    expJSON[EXP_JSON_INSTRUCTIONS] = instructions;

    return expJSON;
}

/**
Temporary function for getting a test JSON file
*/
function getTestJSON(){
    let exp = {};
    exp[EXP_JSON_TITLE] = "Color";
    exp[EXP_JSON_CREATOR] = "Zaq";

    let equips = [];
    let equip = {}
    equip[EXP_JSON_EQUIP_OBJ_ID] = 1;
    equip[EXP_JSON_EQUIP_AMOUNT] = 3;
    equips.push(equip);
    exp[EXP_JSON_EQUIPMENT] = equips;

    let chems = [{}, {}, {}];
    chems[0][EXP_JSON_CHEM_ID] = 1;
    chems[0][EXP_JSON_CHEM_MASS] = 5;
    chems[0][EXP_JSON_CHEM_CONCENTRATION] = 1;
    chems[1][EXP_JSON_CHEM_ID] = 2;
    chems[1][EXP_JSON_CHEM_MASS] = 5;
    chems[1][EXP_JSON_CHEM_CONCENTRATION] = 1;
    chems[2][EXP_JSON_CHEM_ID] = 3;
    chems[2][EXP_JSON_CHEM_MASS] = 20;
    chems[2][EXP_JSON_CHEM_CONCENTRATION] = 1;
    exp[EXP_JSON_CHEMICALS] = chems;

    let steps = [{}, {}, {}, {}, {}];
    steps[0][EXP_JSON_INS_STEP_NUM] = 0;
    steps[0][EXP_JSON_INS_ACTOR_INDEX] = 0;
    steps[0][EXP_JSON_INS_ACTOR_IS_EQUIP] = true;
    steps[0][EXP_JSON_INS_RECEIVER_INDEX] = 0;
    steps[0][EXP_JSON_INS_RECEIVER_IS_EQUIP] = false;
    steps[0][EXP_JSON_INS_FUNC_ID] = 2;
    steps[1][EXP_JSON_INS_STEP_NUM] = 1;
    steps[1][EXP_JSON_INS_ACTOR_INDEX] = 1;
    steps[1][EXP_JSON_INS_ACTOR_IS_EQUIP] = true;
    steps[1][EXP_JSON_INS_RECEIVER_INDEX] = 1;
    steps[1][EXP_JSON_INS_RECEIVER_IS_EQUIP] = false;
    steps[1][EXP_JSON_INS_FUNC_ID] = 2;
    steps[2][EXP_JSON_INS_STEP_NUM] = 2;
    steps[2][EXP_JSON_INS_ACTOR_INDEX] = 0;
    steps[2][EXP_JSON_INS_ACTOR_IS_EQUIP] = true;
    steps[2][EXP_JSON_INS_RECEIVER_INDEX] = 1;
    steps[2][EXP_JSON_INS_RECEIVER_IS_EQUIP] = true;
    steps[2][EXP_JSON_INS_FUNC_ID] = 1;
    steps[3][EXP_JSON_INS_STEP_NUM] = 3;
    steps[3][EXP_JSON_INS_ACTOR_INDEX] = 1;
    steps[3][EXP_JSON_INS_ACTOR_IS_EQUIP] = true;
    steps[3][EXP_JSON_INS_RECEIVER_INDEX] = 2;
    steps[3][EXP_JSON_INS_RECEIVER_IS_EQUIP] = true;
    steps[3][EXP_JSON_INS_FUNC_ID] = 1;
    steps[4][EXP_JSON_INS_STEP_NUM] = 4;
    steps[4][EXP_JSON_INS_ACTOR_INDEX] = 2;
    steps[4][EXP_JSON_INS_ACTOR_IS_EQUIP] = true;
    steps[4][EXP_JSON_INS_RECEIVER_INDEX] = 2;
    steps[4][EXP_JSON_INS_RECEIVER_IS_EQUIP] = false;
    steps[4][EXP_JSON_INS_FUNC_ID] = 2;
    exp[EXP_JSON_INSTRUCTIONS] = steps;

    return exp;
}