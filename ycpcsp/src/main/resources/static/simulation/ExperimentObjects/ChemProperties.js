/**
An abstract class used to track properties of Chemicals using a tree structure.
Do not directly access or assign fields from this object, use getters and setters.
If no getter or setter exists, do not attempt to access or assign the field
*/
class ChemProperties{

    /**
    Create new ChemProperties, using the given stats. Only provide chem and count if this is an atom, optionally can include creator.
    chem: Either a list of ChemProperties objects, or a single integer for the atomic number
    count: The number of atoms or molecules of this Chemical, i.e. a hydrogen molecule has a count of 2,
        and a hydrogen atom has a count of 1
    creator: The name of the creator of this ChemProperties.
    */
    constructor(chem, count, creator){
        this.chem = chem;
        this.count = count;
        this.creator = creator;
    }

    /**
    Get the component chemicals of this ChemicalProperties, or the atomic number, if this is an atom
    returns: The component
    */
    getChem(){
        return this.chem;
    }

    /**
    Set a new ChemicalProperties list.
    chem: Either a single integer, or the new list, where each list element should be a ChemProperties
    */
    setChem(chem){
        this.chem = chem;
    }

    /**
    Get the count of component chemicals of this ChemicalProperties.
    returns: The count
    */
    getCount(){
        return this.count;
    }

    /**
    Set the count of the number of of atoms or molecules
    count: The new count
    */
    setCount(count){
        this.count = count;
    }

    /**
    Get the creator of this ChemProperties
    return: The creator
    */
    getCreator(){
        return this.creator;
    }

    /**
    Set the creator of this ChemProperties
    creator: The creator
    */
    setCreator(creator){
        this.creator = creator;
    }

    /**
    Get the getID used to refer to this ChemProperties by the database.
    returns: The id
    Always throws an error as a generic ChemProperties object
    */
    getID(){
        throw new Error("All ChemProperties objects must implement getID");
    }

    /**
    Get the name used to refer to this ChemProperties in plain english.
    returns: The name
    Always throws an error as a generic ChemProperties object
    */
    getName(){
        throw new Error("All ChemProperties objects must implement getName");
    }

    /**
    Get the symbol used to refer to this ChemProperties in plain english.
    returns: The symbol
    Always throws an error as a generic ChemProperties object
    */
    getSymbol(){
        throw new Error("All ChemProperties objects must implement getSymbol");
    }

    /*
    Get the texture for rendering this ChemProperties. Should be a list of 3 or 4 values,
        each in the range [0-255], the list should be [red, green, blue, alpha], alpha is optional
    returns: The texture
    Always throws an error as a generic ChemProperties object
    */
    getTexture(){
        throw new Error("All ChemProperties objects must implement getTexture");
    }

    /**
    Get the molar mass of the chemical, including all of its components
    returns: The molar mass
    Always throws an error as a generic ChemProperties object
    */
    getMolarMass(){
        throw new Error("All ChemProperties objects must implement getMolarMass");
    }

    /**
    Get the temperature at which the chemical melts
    returns: The temperature, in Celsius
    Always throws an error as a generic ChemProperties object
    */
    getMeltingPoint(){
        throw new Error("All ChemProperties objects must implement getMeltingPoint");
    }

    /**
    Get the temperature at which the chemical boils
    returns: The temperature, in Celsius
    Always throws an error as a generic ChemProperties object
    */
    getBoilingPoint(){
        throw new Error("All ChemProperties objects must implement getBoilingPoint");
    }

    /**
    Get the density of the chemical
    returns: The density
    Always throws an error as a generic ChemProperties object
    */
    getDensity(){
        throw new Error("All ChemProperties objects must implement getDensity");
    }

}


/**
A class keeping track of ChemProperties, but one which is specifically an element
*/
class ElementProperties extends ChemProperties{
    /**
    Create new ElementProperties, using the given stats.
    atomicNumber: A single integer for the atomic number
    creator: The name of the creator of this ElementProperties.
    */
    constructor(atomicNumber, creator = null){
        super(atomicNumber, 1, creator);
        let newElement = ELEMENT_PROPERTIES[atomicNumber];
        if(newElement !== undefined) this.setCreator(newElement[ELEMENT_PROPERTY_CREATOR]);
    }

