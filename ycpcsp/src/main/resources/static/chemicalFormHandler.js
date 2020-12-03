/**
 * Contains all relevant logic necessary to retrieve and submit chemical information
 * NOTE: only to be used within the experiment creation page as an import
 * NOTE: must also import helperFunctions.js for POST helper function
 */

let chemicalSearchResultContainer = null;
let allChemicalsList = {};
let allChemicalsMap = {};
let submissionErrorDiv = null;


function initChemicalSearch(){
    loadChemicalsInDB();
    chemicalSearchResultContainer = document.getElementById("chemicalSearchResultContainer");
}

function initChemicalCreation(){
    submissionErrorDiv = document.getElementById("chemicalSubmissionError");
    updateColor(1);
    updateColor(2);
    updateColor(3);
}

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

function searchChemical(searchValue){
    let searchResults = []
    let searchResultSize = 0;
    for(let i = 0; i < allChemicalsList.length; i++){
        if(allChemicalsList[i]['formula'].includes(searchValue) || allChemicalsList[i]['name'].toLowerCase().includes(searchValue.toLowerCase())){
            searchResults[searchResultSize++] = allChemicalsList[i];
        }
    }
    displayChemicalResults(searchResults);
}

function loadChemicalsInDB(){
    let x = {};

    postData('load-all-chemicals', x).then(function(data){
        allChemicalsList = data;
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

function displayChemicalResults(list){
    chemicalSearchResultContainer.innerHTML = ""; 
    for(let i = 0; i < list.length; i++){
        let chem = list[i];
        chemicalSearchResultContainer.innerHTML += '<div style="border: 1px solid black" id="chemicalSearchResult" onclick="addChemical('+i+')">'+
        chem["name"]+" | "+chem["formula"]+" | molecular mass="+chem["molarMass"]+" | density="+chem["density"]+" | gas @ "+chem["boilingPoint"]+'°C'+" | solid @ "+chem["meltingPoint"]+'°C</div><button onclick="RateUp('+i+')"> + </button>'+chem["rating"]+ '<button onclick="RateDown('+i+')"> - </button>'
    }
}

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

    // verification action
    if(nameGood && formulaGood && massGood && densityGood && MPGood && BPGood && soluble){
        let GC = parseInt(document.getElementById("gasColor").value.substring(1), 16) << 8 | parseInt(document.getElementById("gasColorAlpha").value);
        let LC = parseInt(document.getElementById("liquidColor").value.substring(1), 16) << 8 | parseInt(document.getElementById("liquidColorAlpha").value);
        let SC = parseInt(document.getElementById("solidColor").value.substring(1), 16) << 8 | parseInt(document.getElementById("solidColorAlpha").value);

        let colorStates = {
            gasColor: GC,
            liquidColor: LC,
            solidColor: SC
        };

        let chemical = {
            name: chemicalName,
            formula: chemicalFormula,
            mass: chemicalMass,
            density: chemicalDensity,
            isWaterSoluable: soluble,
            solidTemp: chemicalMP,
            gasTemp: chemicalBP,
            colors: colorStates
        };
        console.log("chemical information");
        console.log(chemical);
        submissionErrorDiv.innerHTML = "";
        postData('submit-chemical-information', chemical).then(function(data){
            if(data){
                // since new chemical now in DB, repull chemicals to load new chemical into list
                // TODO there is absolutely no need to load every chemical again, this could just query for the 
                // TODO newly added chemical, but, alas, time...
                submissionErrorDiv.innerHTML = "Submission successful";
                loadChemicalsInDB();
            } else{
                submissionErrorDiv.innerHTML = "Submission failed";
            }
        });
    } else{
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