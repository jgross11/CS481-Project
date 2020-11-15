/**
An abstract class used to track properties of Chemicals using a tree structure.
Do not directly access or assign fields from this object, use getters and setters.
If no getter or setter exists, do not attempt to access or assign the field
*/
class ChemProperties{

    /**
    Create new ChemProperties, used to access properties about a chemical
    id: A single integer identifying the chemical.
    */
    constructor(id){
        this.id = id;
    }

    /**
    Get the getID used to refer to this ChemProperties by the database.
    returns: The id
    */
    getID(){
        return this.id;
    }

    /**
    Get the properties based on this ChemProperties id
    return: The properties, or an empty object if no entry exists with the given ID
    */
    chemFromProperties(){
        let c = CHEMICAL_PROPERTIES[this.getID()];
        return (c === undefined) ? {} : c;
    }

    /**
    Get the creator of this ChemProperties
    return: The creator
    */
    getCreator(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_CREATOR];
    }

    /**
    Get the name used to refer to this ChemProperties in plain english.
    returns: The name
    */
    getName(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_NAME];
    }

    /**
    Get the symbol used to refer to this ChemProperties in plain english.
    returns: The symbol
    */
    getSymbol(){
        let s = this.chemFromProperties()[CHEMICAL_PROPERTY_SYMBOL];
        return (s === undefined) ? "" : s;
    }

    /*
    Get the color for rendering this ChemProperties when it is solid. Should be a list of 3 or 4 values,
        each in the range [0-255], the list should be [red, green, blue, alpha], alpha is optional
    returns: The color
    */
    getSolidColor(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_COLOR_SOLID];
    }

    /*
    Get the color for rendering this ChemProperties when it is liquid. Should be a list of 3 or 4 values,
        each in the range [0-255], the list should be [red, green, blue, alpha], alpha is optional
    returns: The color
    */
    getLiquidColor(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_COLOR_LIQUID];
    }

    /*
    Get the color for rendering this ChemProperties when it is a gas. Should be a list of 3 or 4 values,
        each in the range [0-255], the list should be [red, green, blue, alpha], alpha is optional
    returns: The color
    */
    getGasColor(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_COLOR_GAS];
    }

    /**
    Get the molar mass of the chemical, including all of its components
    returns: The molar mass
    */
    getMolarMass(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_MOLAR_MASS];
    }

    /**
    Get the temperature at which the chemical melts
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_MELTING_POINT];
    }

    /**
    Get the temperature at which the chemical boils
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_BOILING_POINT];
    }

    /**
    Get the density of the chemical
    returns: The density
    */
    getDensity(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_DENSITY];
    }

    /**
    Determine if this ChemProperties can be dissolved into water
    returns: true if it can be dissolved, false otherwise
    */
    getWaterSolubility(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_WATER_SOLUBLE];
    }
}

/**
A class tracking a ChemProperty and a count associated with it for use in CompoundProperties objects
*/
class CompoundComponent{
    /**
    Create a new CompoundComponent
    chemProp: The ChemProperties object to use for this CompoundComponent
    count: The number of chemProp which exist in this CompoundComponent
    */
    constructor(chemProp, count){
        this.chemProp = chemProp;
        this.count = count;
    }

    /**
    Set the specific ChemProperties of this CompoundComponent
    chemProp: The new ChemProperties
    */
    setChemProp(chemProp){
        this.chemProp = chemProp;
    }

    /**
    Set the count of the ChemProperties of this CompoundComponent
    count: The new count
    */
    setCount(count){
        this.count = count;
    }
}