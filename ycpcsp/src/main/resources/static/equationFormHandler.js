
/**
 * Contains all relevant logic necessary to retrieve and submit equation information
 * NOTE: only to be used within the experiment creation page as an import
 * NOTE: must also import helperFunctions.js for POST helper function
 */

let reactantContainer = null;
let productContainer = null;
let reactantCoefficients = null;
let reactantFormulas = null;
let productCoefficients = null;
let productFormulas = null;
let equationSearchResultContainer = null;
let allEquationList = {};


initSearch();

function initSearch(){
    equationSearchResultContainer = document.getElementById("equationSearchResultContainer");
    loadEquationsInDB();
}

function initEquationCreation(){
    reactantContainer = document.getElementById("reactantContainer");
    productContainer = document.getElementById("productContainer");
    reactantCoefficients = document.getElementsByName("reactantCoefficient");
    reactantFormulas = document.getElementsByName("reactantFormula");
    productCoefficients = document.getElementsByName("productCoefficient");
    productFormulas = document.getElementsByName("productFormula");
    updatePreview();
}

function loadEquationsInDB(){
    let x = {};

    postData('load-all-equations', x).then(function(data){
        allEquationList = data;
        displayEquationResults(allEquationList);
    });
}

function searchEquation(searchValue){
    let searchResults = []
    let searchResultSize = 0;
    for(let i = 0; i < allEquationList.length; i++){
        if(allEquationList[i]['string'].includes(searchValue)){
            searchResults[searchResultSize++] = allEquationList[i];
        }
    }
    displayEquationResults(searchResults);
}

function displayEquationResults(list){
    equationSearchResultContainer.innerHTML = "";
    for(let i = 0; i < list.length; i++){
        equationSearchResultContainer.innerHTML += '<div style="border: 1px solid black" id="equationSearchResult" onclick="addEquation('+list[i]["equationID"]+')">'+list[i]["string"]+'</div>'
    }
}

function addEquation(equationID){
    console.log("please add equationID=" + equationID + " to equation now");
}

/*
called when add reactant function is called
temporarily stores reactant coefficient / formula information, 
writes a new coefficient and formula field to reactant container,
then writes old reactant coefficient / formula information

NOTE: storing / rewriting required as updating container innerHTML
NOTE: resets values of all its existing fields
*/
function addReactant(){
    let temp = storeCoefficientsAndFormulas(reactantCoefficients, reactantFormulas);
    reactantContainer.innerHTML += "<br><input type=\"number\" name=\"reactantCoefficient\" value=\"1\" min=\"1\" step=\"1\" style=\"width: 50px\" oninput=\"updatePreview()\"> <input name=\"reactantFormula\"type=\"text\" value=\"H2\"style=\"width: 70px\"oninput=\"updatePreview()\">";
    writeCoefficientsAndFormulas(reactantCoefficients, reactantFormulas, temp);
}

/* 
called when add product function is called
temporarily stores product coefficient / formula information, 
writes a new coefficient and formula field to product container,
then writes old product coefficient / formula information

NOTE: storing / rewriting required as updating container innerHTML
NOTE: resets values of all its existing fields
*/
function addProduct(){
    let temp = storeCoefficientsAndFormulas(productCoefficients, productFormulas);
    productContainer.innerHTML += "<br><input type=\"number\" name=\"productCoefficient\" value=\"1\" min=\"1\" step=\"1\" style=\"width: 50px\" oninput=\"updatePreview()\"> <input name=\"productFormula\"type=\"text\" value=\"H2\"style=\"width: 70px\"oninput=\"updatePreview()\">"
    writeCoefficientsAndFormulas(productCoefficients, productFormulas, temp);
}

/*
    * Copies coefficient and formula together into array, creates array of these pairs
    * coefficientArray - the array containing the coefficient values
    * formulaArray - the array containing the formula values
    * returns - an array whose kth element is in the form [coefficientArray[k], formulaArray[k]]
*/
    function storeCoefficientsAndFormulas(coefficientArray, formulaArray){
    let result = [];
    for(let i = 0; i < coefficientArray.length; i++){
        result.push([coefficientArray[i].value, formulaArray[i].value]);
    }
    return result;
}

