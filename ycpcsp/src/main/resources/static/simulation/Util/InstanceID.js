// The next ID to use for a new instanceID
var currentInstanceID = 0;

/**
Get the next instance ID which can be used for an ExperimentObject
*/
function nextInstanceID(){
    return currentInstanceID++;
}