    /**
    Get the atomic number of the element.
    returns: The atomic number
    */
    getAtomicNumber(){
        return this.chem;
    }

    /**
    Get the properties based on this ElementProperties atomic number
    return: The properties, or an empty object if no entry exists with the given atomic number
    */
    chemFromProperties(){
        let c = ELEMENT_PROPERTIES[this.getAtomicNumber()];
        return (c === undefined) ? {} : c;
    }

    /**
    Get the getID used to refer to this ElementProperties by the database. Should simply be the atomic number
    returns: The id
    */
    getID(){
        return this.getAtomicNumber();
    }

    /**
    Get the name used to refer to this ChemProperties in plain english.
    returns: The name
    */
    getName(){
        return this.chemFromProperties()[ELEMENT_PROPERTY_NAME];
    }

    /**
    Get the symbol used to refer to this ChemProperties in plain english.
    returns: The symbol
    */
    getSymbol(){
        let s = this.chemFromProperties()[ELEMENT_PROPERTY_SYMBOL];
        return (s === undefined) ? "" : s;
    }

    /*
    Get the texture for rendering this ElementProperties.
    returns: The texture
    */
    getTexture(){
        return this.chemFromProperties()[ELEMENT_PROPERTY_TEXTURE];
    }

    /**
    Get the molar mass of the element
    returns: The molar mass
    */
    getMolarMass(){
        return this.chemFromProperties()[ELEMENT_PROPERTY_MOLAR_MASS];
    }

    /**
    Get the temperature at which the element melts
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return this.chemFromProperties()[ELEMENT_PROPERTY_MELTING_POINT];
    }

    /**
    Get the temperature at which the element boils
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return this.chemFromProperties()[ELEMENT_PROPERTY_BOILING_POINT];
    }

    /**
    Get the density of the element
    returns: The density
    */
    getDensity(){
        return this.chemFromProperties()[ELEMENT_PROPERTY_DENSITY];
    }

}

/**
A class keeping track of ChemProperties, but one which is specifically a compound
*/
class CompoundProperties extends ChemProperties{
    /**
    Create new ChemProperties, using the given stats.
    chem: A list of ChemProperties objects
    count: The number of molecules of the compound, i.e. a hydrogen molecule has a count of 2, and a hydrogen atom has a count of 1
    creator: The name of the creator of this ChemProperties.
    id: The integer ID used to refer to this CompoundProperties by the database, should not be an atomic number
    name: The name of this ChemProperties.
    texture: The texture to use for the compound, should be a list of 3 or 4 values,
        each in the range [0-255], the list should be [red, green, blue, alpha], alpha is optional
    meltingPoint: The temperature, in celsius, at which the compound melts.
    boilingPoint: The temperature, in celsius, at which the compound boils.
    density: The density of the compound.
    */
    constructor(chem, count, creator, id, name, texture, meltingPoint, boilingPoint, density){
        super(chem, count, creator);

        this.id = id;
        this.name = name;
        this.texture = texture;
        this.meltingPoint = meltingPoint;
        this.boilingPoint = boilingPoint;
        this.density = density;
    }

    /**
    Get the getID used to refer to this CompoundProperties by the database.
    returns: The id
    */
    getID(){
        return this.id;
    }

    /**
    Get the name used to refer to this ChemProperties in plain english.
    returns: The name
    */
    getName(){
        return this.name;
    }

    /**
    Get the symbol used to refer to this ChemProperties in plain english.
    returns: The symbol
    */
    getSymbol(){
        let c = this.getChem();
        let oneChem = c.length > 1
        var symbol = oneChem ? "(" : "";
        for(var i = 0; i < c.length; i++) symbol += c[i].getSymbol();
        symbol += oneChem ? ")" : "";
        let num = this.getCount();
        return ((num === 1) ? "" : num) + symbol;
    }

