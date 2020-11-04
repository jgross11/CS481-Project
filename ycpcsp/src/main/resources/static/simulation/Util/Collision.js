/*
A file used for handling operations involving collisions
*/


/**
Determine if a point is located inside a rectangular bounds
rect: A list if 4 floating point values representing a rectangle
    [x, y, width, height], where x and y are the upper right hand coordinates
p: A list of 2 floating point values representing a 2D point [x, y]
returns: true if p is inside rect, false otherwise
*/
function pointInRect2D(rect, p){
    var px = p[0];
    var py = p[1];
    var x = rect[0];
    var y = rect[1];
    var w = rect[2];
    var h = rect[3];
    return between(px, x, x + w) && between(py, y, y + h);
}

/**
Determine if a rectangular bounds is touching a rectangular bounds
r1: A list if 4 floating point values representing one rectangle
    [x, y, width, height], where x and y are the upper right hand coordinates
r2: The other rectangle, same parameter type as r1
returns: true if r1 and r2 touch, false otherwise
*/
function rectInRect2D(r1, r2){
    let x1 = r1[0];
    let y1 = r1[1];
    let x2 = r2[0];
    let y2 = r2[1];
    let x3 = x1 + r1[2];
    let y3 = y1 + r1[3];
    let x4 = x2 + r2[2];
    let y4 = y2 + r2[3];
    return ((between(x1, x2, x4) || between(x3, x2, x4)) &&
            (between(y1, y2, y4) || between(y3, y2, y4))) ||
           ((between(x2, x1, x3) || between(x4, x1, x3)) &&
            (between(y2, y1, y3) || between(y4, y1, y3)));
}

/**
Determine if a is between or equal to x and y
a: The number to check
x: The lower bound, should be less than or equal to y
y: The upper bound, should be greater than or equal to x
returns: true if a is between x and y, false otherwise
*/
function between(a, x, y){
    return x <= a && a <= y;
}