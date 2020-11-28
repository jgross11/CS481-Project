/*
The percentage of Equipment mass which changes based on when the Equipment is created
    This can make the mass increase or decrease by up to this percentage.
*/
let EQUIPMENT_MASS_VARIANCE = 0.1;

/**
The abstract class representing a generic piece of Equipment in an Experiment
*/
class Equipment extends ExperimentObject{

    /**
    Create a new ExperimentObject with the given position, mass, and sprite
    position: A list [x, y] of the upper left hand corner coordinates of the Equipment's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this piece of Equipment
    sprite: A P5 image file used to display this piece of Equipment
    */
    constructor(position, size, mass, sprite){
        super(mass);
        this.position = position;
        this.size = size
        this.instanceID = nextInstanceID();
        this.sprite = sprite;

        // A list of functions which get called when the position of this Equipment is updated
        this.positionListeners = [];
    }

    /**
    Add the given function to the list of functions called when this Equipment's position is updated
    Does nothing if the function is already in the list
    listener: The function to add
    */
    addPositionListener(listener){
        let pl = this.positionListeners;
        if(!pl.includes(listener)) pl.push(listener);
    }

    /**
    Remove the given function from the list of functions called when this Equipment's position is updated.
    Does nothing if the listener is not in the list
    listener: The function to remove
    */
    removePositionListener(listener){
        let pl = this.positionListeners;
        let i = pl.indexOf(listener);
        if(i >= 0) pl.splice(i, 1);
    }

    /**
    Randomly change the mass of this Equipment based on its actual mass.
    This is to simulate each piece of equipment having a slightly different mass
    This should be called when the Equipment is created if the mass should be altered
    */
    randomizeMass(){
        this.setMass(this.mass * (1 + EQUIPMENT_MASS_VARIANCE * 2 * (Math.random() - 0.5)));
    }

    /**
    Set the current position of this piece of Equipment
    pos: The new position, a list [x, y] of coordinates
    bounds: The bounds to keep the position inside of, or null to ignore, default null
    */
    setPosition(pos, bounds = null){
        this.position = pos

        // Run update functions
        let pl = this.positionListeners;
        for(var i = 0; i < pl.length; i++){
            pl[i].call();
        }

        let control = new EquipmentController2D(this);
        if(bounds !== null) control.keepInBounds(bounds);
    }

    /**
    Set the current size of this piece of Equipment
    pos: The new size, a list [width, height]
    */
    setSize(size){
        this.size = size
    }

    /**
    Set the id of this piece of Equipment
    instanceID: The new id
    */
    setInstanceID(instanceID){
        this.instanceID = instanceID;
    }

    /**
    Set the sprite which will be used to display this piece of Equipment
    sprite: The new sprite, a P5 image file
    */
    setSprite(sprite){
        this.sprite = sprite;
    }

}


/**
A class for handling controlling a piece of Equipment in a 2D environment
*/
class EquipmentController2D extends ExperimentObjectController2D{

    /**
    Create a new EquipmentController to control the given piece of Equipment
    equipment: The piece of Equipment which this Controller will control
    */
    constructor(equipment){
        super();
        this.equipment = equipment;
    }

    /**
    Set the currently used Equipment for this EquipmentController
    equipment: The piece of Equipment which will be controlled by this Controller
    */
    setEquipment(equipment){
        this.equipment = equipment;
    }

    /**
    Get this Controller's Equipment
    */
    getObject(){
        return this.equipment;
    }

    /**
    Determine if this Controller's Equipment can be placed down on its own, all Equipment can be placed on its own.
    returns: true, always
    */
    canPlace(){
        return true;
    }

    /**
    Get the x coordinate of this Controller's Equipment
    */
    x(){
        return this.equipment.position[0];
    }

    /**
    Get the y coordinate of this Controller's Equipment
    */
    y(){
        return this.equipment.position[1];
    }

    /**
    Get the width of this Controller's Equipment
    */
    width(){
        return this.equipment.size[0];
    }

    /**
    Get the height of this Controller's Equipment
    */
    height(){
        return this.equipment.size[1];
    }

    /**
    Set the center position of this Controller's Equipment
    x: The x coordinate for the new center
    x: The y coordinate for the new center
    */
    setCenter(x, y){
        this.equipment.setPosition([x - this.width() * .5, y - this.height() * .5]);
    }

    /**
    Get the center point of this Controller's Equipment
    returns: The center point as a list [x, y]
    */
    getCenter(){
        return [this.x() + this.width() * .5, this.y() + this.height() * .5];
    }

    /**
    If more than half of this Controller's Equipment's bounds is outside of the given bounds, snap it to the nearest edge
    bounds: A rectangular bounds as a list [far left x, upper y, width, height]
    */
    keepInBounds(bounds){
        let x = bounds[0];
        let y = bounds[1];
        let w = bounds[2];
        let h = bounds[3];
        let c = this.getCenter();
        var cx = c[0];
        var cy = c[1];

        if(cx < x) cx = x;
        else if(cx > x + w) cx = x + w;

        if(cy < y) cy = y;
        else if(cy > y + h) cy = y + h;

        this.setCenter(cx, cy);
    }

    /**
    Get the rectangular bounds of this Controller's Equipment as a rectangle
    returns: the bounds as a list of 4 floating point values [x, y, width, height],
        x and y are the upper left hand corner
    */
    toRect(){
        return [this.x(), this.y(), this.width(), this.height()];
    }

    /**
    Determine if a point is located inside the bounds of this Controller's Equipment
    pos: The point to test
    returns: true if the point is inside the Equipment, false otherwise
    */
    inBounds(pos){
        return pointInRect2D(this.toRect(), pos);
    }

    /**
    Reset this Controller's Equipment to a default state
    */
    reset(){
        this.equipment.positionListeners = [];
    }

    /**
    Update the state of this Controller's Equipment by one frame in the simulation.
    Override this method to have events happen in sub Equipment.
    */
    update(){}

    /**
    Draw this Controller's Equipment to the given graphics in it's current position as a generic sprite.
    graphics: The P5 graphics to use
    */
    drawSprite(graphics){
        var r = this.toRect();
        graphics.image(this.equipment.sprite, r[0], r[1], r[2], r[3]);
    }

    /**
    Draw this Controller's Equipment onto the screen using P5 2D graphics
    graphics: The P5 graphics to use
    */
    draw(graphics){
        this.drawSprite(graphics);
    }

    /**
    Determine if any part of this Controller's Equipment, when rendered, will appear in the given bounds
    bounds: The bounds to use, a rectangle [far left x, upper y, width, height]
    returns: true if This Controller's Equipment will be rendered, false otherwise
    */
    shouldRender(bounds){
        return rectInRect2D(bounds, this.toRect());
    }
}