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

    let experiment = {
        title: "TestName1",
        creator: "Maker"
    }

    postData('simulation-data', experiment).then(function(data){
        console.log("data: "); // TODO
        console.log(data); // TODO
        // successful login - store login info in session
        if(data){
            // store user information in session info
            sessionStorage.setItem("experimentData", data);
        }
        else{
        console.log("failed to load data"); // TODO
        }
    });

}
/*
POSTs an object to a mapping and returns the obtained response
address: the mapping to POST to
objectToPost: the object to be submitted to the backend
returns: the responses' information, in JS, rather than JSON form
*/
async function postData(address, objectToPost){
    return await (await fetch(address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToPost)
    })).json();
}

/**
Given a json object of correct format, generate and return an Experiment object with the corresponding information
rawData: The data to parse
returns: The Experiment object
*/
function parseExperiment(rawData){
    // Create the base Experiment with the title and creator
    let exp = new Experiment(rawData.title, rawData.creator);

    // create a dictionary for Equipment and Chemicals
    let objDict = {};

    // Parse all of the Equipment out of the json
    let rawEquips = rawData.equipment;
    let equips = [];
    for(var i = 0; i < rawEquips.length; i++){
        let rawEq = rawEquips[i];
        let eq = idToEquipment(rawEq.objectID, rawEq.instanceID);
        equips.push(eq);
        objDict[rawEq.instanceID] = eq;
    }
    // Set the Equipment in the Experiment
    exp.setEquipment(equips);


    // Parse all of the Chemicals out of the json
    let rawChems = rawData.chemicals;
    let chems = [];
    let chemDict = {};
    for(var i = 0; i < rawChems.length; i++){
        let rawChem = rawChems[i];
        let chem = idToChemical(rawChem.objectID, rawChem.mass, rawChem.concentration);
        chems.push(chem);
        objDict[rawChem.instanceID] = chem;
    }
    // Set the Chemicals in the Experiment
    exp.setChemicals(chems);


    // Get and sort the instructions by their step order
    let rawIns = rawData.instructions;
    sortByKey(rawIns, "step number");

    // Parse the Instructions in the Experiment
    let instructions = [];
    for(var i = 0; i < rawIns.length; i++){
        let ins = rawIns[i];
        let act = objDict[ins.actorID];
        let rec = objDict[ins.receiverID];
        let func = act.idToFunc(ins.functionID);

        instructions.push(new InstructionController2D(new Instruction(act, rec, func)));
    }
    // Set the Instructions in the Experiment
    exp.setInstructions(instructions);

    // Return the parsed object
    return exp;
}

/**
Helper function for sorting an array
*/
function sortByKey(array, key){
    return array.sort(function(a, b){
        var x = a[key];
        var y = b[key];
        if(x < y) return -1;
        return (x > y) ? 1 : 0;
    });
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
        case ID_CHEM_TEST_SMALL_RED: chem = new Chemical(5, "", 20, [255, 0, 0]); break;
        case ID_CHEM_TEST_SMALL_BLUE: chem = new Chemical(5, "", 20, [0, 0, 255]); break;
        case ID_CHEM_TEST_LARGE_WHITE: chem = new Chemical(20, "", 20, [255, 255, 255]); break;
        default: return null;
    }
    return new ChemicalController2D(chem);
}

/**
Temporary function for getting a test JSON file
*/
function getTestJSON(){
    return {
    	"title": "Color combine lab",
    	"creator": "Zaq",
    	"equipment": [
    		{
    			"objectID": 1,
    			"instanceID": 0
    		},
    		{
    			"objectID": 1,
    			"instanceID": 1
    		},
    		{
    			"objectID": 1,
    			"instanceID": 2
    		}
    	],

    	"chemicals": [
    		{
    			"objectID": 1,
    			"instanceID": 3,
    			"mass": 5,
    			"concentration": 1
    		},
    		{
    			"objectID": 2,
    			"instanceID": 4,
    			"mass": 5,
    			"concentration": 1
    		},
    		{
    			"objectID": 3,
    			"instanceID": 5,
    			"mass": 20,
    			"concentration": 1
    		}
    	],

    	"instructions": [
    		{
    			"step number": 1,
    			"actorID": 1,
    			"receiverID": 4,
    			"functionID": 2
    		},
    		{
    			"step number": 0,
    			"actorID": 0,
    			"receiverID": 3,
    			"functionID": 2
    		},
    		{
    			"step number": 2,
    			"actorID": 0,
    			"receiverID": 1,
    			"functionID": 1
    		},
    		{
    			"step number": 3,
    			"actorID": 1,
    			"receiverID": 2,
    			"functionID": 1
    		},
    		{
    			"step number": 4,
    			"actorID": 2,
    			"receiverID": 5,
    			"functionID": 2
    		}
    	]
    }
}