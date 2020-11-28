let SESSION_EXPERIMENT_NAME = "experimentData";

// Constants for the fields of JSON for Experiment parsing to JSON
let EXP_JSON_TITLE = "title";
let EXP_JSON_CREATOR = "creatorName";

let EXP_JSON_EQUIPMENT = "equipment";
    let EXP_JSON_EQUIP_OBJ_ID = "objectID";
    let EXP_JSON_EQUIP_AMOUNT = "amount";

let EXP_JSON_CHEMICALS = "chemicals";
    let EXP_JSON_CHEM_ID = "id";
    let EXP_JSON_CHEM_MASS = "mass";
    let EXP_JSON_CHEM_CONCENTRATION = "concentration";

let EXP_JSON_INSTRUCTIONS = "steps";
    let EXP_JSON_INS_STEP_NUM = "stepNumber";
    let EXP_JSON_INS_ACTOR_INDEX = "actorIndex";
    let EXP_JSON_INS_ACTOR_IS_EQUIP = "isActorEquipment";
    let EXP_JSON_INS_RECEIVER_INDEX = "receiverIndex";
    let EXP_JSON_INS_RECEIVER_IS_EQUIP = "isReceiverEquipment";
    let EXP_JSON_INS_FUNC_ID = "functionID";

let EXP_JSON_CHEM_PROPERTIES = "chemicalProperties";
    let CHEMICAL_PROPERTY_SYMBOL = "formula";
    let CHEMICAL_PROPERTY_NAME = "name";
    let CHEMICAL_PROPERTY_CREATOR = "creatorID";
    let CHEMICAL_PROPERTY_COLOR_SOLID = "colorSolid";
    let CHEMICAL_PROPERTY_COLOR_LIQUID = "colorLiquid";
    let CHEMICAL_PROPERTY_COLOR_GAS = "colorGas";
    let CHEMICAL_PROPERTY_ID = "chemicalInformationID";
    let CHEMICAL_PROPERTY_MOLAR_MASS = "molarMass";
    let CHEMICAL_PROPERTY_MELTING_POINT = "meltingPoint";
    let CHEMICAL_PROPERTY_BOILING_POINT = "boilingPoint";
    let CHEMICAL_PROPERTY_DENSITY = "density";
    let CHEMICAL_PROPERTY_WATER_SOLUBLE = "isWaterSoluble";

let EXP_JSON_EQUATIONS = "equations";
    let EQUATION_PROPERTY_REACTANTS = "reactants";
    let EQUATION_PROPERTY_PRODUCTS = "products";
        let EQUATION_COMPONENT_PROPERTY_COEFFICIENT = "coefficient";
        let EQUATION_COMPONENT_PROPERTY_ID = "chemicalID";
    let EQUATION_PROPERTY_ID = "equationID";
    let EQUATION_PROPERTY_CREATOR = "creatorID";

function submitTestExperimentToBackend(){
    let testJSON = getTestJSON();
    console.log("test JSON: ");
    console.log(testJSON);
    let user = JSON.parse(sessionStorage.getItem("user"));
    // TODO CHECK IF USER EXISTS, NOTIFY THAT SIGNUP MUST HAPPEN BEFORE EXP CAN BE SAVED
    let userAndExperiment = {
        user: user,
        experiment: testJSON
    };
    postData("save-new-simulation", userAndExperiment).then(function(response){
        console.log("received following response upon submitting experiment: ");
        console.log(response);
    });
}

function loadSessionData(){
    // ##################
    // ##################
    // ################## THE FOLLOWING CONTAINS LOGIC TO LOAD EXPERIMENT FROM BACKEND GIVEN ID
    // ################## OR HANDLE (not done currently) NEW EXPERIMENT LOADING / NO EXPERIMENT ID FOUND
    // ##################
    // ##################

    // determine if a simulation is being loaded, or
    // a new one needs to be created
    let simulationToLoadID = parseInt(sessionStorage.getItem("simulationToLoad"));
    console.log(simulationToLoadID);
    var post = null;
    if(simulationToLoadID == -1){
        console.log("loading blank experiment");
        initExperiment(experimentToJSON(new Experiment("", "")));
    } else{
        // POST experiment ID to search
        console.log("fetching experiment with ID: " + simulationToLoadID);
        post = postData("simulation-data", simulationToLoadID);
        post.then(function(expData){
            console.log("received following when querying for experiment with ID: " + simulationToLoadID);
            console.log(expData);
            // valid experiment ID
            if(expData.creatorName != ""){
                console.log("Experiment data as JS object: ");
                console.log(exp);
                initExperiment(expData);
            }
            else{
                // TODO experiment ID was invalid,
                // handle appropriately...
                console.log("Experiment ID invalid, no results found");
            }
        });
    }
}

