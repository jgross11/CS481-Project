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

/**
Get a color between 2 colors based on their relative weights, the higher the weight,
    the closer to that color the final color will be.
Both colors must be a list of values, and each must be the same length
c1: The first color
w1: The weight of the first color, must be positive and nonzero
c2: The second color
w2: The weight of the second color, must be positive and nonzero
returns: The combined color
*/
function colorRatio(c1, w1, c2, w2){
    var c = [];
    let w = w1 + w2;
    for(var i = 0; i < c1.length; i++){
        c.push((c1[i] * w1 + c2[i] * w2) / w);
    }
    return c;
}

/**
Combine a list of colors together via ratios, see colorRatio for more details.
cs: The colors
ws: The weight, indexes correspond to the color indexes
returns: The combined color
*/
function colorRatioMultiple(cs, ws){
    var c = cs[0];
    var w = ws[0];
    for(var i = 1; i < cs.length; i++){
        c = colorRatio(c, w, cs[i], ws[i]);
        w += ws[i];
    }
    return c;
}