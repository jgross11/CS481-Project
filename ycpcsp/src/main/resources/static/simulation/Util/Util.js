/**
Determine if the given variable n is a floating point value
return: true if n is a floating point value, false otherwise
*/
function isFloat(n){
    return Number(n) === n;
}

/**
Helper function for sorting an array in ascending order
array: The array to sort
keys: The element of the array to sort by, or a list of elements
multiple: true for a list of keys, false otherwise, default false
returns: The sorted version of array. array itself is also sorted
*/
function sortArrayByKey(array, keys, multiple = false){
    return array.sort(function(a, b){
        if(multiple){
            var result = 0;
            for(var i = 0; i < keys.length; i++){
                result = arraySortCompare(a, b, keys[i]);
                if(result !== 0) return result;
            }
            return result;
        }
        else return arraySortCompare(a, b, keys);
    });
}

/**
Helper function for sortArrayByKey. Determine if a is greater than b.
a: The first element
b: The second element
key: The key to compare
returns: -1 if a is less than b, 0 if a nd b are equal, or 1 if a is greater than b
*/
function arraySortCompare(a, b, key){
    var x = a[key];
    var y = b[key];
    if(x < y) return -1;
    return (x > y) ? 1 : 0;
}