/**
Given a json object of correct format, generate and return an Experiment object with the corresponding information
rawData: The data to parse
returns: The Experiment object
*/
function parseExperiment(rawData){
    // Create the base Experiment with the title and creator
    let exp = new Experiment(rawData[EXP_JSON_TITLE], rawData[EXP_JSON_CREATOR]);

    // Parse chem properties
    let properties = rawData[EXP_JSON_CHEM_PROPERTIES];
    if(properties !== undefined) parseChemProperties(properties);

    // Parse equations
    let equations = rawData[EXP_JSON_EQUATIONS];
    if(equations !== undefined) parseEquations(equations);

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
Parse out the ChemProperties from the given json list of ChemProperties
Place them all in CHEMICAL_PROPERTIES
rawProperties: The list of properties
*/
function parseChemProperties(rawProperties){
    for(var i = 0; i < rawProperties.length; i++){
        let p = rawProperties[i];
        makeChemical(
            p[CHEMICAL_PROPERTY_SYMBOL],
            p[CHEMICAL_PROPERTY_NAME],
            p[CHEMICAL_PROPERTY_CREATOR],
            getColorListObjectFromInt(p[CHEMICAL_PROPERTY_COLOR_SOLID]),
            getColorListObjectFromInt(p[CHEMICAL_PROPERTY_COLOR_LIQUID]),
            getColorListObjectFromInt(p[CHEMICAL_PROPERTY_COLOR_GAS]),
            p[CHEMICAL_PROPERTY_ID],
            p[CHEMICAL_PROPERTY_MOLAR_MASS],
            p[CHEMICAL_PROPERTY_MELTING_POINT],
            p[CHEMICAL_PROPERTY_BOILING_POINT],
            p[CHEMICAL_PROPERTY_DENSITY],
            p[CHEMICAL_PROPERTY_WATER_SOLUBLE],
        );
    }
}

/**
Parse out the Equations from the given json list of Equations
Place them all in EQUATION_PROPERTIES
rawEquations: The list of equations
*/
function parseEquations(rawEquations){
    for(var i = 0; i < rawEquations.length; i++){
        let eq = rawEquations[i];
        let reacts = parseEquationComponents(eq[EQUATION_PROPERTY_REACTANTS]);
        let prods = parseEquationComponents(eq[EQUATION_PROPERTY_PRODUCTS]);
        makeEquation(eq[EQUATION_PROPERTY_ID], reacts, prods);
    }
}

/**
Parse out a list of components for reactants or products
rawComponents: The list of components
returns: The parsed list of EquationComponent objects
*/
function parseEquationComponents(rawComponents){
    let comps = [];
    for(var i = 0; i < rawComponents.length; i++){
        let c = rawComponents[i];
        comps.push(new EquationComponent(
            c[EQUATION_COMPONENT_PROPERTY_COEFFICIENT],
            c[EQUATION_COMPONENT_PROPERTY_ID]
        ));
    }
    return comps;
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
        let recI = ins[EXP_JSON_INS_RECEIVER_INDEX];
        let act = (ins[EXP_JSON_INS_ACTOR_IS_EQUIP]) ? equips[actI] : chems[actI];
        // If the receiverID is less than 0, use a null receiver, otherwise get the correct receiver from the equipment or chemical list
        let rec = (recI < 0) ? null : ((ins[EXP_JSON_INS_RECEIVER_IS_EQUIP]) ? equips[recI] : chems[recI]);
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
    equips.push(makeTestEquipmentJSON(ID_EQUIP_BEAKER_50mL, 3));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_BEAKER_600mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_SCALE, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_GRADUATED_25mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_GRADUATED_1000mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_FLASK_25mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_FLASK_1000mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_WEIGH_BOAT, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_STIR_ROD, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_EYE_DROPPER, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_REFRACTOMETER, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_REFRACTOMETER_LENS, 1));
    exp[EXP_JSON_EQUIPMENT] = sortArrayByKey(equips, EXP_JSON_EQUIP_OBJ_ID, false);

    let chems = [];
    //chems.push(makeTestChemicalJSON(ID_CHEM_TEST_RED, 20, 1));
    //chems.push(makeTestChemicalJSON(ID_CHEM_TEST_RED, 20, 1));
    //chems.push(makeTestChemicalJSON(ID_CHEM_TEST_BLUE, 20, 1));
    //chems.push(makeTestChemicalJSON(ID_CHEM_TEST_WHITE, 50, 1));
    //chems.push(makeTestChemicalJSON(ID_CHEM_TEST_GREEN, 10, 1));
    //chems.push(makeTestChemicalJSON(ID_CHEM_TEST_BLACK, 10, 1));
    chems.push(makeTestChemicalJSON(ELEMENT_SODIUM_ATOMIC_NUM, 10, 1));
    //chems.push(makeTestChemicalJSON(ELEMENT_CHLORINE_ATOMIC_NUM, 10, 1));
    chems.push(makeTestChemicalJSON(COMPOUND_CHLORINE_GAS_ID, 10, 1));
    chems.push(makeTestChemicalJSON(COMPOUND_TABLE_SALT_ID, 10, 1));
    chems.push(makeTestChemicalJSON(COMPOUND_WATER_ID, 10, 1));
    chems.push(makeTestChemicalJSON(COMPOUND_HYDROGEN_GAS_ID, 1.8, 1));
    //chems.push(makeTestChemicalJSON(ELEMENT_OXYGEN_ATOMIC_NUM, 10, 1));
    chems.push(makeTestChemicalJSON(COMPOUND_OXYGEN_GAS_ID, 25, 1));
    exp[EXP_JSON_CHEMICALS] = sortArrayByKey(chems, [EXP_JSON_CHEM_ID, EXP_JSON_CHEM_MASS, EXP_JSON_CHEM_CONCENTRATION], true);

    let steps = [];
    steps.push(makeTestInstructionJSON(0, 0, true, 0, false, ID_FUNC_CONTAINER_ADD_TO));
    steps.push(makeTestInstructionJSON(1, 1, true, 1, false, ID_FUNC_CONTAINER_ADD_TO));
    steps.push(makeTestInstructionJSON(2, 0, true, 1, true, ID_FUNC_CONTAINER_POUR_INTO));
    steps.push(makeTestInstructionJSON(3, 1, true, 2, true, ID_FUNC_CONTAINER_POUR_INTO));
    steps.push(makeTestInstructionJSON(4, 2, true, 2, false, ID_FUNC_CONTAINER_ADD_TO));
    exp[EXP_JSON_INSTRUCTIONS] = sortArrayByKey(steps, EXP_JSON_INS_STEP_NUM, false);

    let chemProperties = [];
    chemProperties.push(makeTestChemProperties("H2", "Hydrogen Gas", "Nature",
        getColorInt([255, 255, 200, 255]), getColorInt([255, 255, 200, 200]), getColorInt([255, 255, 200, 180]),
        COMPOUND_HYDROGEN_GAS_ID, 2.016, -259, -253, 0.09, true));
    chemProperties.push(makeTestChemProperties("O2", "Oxygen Gas", "Nature",
        getColorInt([220, 220, 220, 255]), getColorInt([220, 220, 220, 200]), getColorInt([220, 220, 220, 180]),
        COMPOUND_OXYGEN_GAS_ID, 31.99800, -218, -183, 1.43, true));
    chemProperties.push(makeTestChemProperties("H2O", "Water", "Nature",
        getColorInt([100, 100, 255, 255]), getColorInt([100, 100, 255, 200]), getColorInt([100, 100, 255, 180]),
        COMPOUND_WATER_ID, 18.0153, 0, 100, 1, true));
    exp[EXP_JSON_CHEM_PROPERTIES] = chemProperties;

    let equations = [];
    equations.push(makeTestChemicalEquation([
        makeTestChemicalEquationComponent(2, COMPOUND_HYDROGEN_GAS_ID),
        makeTestChemicalEquationComponent(1, COMPOUND_OXYGEN_GAS_ID)
    ],[
        makeTestChemicalEquationComponent(2, COMPOUND_WATER_ID)
    ]));
    exp[EXP_JSON_EQUATIONS] = equations;


    return exp;
}

