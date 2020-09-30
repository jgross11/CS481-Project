const TYPE_NAME = 0;
const TYPE_EMAIL = 1;
const TYPE_PASSWORD = 2;

/*
Checks if the given information is valid
example: if given an email address, it will check if the string contains an @ followed by a . ...
info: string that contains the information to check
type: the type of information obtained: NAME, EMAIL, ...
TODO: create password complexity check
*/
function verifyInformation(info, type){
    // empty / null check
    if(info === null || info.length == 0){
        return false;
    }

    switch(type){

        // name check
        case TYPE_NAME:
            for(i = 0; i < info.length; i++){
                char = info.charAt(i);
                // TODO: find better way to check if character is alphabetic?
                // cheap, only works with latin-based languages...
                if(char.toLowerCase() == char.toUpperCase()){
                    return false;
                }
            }
            return true;
        break;

        // email check
        case TYPE_EMAIL:
            var foundAt = false;
            for(i = 1; i < info.length; i++){
                char = info.charAt(i);
                // TODO: find better way to check if email is of form ---@---.---?
                if(char == '@'){
                    foundAt = true;
                    console.log("found @ at position: " + i);
                }
                else if(foundAt && char == '.' && info.charAt(i-1) != '@' && i != info.length - 1){
                    return true;
                }
            }
            return false;
        break;
    }
}

/*
Simply obtains the element by its id and removes whitespace from its value.
*/
function getAndTrimById(id){
    var element = document.getElementById(id);
    element.value = element.value.trim();
    return element;
}

/*
Writes the appropriate message to an element's accompanying error element (assumes error id name for element X is X-error)
name: the name of the element whose error will be modified
errorMessage: the error message to display
isGood: true = no errors, false = display the error
*/
function setErrorDivMessageByValue(name, errorMessage, isGood){
    document.getElementById(name+"-error").innerHTML = isGood ? "" : errorMessage;
}

function postData(address, objectToPost){
    return fetch(address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToPost)
    });
}

console.log("Helper function script loaded successfully!");