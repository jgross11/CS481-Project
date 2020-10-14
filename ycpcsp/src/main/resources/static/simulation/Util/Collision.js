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
    return x <= px && px <= x + w && y <= py && py <= y + h;
}