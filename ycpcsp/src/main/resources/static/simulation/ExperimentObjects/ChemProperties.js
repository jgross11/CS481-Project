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
        let newElement = CHEM_PROPERTIES[atomicNumber];
        if(newElement !== undefined) this.setCreator(newElement[CHEM_PROPERTY_CREATOR]);
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
        let c = CHEM_PROPERTIES[this.getAtomicNumber()];
        return (c === undefined) ? {} : c;
    }

    /**
    Get the name used to refer to this ChemProperties in plain english.
    returns: The name
    */
    getName(){
        return this.chemFromProperties()[CHEM_PROPERTY_NAME];
    }

    /**
    Get the symbol used to refer to this ChemProperties in plain english.
    returns: The symbol
    */
    getSymbol(){
        let s = this.chemFromProperties()[CHEM_PROPERTY_SYMBOL];
        return (s === undefined) ? "" : s;
    }

    /**
    Get the molar mass of the element
    returns: The molar mass
    */
    getMolarMass(){
        return this.chemFromProperties()[CHEM_PROPERTY_MOLAR_MASS];
    }

    /**
    Get the temperature at which the element melts
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return this.chemFromProperties()[CHEM_PROPERTY_MELTING_POINT];
    }

    /**
    Get the temperature at which the element boils
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return this.chemFromProperties()[CHEM_PROPERTY_BOILING_POINT];
    }

    /**
    Get the density of the element
    returns: The density
    */
    getDensity(){
        return this.chemFromProperties()[CHEM_PROPERTY_DENSITY];
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
    name: The name of this ChemProperties.
    meltingPoint: The temperature, in celsius, at which the compound melts.
    boilingPoint: The temperature, in celsius, at which the compound boils.
    density: The density of the compound.
    */
    constructor(chem, count, creator, name, meltingPoint, boilingPoint, density){
        super(chem, count, creator);

        this.name = name;
        this.meltingPoint = meltingPoint;
        this.boilingPoint = boilingPoint;
        this.density = density;
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
let CHEM_PROPERTY_SYMBOL = "symbol";
let CHEM_PROPERTY_NAME = "name";
let CHEM_PROPERTY_CREATOR = "creator";
let CHEM_PROPERTY_ATOMIC_NUMBER = "atomicNumber";
let CHEM_PROPERTY_MOLAR_MASS = "molarMass";
let CHEM_PROPERTY_MELTING_POINT = "meltingPoint";
let CHEM_PROPERTY_BOILING_POINT = "boilingPoint";
let CHEM_PROPERTY_DENSITY = "density";

let CHEM_PROPERTIES;

function initTestChemProperties(){

    let makeChem = function(chemList, symbol, name, creator, atomicNumber, molarMass, meltingPoint, boilingPoint, density){
        chemList[atomicNumber] = {};
        let c = chemList[atomicNumber];
        c[CHEM_PROPERTY_SYMBOL] = symbol;
        c[CHEM_PROPERTY_NAME] = name;
        c[CHEM_PROPERTY_CREATOR] = creator;
        c[CHEM_PROPERTY_ATOMIC_NUMBER] = atomicNumber;
        c[CHEM_PROPERTY_MOLAR_MASS] = molarMass;
        c[CHEM_PROPERTY_MELTING_POINT] = meltingPoint;
        c[CHEM_PROPERTY_BOILING_POINT] = boilingPoint;
        c[CHEM_PROPERTY_DENSITY] = density;
    }

    let chems = [];
    chems[0] = null;
    makeChem(chems, "H", "Hydrogen", "Nature", ELEMENT_HYDROGEN_ATOMIC_NUM, 1.008, -259, -253, 0.09);
    makeChem(chems, "He", "Helium", "Nature", ELEMENT_HELIUM_ATOMIC_NUM, 4.003, -272, -269, 0.18);
    makeChem(chems, "Li", "Lithium", "Nature", ELEMENT_LITHIUM_ATOMIC_NUM, 6.941, 180, 1347, 0.53);

    CHEM_PROPERTIES = chems;
}