/**
Temporary function for getting lab 3 JSON file
*/
function getLab3aJSON(){
    let exp = {};
    exp[EXP_JSON_TITLE] = "Lab 3A";
    exp[EXP_JSON_CREATOR] = "Gen Chem";

    let equips = [];
    let scale = 0;
    let cylinder = 1;
    let flask = 2;
    let boat = 3;
    let rod = 4;
    let water = 0;
    let salt = 1;
    equips.push(makeTestEquipmentJSON(ID_EQUIP_SCALE, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_GRADUATED_50mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_FLASK_125mL, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_WEIGH_BOAT, 1));
    equips.push(makeTestEquipmentJSON(ID_EQUIP_STIR_ROD, 1));
    exp[EXP_JSON_EQUIPMENT] = sortArrayByKey(equips, EXP_JSON_EQUIP_OBJ_ID, false);

    let chems = [];
    chems.push(makeTestChemicalJSON(COMPOUND_WATER_ID, 50, 1));
    chems.push(makeTestChemicalJSON(COMPOUND_TABLE_SALT_ID, 1.7, 1));
    exp[EXP_JSON_CHEMICALS] = sortArrayByKey(chems, [EXP_JSON_CHEM_ID, EXP_JSON_CHEM_MASS, EXP_JSON_CHEM_CONCENTRATION], true);

    let steps = [];
    var s = 0;
    steps.push(makeTestInstructionJSON(s++, scale, true, flask, true, ID_FUNC_SCALE_TO_TAKE_WEIGHT));
    steps.push(makeTestInstructionJSON(s++, scale, true, flask, true, ID_FUNC_SCALE_REMOVE_OBJECT));
    steps.push(makeTestInstructionJSON(s++, cylinder, true, water, false, ID_FUNC_CONTAINER_ADD_TO));
    steps.push(makeTestInstructionJSON(s++, cylinder, true, flask, true, ID_FUNC_CONTAINER_POUR_INTO));
    steps.push(makeTestInstructionJSON(s++, scale, true, boat, true, ID_FUNC_SCALE_TO_TAKE_WEIGHT));
    steps.push(makeTestInstructionJSON(s++, scale, true, null, true, ID_FUNC_SCALE_ZERO_OUT));
    steps.push(makeTestInstructionJSON(s++, boat, true, salt, false, ID_FUNC_CONTAINER_ADD_TO));
    steps.push(makeTestInstructionJSON(s++, scale, true, null, true, ID_FUNC_SCALE_REMOVE_OBJECT));
    steps.push(makeTestInstructionJSON(s++, boat, true, flask, true, ID_FUNC_CONTAINER_POUR_INTO));
    steps.push(makeTestInstructionJSON(s++, rod, true, flask, true, ID_FUNC_STIR_ROD_STIR));
    steps.push(makeTestInstructionJSON(s++, scale, true, null, true, ID_FUNC_SCALE_CLEAR_ZERO));
    steps.push(makeTestInstructionJSON(s++, scale, true, flask, true, ID_FUNC_SCALE_TO_TAKE_WEIGHT));
    steps.push(makeTestInstructionJSON(s++, scale, true, null, true, ID_FUNC_SCALE_REMOVE_OBJECT));
    exp[EXP_JSON_INSTRUCTIONS] = sortArrayByKey(steps, EXP_JSON_INS_STEP_NUM, false);

    return exp;
}

