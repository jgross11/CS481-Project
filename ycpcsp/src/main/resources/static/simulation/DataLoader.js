let SESSION_EXPERIMENT_NAME = "experimentData";

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
    let exp = new Experiment(rawData.title, rawData.creator);

    // Set the Equipment in the Experiment from the raw data
    exp.setEquipment(parseEquipment(rawData.equipment));

    // Set the Chemicals in the Experiment from the raw data
    exp.setChemicals(parseChemicals(rawData.chemicals));

    // Set the Instructions in the Experiment from the raw data
    exp.setInstructions(parseInstructions(exp.equipment, exp.chemicals, rawData.steps));

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
        var amount = rawEq.amount;
        var id = rawEq.object_ID;

        // Create the appropriate Equipment
        for(var j = 0; j < amount; j++){
            equips.push(idToEquipment(id, nextInstanceID()));
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
        chems.push(idToChemical(rawChem.id, rawChem.mass, rawChem.concentration));
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
        let act = (ins.actor_ID) ? equips[ins.actor_index] : chems[ins.actor_index];
        let rec = (ins.receiver_ID) ? equips[ins.receiver_index] : chems[ins.receiver_index];
        let func = act.idToFunc(ins.function_ID);

        instructions.push(new InstructionController2D(new Instruction(act, rec, func)));
    }
    return instructions;
}

/**
Take an integer ID and convert it to a valid piece of Equipment
id: The integer id
instanceID: The instance ID of the Equipment
returns: The Equipment, or null if an invalid ID is given
*/
function idToEquipment(id, instanceID){
    switch(id){
        // Default beaker
        case ID_EQUIP_BEAKER_TEST: return new BeakerController2D(new Beaker([50, 200], [100, 100], 20.0, 50.0, 0.03, instanceID));
        default: return null;
    }
}

/**
Take an integer ID and convert it to a valid Chemical
id: The integer id
mass: The mass of the Chemical
concentration: The concentration of the Chemical
returns: The Equipment, or null if an invalid ID is given
*/
function idToChemical(id, mass, concentration){
    var chem;
    switch(id){
        // Test chemicals
        case ID_CHEM_TEST_SMALL_RED: chem = new Chemical(5, "R", 20, [255, 0, 0]); break;
        case ID_CHEM_TEST_SMALL_BLUE: chem = new Chemical(5, "B", 20, [0, 0, 255]); break;
        case ID_CHEM_TEST_LARGE_WHITE: chem = new Chemical(20, "W", 20, [255, 255, 255]); break;
        default: return null;
    }
    return new ChemicalController2D(chem);
}

/**
Create a simplified json version of an Experiment
exp): The Experiment to convert
returns: The json object
*/
function experimentToJSON(exp){
    // Get the basic information
    let expJSON = {};
    expJSON.title = exp.title;
    expJSON.creator = exp.creator;

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
        equips.push({
            "object_ID": parseInt(key),
            "amount": equipTypes[key]
        });
    }
    expJSON.equipment = equips;


    // Get the Chemicals
    let chems = [];
    exp.chemicals.forEach(function(chemCont){
        let chem = chemCont.chemical;
        chems.push({
            "id": chem.getID(),
            "mass": chem.mass,
            "concentration": chem.concentration
        });
    });
    expJSON.chemicals = chems;


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

        instructions.push({
            "step_number": index,
            "actor_index": actI,
            "actor_ID": actEquip,
            "receiver_index": recI,
            "receiver_ID": recEquip,
            "function_ID": act.funcToId(action)
        });
    });
    expJSON.steps = instructions;

    return expJSON;
}

/**
Temporary function for getting a test JSON file
*/
function getTestJSON(){
    return {
    	"title": "Color",
        "creator": "Zaq",
        "equipment": [
        	{
        		"object_ID": 1,
        		"amount": 3
        	}
        ],
        "chemicals": [
        	{
        		"id": 1,
        		"mass": 5,
        		"concentration": 1
        	},
        	{
        		"id": 2,
        		"mass": 5,
        		"concentration": 1
        	},
        	{
        		"id": 3,
        		"mass": 20,
        		"concentration": 1
        	}
        ],
        "steps": [
        	{
        		"step_number": 0,
        		"actor_index": 0,
        		"actor_ID": true,
        		"receiver_index": 0,
        		"receiver_ID": false,
        		"function_ID": 2
        	},
        	{
        		"step_number": 1,
        		"actor_index": 1,
        		"actor_ID": true,
        		"receiver_index": 1,
        		"receiver_ID": false,
        		"function_ID": 2
        	},
        	{
        		"step_number": 2,
        		"actor_index": 0,
        		"actor_ID": true,
        		"receiver_index": 1,
        		"receiver_ID": true,
        		"function_ID": 1
        	},
        	{
        		"step_number": 3,
        		"actor_index": 1,
        		"actor_ID": true,
        		"receiver_index": 2,
        		"receiver_ID": true,
        		"function_ID": 1
        	},
        	{
        		"step_number": 4,
        		"actor_index": 2,
        		"actor_ID": true,
        		"receiver_index": 2,
        		"receiver_ID": false,
        		"function_ID": 2
        	}
        ]
    }
}