/*
    * Writes coefficient and formula information into their respective arrays
    * coefficientArray - the array that will contain coefficient values
    * formulaArray - the array that will contain formula values
    * values - the array (formatted by the function storeCoefficientsAndFormulas)
    * whose values will be written into coefficientArray and formulaArray
    * 
*/
function writeCoefficientsAndFormulas(coefficientArray, formulaArray, values){
    for(let i = 0; i < values.length; i++){
        coefficientArray[i].value = values[i][0];
        formulaArray[i].value = values[i][1];
    }
}

// combines all relevant reactant and product information into a formatted string
// that is displayed on the webpage to show the form the equation takes
function updatePreview(){
    let equationPreview = document.getElementById("equationPreview");
    let response = reactantCoefficients.length > 0 ? (reactantCoefficients[0].value > 1 ? reactantCoefficients[0].value : "") + reactantFormulas[0].value : "";

    for(let i = 1; i < reactantCoefficients.length; i++){
        response += " + " + (reactantCoefficients[i].value > 1 ? reactantCoefficients[i].value : "") + reactantFormulas[i].value;
    }
    response += " → ";

    response += productCoefficients.length > 0 ? (productCoefficients[0].value > 1 ? productCoefficients[0].value : "") + productFormulas[0].value : "";
    for(let i = 1; i < productCoefficients.length; i++){
        response += " + " + (productCoefficients[i].value > 1 ? productCoefficients[i].value : "") + productFormulas[i].value;
    }
    equationPreview.innerHTML = "Equation Preview: <br>" + response;
}

// builds and attempts to submit equation information to DB
function submitEquation(){

    // check if given information is valid
    // reactant coefficients 
    let errorDiv = document.getElementById("equationError");
    errorDiv.innerHTML = "";
    for(let i = 0; i < reactantCoefficients.length; i++){
        let coefficientValue = parseInt(reactantCoefficients[i].value);
        console.log("value: " + coefficientValue);
        if(isNaN(coefficientValue)){
            errorDiv.innerHTML += "Please ensure all reactant coefficients are numbers.<br>";
            break;
        }
    }

    // reactant formula
    for(let i = 0; i < reactantFormulas.length; i++){
        let formulaValue = reactantFormulas[i].value;
        console.log("fvalue: " + formulaValue);
        if(formulaValue.length > 0){
            let firstChar = formulaValue.charAt(0);
            if(firstChar == '(' || firstChar.toUpperCase() != firstChar.toLowerCase()){
                continue;
            }
        }
        errorDiv.innerHTML += "Please ensure all reactant formulas are valid.<br>";
        break;
    }

    // product coefficients
    for(let i = 0; i < productCoefficients.length; i++){
        let coefficientValue = parseInt(productCoefficients[i].value);
        console.log("value: " + coefficientValue);
        if(isNaN(coefficientValue)){
            errorDiv.innerHTML += "Please ensure all product coefficients are numbers.<br>";
            break;
        }
    }

    // product formula
    for(let i = 0; i < productFormulas.length; i++){
        let formulaValue = productFormulas[i].value;
        console.log("fvalue: " + formulaValue);
        if(formulaValue.length > 0){
            let firstChar = formulaValue.charAt(0);
            if(firstChar == '(' || firstChar.toUpperCase() != firstChar.toLowerCase()){
                continue;
            }
        }
        errorDiv.innerHTML += "Please ensure all product formulas are valid.<br>";
        break;
    }

    // at least one error occurred, invalid submission
    if(errorDiv.innerHTML != ""){
        return;
    }


    let reactants = storeCoefficientsAndFormulas(reactantCoefficients, reactantFormulas);
    let products = storeCoefficientsAndFormulas(productCoefficients, productFormulas);
    let equation = {
        reactants: reactants, 
        products: products
    };
    console.log(equation);
    postData('submit-equation-information', equation).then(function(data){
        if(data == true){
            errorDiv.innerHTML = "Submission succesful!";
            
            // since new equation now in DB, repull equations to load new equation into list
            // TODO there is absolutely no need to load every equation again, this could just query for the 
            // TODO newly added equation, but, alas, time...
            loadEquationsInDB();
        } else{
            errorDiv.innerHTML = "Submission failed! Please ensure every product and reactant in your equation is in our system.";
        }
    });
}

console.log("Equation form handler successfully loaded!");