/**
Create a json object for a piece of Equipment which can be placed in the database, or parsed to actual equipment
id: The ID of the Equipment
amount: The number of pieces of Equipment of type id
returns: The json object
*/
function makeTestEquipmentJSON(id, amount){
    let eq = {};
    eq[EXP_JSON_EQUIP_OBJ_ID] = id;
    eq[EXP_JSON_EQUIP_AMOUNT] = amount;
    return eq;
}

/**
Create a json object for a Chemical which can be placed in the database, or parse to the actual chemical
id: The ID of the Chemical
mass: The mass of the Chemical
concentration: The concentration of the Chemical
*/
function makeTestChemicalJSON(id, mass, concentration){
    let c = {};
    c[EXP_JSON_CHEM_ID] = id;
    c[EXP_JSON_CHEM_MASS] = mass;
    c[EXP_JSON_CHEM_CONCENTRATION] = concentration;
    return c;
}

/*
Create a json object for a step, also known as instruction, which can be placed in the database, or parse into the actual instruction
stepNum: The number for the order of when this step happens
actIndex: The index in the list of objects to which the actor refers
actIsEquip: true if actIndex is an index of the Equipment list, false for the Chemical list
recIndex: The index in the list of objects to which the receiver refers
recIsEquip: true if recIndex is an index of the Equipment list, false for the Chemical list
funcID: The ID of the function which the actor will use on the receiver
*/
function makeTestInstructionJSON(stepNum, actIndex, actIsEquip, recIndex, recIsEquip, funcID){
    let i = {};
    i[EXP_JSON_INS_STEP_NUM] = stepNum;
    i[EXP_JSON_INS_ACTOR_INDEX] = actIndex;
    i[EXP_JSON_INS_ACTOR_IS_EQUIP] = actIsEquip;
    i[EXP_JSON_INS_RECEIVER_INDEX] = recIndex;
    i[EXP_JSON_INS_RECEIVER_IS_EQUIP] = recIsEquip;
    i[EXP_JSON_INS_FUNC_ID] = funcID;
    return i;
}