    /*
    Get the texture for rendering this CompoundProperties.
    returns: The texture
    */
    getTexture(){
        return this.texture;
    }

    /**
    Get the molar mass of the compound, including all of its components
    returns: The molar mass
    */
    getMolarMass(){
        var total;
        total = 0;
        let c = this.getChem();
        for(var i = 0; i < c.length; i++){
            total += c[i].getMolarMass();
        }
        return this.count * total;
    }

    /**
    Get the temperature at which the compound melts
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return this.meltingPoint;
    }

    /**
    Get the temperature at which the compound boils
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return this.boilingPoint;
    }

    /**
    Get the density of the compound
    returns: The density
    */
    getDensity(){
        return this.density;
    }
}


// Constants for indexing elements
let ELEMENT_HYDROGEN_ATOMIC_NUM = 1;
let ELEMENT_HELIUM_ATOMIC_NUM = 2;
let ELEMENT_LITHIUM_ATOMIC_NUM = 3;

// A test "database" holding a few chemical properties
let ELEMENT_PROPERTY_SYMBOL = "symbol";
let ELEMENT_PROPERTY_NAME = "name";
let ELEMENT_PROPERTY_CREATOR = "creator";
let ELEMENT_PROPERTY_TEXTURE = "texture";
let ELEMENT_PROPERTY_ATOMIC_NUMBER = "atomicNumber";
let ELEMENT_PROPERTY_MOLAR_MASS = "molarMass";
let ELEMENT_PROPERTY_MELTING_POINT = "meltingPoint";
let ELEMENT_PROPERTY_BOILING_POINT = "boilingPoint";
let ELEMENT_PROPERTY_DENSITY = "density";

let ELEMENT_PROPERTIES;

function initTestChemProperties(){

    let makeChem = function(chemList, symbol, name, creator, texture, atomicNumber, molarMass, meltingPoint, boilingPoint, density){
        chemList[atomicNumber] = {};
        let c = chemList[atomicNumber];
        c[ELEMENT_PROPERTY_SYMBOL] = symbol;
        c[ELEMENT_PROPERTY_NAME] = name;
        c[ELEMENT_PROPERTY_CREATOR] = creator;
        c[ELEMENT_PROPERTY_TEXTURE] = texture;
        c[ELEMENT_PROPERTY_ATOMIC_NUMBER] = atomicNumber;
        c[ELEMENT_PROPERTY_MOLAR_MASS] = molarMass;
        c[ELEMENT_PROPERTY_MELTING_POINT] = meltingPoint;
        c[ELEMENT_PROPERTY_BOILING_POINT] = boilingPoint;
        c[ELEMENT_PROPERTY_DENSITY] = density;
    }

    let chems = [];
    chems[0] = null;
    makeChem(chems, "H", "Hydrogen", "Nature", [255, 255, 200], ELEMENT_HYDROGEN_ATOMIC_NUM, 1.008, -259, -253, 0.09);
    makeChem(chems, "He", "Helium", "Nature", [255, 255, 150], ELEMENT_HELIUM_ATOMIC_NUM, 4.003, -272, -269, 0.18);
    makeChem(chems, "Li", "Lithium", "Nature", [200, 200, 255], ELEMENT_LITHIUM_ATOMIC_NUM, 6.941, 180, 1347, 0.53);

    makeChem(chems, "Ruu", "Red", "Fake", [255, 0, 0], ID_CHEM_TEST_RED, 9, 100, 0, 1);
    makeChem(chems, "Blu", "Blue", "Fake", [0, 0, 255], ID_CHEM_TEST_BLUE, 9, 100, 0, 1);
    makeChem(chems, "Wuu", "White", "Fake", [255, 255, 255], ID_CHEM_TEST_WHITE, 9, 100, 0, 1);
    makeChem(chems, "Guu", "Green", "Fake", [0, 255, 0], ID_CHEM_TEST_GREEN, 9, 100, 0, 1);
    makeChem(chems, "Buu", "Black", "Fake", [0, 0, 0], ID_CHEM_TEST_BLACK, 9, 100, 0, 1);

    ELEMENT_PROPERTIES = chems;
}