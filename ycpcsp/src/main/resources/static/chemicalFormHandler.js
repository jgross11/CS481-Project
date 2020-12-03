/**
 * Contains all relevant logic necessary to retrieve and submit chemical information
 * NOTE: only to be used within the experiment creation page as an import
 * NOTE: must also import helperFunctions.js for POST helper function
 */

 // div that contains all chemicals list information
let chemicalSearchResultContainer = null;

// list of every chemical information in DB
let allChemicalsList = {};

// map used to determine if a chemical's information is in 
// the constructed experiment on experiment creation page
let allChemicalsMap = {};

// chemical submission div
let submissionErrorDiv = null;

// on script load, query DB for all chemical information and display results
function initChemicalSearch(){
    loadChemicalsInDB();
    chemicalSearchResultContainer = document.getElementById("chemicalSearchResultContainer");
}

// when inserting new chemical information into DB, must fix chemical state color preview bug
function initChemicalCreation(){
    
    // because where else would you do this? 
    submissionErrorDiv = document.getElementById("chemicalSubmissionError");
    
    // initialize chemical state colors to black, rather than nonexistent 
    updateColor(1);
    updateColor(2);
    updateColor(3);
}

// given the index of the chemical's color, update the preview based on the current RGB and A selections
/*
    1 - gas color
    2 - liquid color
    3 - solid color
*/
// TODO is there a need to convert a string to int to string?
function updateColor(index){
    let color = 0;
    switch(index){
        case 1:
            color = document.getElementById("gasColor").value + parseInt(document.getElementById("gasColorAlpha").value).toString(16);
            document.getElementById("gasColorPreview").style.backgroundColor = color;
        break;
        case 2:
            color = document.getElementById("liquidColor").value + parseInt(document.getElementById("liquidColorAlpha").value).toString(16);
            document.getElementById("liquidColorPreview").style.backgroundColor = color;
        break;
        case 3:
            color = document.getElementById("solidColor").value + parseInt(document.getElementById("solidColorAlpha").value).toString(16);
            document.getElementById("solidColorPreview").style.backgroundColor = color;
        break;
    };
}

// given a part of or entire chemical name or formula,
// iterate through all chemicals list and add
// chemicals that include that value
// and display this list in the chemicals display div
function searchChemical(searchValue){
    let searchResults = []
    let searchResultSize = 0;
    for(let i in allChemicalsList){
        if(allChemicalsList[i]['formula'].includes(searchValue) || allChemicalsList[i]['name'].toLowerCase().includes(searchValue.toLowerCase())){
            searchResults[searchResultSize++] = allChemicalsList[i];
        }
    }
    displayChemicalResults(searchResults);
}

// load all chemical information in DB
function loadChemicalsInDB(){
    // POST requires data be sent
    // TODO write GET helper function(?)
    let x = {};

    // query DB for all chemical information
    postData('load-all-chemicals', x).then(function(data){
        
        // allChemicalsList will be used on experiment creation page, must give it query result information
        allChemicalsList = data;

        // display all chemicals information on webpage
        displayChemicalResults(allChemicalsList);

        // populate map for efficiency's sake
        // will be used later when searching for chemicals
        // TODO consider changing the return type of the backend POST function
        // TODO to make this step redundant
        for(i in allChemicalsList){
            allChemicalsMap[allChemicalsList[i]["formula"]] = allChemicalsList[i];
            // TODO: the listIndex trick is awful, please fix
            allChemicalsMap[allChemicalsList[i]["formula"]].listIndex = i;
        }
    });
}

// given a list of chemical information (either all or a search's results)
// write information onto webpage in appropriate div
function displayChemicalResults(list){
    chemicalSearchResultContainer.innerHTML = ""; 
    for(let i = 0; i < list.length; i++){
        let chem = list[i];
        chemicalSearchResultContainer.innerHTML += '<div style="border: 1px solid black" id="chemicalSearchResult" onclick="addChemical('+i+')">'+
        chem["name"]+" | "+chem["formula"]+" | molecular mass="+chem["molarMass"]+" | density="+chem["density"]+" | gas @ "+chem["boilingPoint"]+'°C'+" | solid @ "+chem["meltingPoint"]+'°C</div><button onclick="RateUp('+i+')"> + </button>'+chem["rating"]+ '<button onclick="RateDown('+i+')"> - </button>'
    }
}