/**
Create a json object for a ChemProperties, which can be placed in the database, or parse into the actual ChemProperties
symbol: The symbol used to display the chemical
name: The name of the chemical
creator: The user who made the chemical
colorSolid: The color which will be used to display the chemical as a solid [red, green, blue, alpha], alpha is optional
colorLiquid: The color which will be used to display the chemical as a liquid [red, green, blue, alpha], alpha is optional
colorGas: The color which will be used to display the chemical as a gas [red, green, blue, alpha], alpha is optional
id: The id of the chemical
molarMass: The molar mass of the chemical
meltingPoint: The temperature, in celsius, at which this chemical melts
boilingPoint: The temperature, in celsius, at which this chemical boils
density: The density, in g/cm^3 for solids, and g/L (or kg/m^3 for gases), of the chemical
waterSoluble: true if the chemical is soluble in water, false otherwise
returns: the ChemPropertiesT
*/
function makeTestChemProperties(symbol, name, creator,
        colorSolid, colorLiquid, colorGas,
        id, molarMass, meltingPoint, boilingPoint, density, waterSoluble){

    let p = {};
    p[CHEMICAL_PROPERTY_ID] = id;
    p[CHEMICAL_PROPERTY_SYMBOL] = symbol;
    p[CHEMICAL_PROPERTY_NAME] = name;
    p[CHEMICAL_PROPERTY_CREATOR] = creator;
    p[CHEMICAL_PROPERTY_COLOR_SOLID] = colorSolid;
    p[CHEMICAL_PROPERTY_COLOR_LIQUID] = colorLiquid;
    p[CHEMICAL_PROPERTY_COLOR_GAS] = colorGas;
    p[CHEMICAL_PROPERTY_MOLAR_MASS] = molarMass;
    p[CHEMICAL_PROPERTY_MELTING_POINT] = meltingPoint;
    p[CHEMICAL_PROPERTY_BOILING_POINT] = boilingPoint;
    p[CHEMICAL_PROPERTY_DENSITY] = density;
    p[CHEMICAL_PROPERTY_WATER_SOLUBLE] = waterSoluble;
    return p;
}

/**
Create a json object for a chemical equation, which can be placed in the database, or parse into the actual equation
reacts: The reactants of the equation, use makeTestChemicalEquationComponent() to create these
prods: The products of the equation, use makeTestChemicalEquationComponent() to create these
returns: The equation
*/
function makeTestChemicalEquation(reacts, prods){
    let eq = {};
    eq[EQUATION_PROPERTY_REACTANTS] = reacts;
    eq[EQUATION_PROPERTY_PRODUCTS] = prods;
    return eq;
}

/**
Make a component, i.e. reactant or product, for a chemical equation which can be placed in the database or parsed as part of a chemical equation
*/
function makeTestChemicalEquationComponent(coefficient, id){
    let c = {};
    c[EQUATION_COMPONENT_PROPERTY_COEFFICIENT] = coefficient;
    c[EQUATION_COMPONENT_PROPERTY_ID] = id;
    return c;
}