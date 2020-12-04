
/**
 * Contains all relevant logic necessary to retrieve and submit equation information
 * NOTE: only to be used within the experiment creation page as an import
 * NOTE: must also import helperFunctions.js for POST helper function
 */

// div for reactant components 
let reactantContainer = null;

// div for product components
let productContainer = null;

// div for reactant coefficients
let reactantCoefficients = null;

// div for reactant formulas
let reactantFormulas = null;

// div for product coefficients
let productCoefficients = null;

// div for product formulas
let productFormulas = null;

// all equation list container
let equationSearchResultContainer = null;

// list containing equation information for all equations in DB
let allEquationList = {};

// on script load, query DB for all equation information and display on page
function initEquationSearch(){
    equationSearchResultContainer = document.getElementById("equationSearchResultContainer");
    loadEquationsInDB();
}

// creates basic equation to indicate how to build a new one on webpage
function initEquationCreation(){
    reactantContainer = document.getElementById("reactantContainer");
    productContainer = document.getElementById("productContainer");
    reactantCoefficients = document.getElementsByName("reactantCoefficient");
    reactantFormulas = document.getElementsByName("reactantFormula");
    productCoefficients = document.getElementsByName("productCoefficient");
    productFormulas = document.getElementsByName("productFormula");
    updatePreview();
}

// queries database for all equation information and
// displays information on webpage
function loadEquationsInDB(){
    // POST requires data to be sent
    // TODO write GET helper function(?)
    let x = {};

    postData('load-all-equations', x).then(function(data){
        // set all equations list to be used elsewhere on experiment creation page
        allEquationList = data;
        displayEquationResults(allEquationList);
    });
}

// given part of or a whole chemical formula, 
// iterate through all equations list,
// add and display equations that contain that formula
function searchEquation(searchValue){
    let searchResults = []
    let searchResultSize = 0;
    for(let i in allEquationList){
        if(allEquationList[i]['string'].includes(searchValue)){
            searchResults[searchResultSize++] = allEquationList[i];
        }
    }

    // display search results
    displayEquationResults(searchResults);
}

// given a list of equations (either every one, or search results)
// create list on webpage to display results
function displayEquationResults(list){
    equationSearchResultContainer.innerHTML = "";
    for(let i in list){
        equationSearchResultContainer.innerHTML += '<div style="border: 1px solid black" id="equationSearchResult" onclick="addEquation('+i+')">'+list[i]["string"]+'</div>'
    }
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

    // combine reactant coefficients and formulas into one array that will be mapped to backend through Jackson
    let reactants = storeCoefficientsAndFormulas(reactantCoefficients, reactantFormulas);

    // combine product coefficients and formulas into one array that will be mapped to backend through Jackson
    let products = storeCoefficientsAndFormulas(productCoefficients, productFormulas);
    
    // combine reactants and products array into one Equation Object to map on backend
    let equation = {
        reactants: reactants, 
        products: products,
        userID: user.id
    };

    // send constructed equation to backend for submission
    postData('submit-equation-information', equation).then(function(data){
        if(data == true){
            errorDiv.innerHTML = "Submission succesful!";
        } else{
            errorDiv.innerHTML = "Submission failed! Please ensure every product and reactant in your equation is in our system.";
        }
        // in the time it took to create this equation, there is a chance new equations were added to DB
        // so, we reload all the contents of the DB.
        // TODO there is absolutely no need to load every equation again, this could just query for the 
        // TODO newly added equation, but, alas, time...
        loadEquationsInDB();
    });
}

console.log("Equation form handler successfully loaded!");