// attempts to submit the newly created chemical and its information
function submitChemical(){
    // obtain form values
    let chemicalName = document.getElementById("chemicalNameBox").value;
    let chemicalFormula = document.getElementById("chemicalFormulaBox").value;
    let chemicalMass = document.getElementById("chemicalMassBox").value;
    let chemicalDensity = document.getElementById("chemicalDensityBox").value;
    let solubilityButtons = document.getElementsByName("solubility");
    let isChemicalSoluble = solubilityButtons[0].checked ? solubilityButtons[0].value : solubilityButtons[1].checked ? solubilityButtons[1].value : -1;
    let chemicalMP = document.getElementById("chemicalMeltingPoint").value;
    let chemicalBP = document.getElementById("chemicalBoilingPoint").value;

    // verification checks - individual fields
    let nameGood = chemicalName.length != 0;
    let formulaGood = chemicalFormula.length != 0;
    let massGood = !isNaN(parseFloat(chemicalMass));
    let densityGood = !isNaN(parseFloat(chemicalDensity));
    let soluble = isChemicalSoluble != -1;
    let MPGood = !isNaN(parseFloat(chemicalMP));
    let BPGood = !isNaN(parseFloat(chemicalBP));

    // verification action is good, construct and submit chemical information
    if(nameGood && formulaGood && massGood && densityGood && MPGood && BPGood && soluble){
        let GC = parseInt(document.getElementById("gasColor").value.substring(1), 16) << 8 | parseInt(document.getElementById("gasColorAlpha").value);
        let LC = parseInt(document.getElementById("liquidColor").value.substring(1), 16) << 8 | parseInt(document.getElementById("liquidColorAlpha").value);
        let SC = parseInt(document.getElementById("solidColor").value.substring(1), 16) << 8 | parseInt(document.getElementById("solidColorAlpha").value);

        // build colorStates object for mapping
        let colorStates = {
            gasColor: GC,
            liquidColor: LC,
            solidColor: SC
        };

        // build chemical object for mapping
        let chemical = {};
        chemical[CHEMICAL_PROPERTY_NAME] = chemicalName;
        chemical[CHEMICAL_PROPERTY_SYMBOL] = chemicalFormula;
        chemical[CHEMICAL_PROPERTY_MOLAR_MASS] = chemicalMass;
        chemical[CHEMICAL_PROPERTY_DENSITY] = chemicalDensity;
        chemical[CHEMICAL_PROPERTY_WATER_SOLUBLE] = soluble;
        chemical[CHEMICAL_PROPERTY_MELTING_POINT] = chemicalMP;
        chemical[CHEMICAL_PROPERTY_BOILING_POINT] = chemicalBP;
        chemical[CHEMICAL_PROPERTY_COLORS] = colorStates;
        submissionErrorDiv.innerHTML = "";

        // submit chemical information to DB
        console.log(chemical);
        
        postData('submit-chemical-information', chemical).then(function(data){
            if(data){
                submissionErrorDiv.innerHTML = "Submission successful";
            } else{
                submissionErrorDiv.innerHTML = "Submission failed";
            }
            
            // in the time it took to create new chemical, new chemicals may have been added elsewhere
            // therefore, we reload all chemicals information
            // TODO there is absolutely no need to load every chemical again, this could just query for the 
            // TODO newly added chemical, but, alas, time...
            loadChemicalsInDB();
        });
        

    // verification failed in at least one spot
    } else{
        // set appropriate error messages by field
        setErrorDivMessageByValue("chemicalNameBox", "Please enter the chemical's name.", nameGood);
        setErrorDivMessageByValue("chemicalFormulaBox", "Please enter the chemical's formula.", formulaGood);
        setErrorDivMessageByValue("chemicalMassBox", "Please enter the chemical's mass.", massGood);
        setErrorDivMessageByValue("chemicalDensityBox", "Please enter the chemical's density.", densityGood);
        setErrorDivMessageByValue("solubility", "Please determine if the chemical is water soluble.", soluble);
        setErrorDivMessageByValue("chemicalMeltingPoint", "Please enter the chemical's melting point.", MPGood);
        setErrorDivMessageByValue("chemicalBoilingPoint", "Please enter the chemical's boiling point.", BPGood);
    }
}

console.log("Chemical form handler successfully loaded!");