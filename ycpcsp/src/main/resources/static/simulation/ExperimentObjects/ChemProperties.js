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
    constructor(chem, count = 1, creator = null){
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
    count: The amount of the element in this ElementProperties
    creator: The name of the creator of this ElementProperties.
    */
    constructor(atomicNumber, count = 1, creator = null){
        super(atomicNumber, count, creator);
        let newElement = CHEMICAL_PROPERTIES[atomicNumber];
        if(newElement !== undefined) this.setCreator(newElement[CHEMICAL_PROPERTY_CREATOR]);
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
        let c = CHEMICAL_PROPERTIES[this.getAtomicNumber()];
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
    Get the name used to refer to this ElementProperties in plain english.
    returns: The name
    */
    getName(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_NAME];
    }

    /**
    Get the symbol used to refer to this ElementProperties in plain english.
    returns: The symbol
    */
    getSymbol(){
        let s = this.chemFromProperties()[CHEMICAL_PROPERTY_SYMBOL];
        if(s === undefined) return "";
        return (this.count === 1) ? s : s + this.count;
    }

    /*
    Get the texture for rendering this ElementProperties.
    returns: The texture
    */
    getTexture(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_TEXTURE];
    }

    /**
    Get the molar mass of the element
    returns: The molar mass
    */
    getMolarMass(){
        return this.count * this.chemFromProperties()[CHEMICAL_PROPERTY_MOLAR_MASS];
    }

    /**
    Get the temperature at which the element melts
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_MELTING_POINT];
    }

    /**
    Get the temperature at which the element boils
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_BOILING_POINT];
    }

    /**
    Get the density of the element
    returns: The density
    */
    getDensity(){
        return this.chemFromProperties()[CHEMICAL_PROPERTY_DENSITY];
    }

}

/**
A class keeping track of ChemProperties, but one which is specifically a compound
*/
class CompoundProperties extends ChemProperties{
    /**
    Create new CompoundProperties, using the given stats.
    id: The integer ID used to refer to this CompoundProperties by the database, should not be an atomic number.
        If this ID corresponds to a known compound, all parameters after count can be disregarded, and they will be set based on the ID
    count: The number of molecules of the compound
    creator: The name of the creator of this CompoundProperties.
    chem: A list of CompoundProperties objects
    name: The name of this CompoundProperties.
    texture: The texture to use for the compound, should be a list of 3 or 4 values,
        each in the range [0-255], the list should be [red, green, blue, alpha], alpha is optional
    meltingPoint: The temperature, in celsius, at which the compound melts.
    boilingPoint: The temperature, in celsius, at which the compound boils.
    density: The density of the compound.
    */
    constructor(id, count = 1, creator = null, chem = null, name = null, texture = null, meltingPoint = null, boilingPoint = null, density = null){
        super(chem, count, creator);

        this.id = id;
        let comp = CHEMICAL_PROPERTIES[id];
        if(comp === undefined){
            this.name = name;
            this.texture = texture;
            this.meltingPoint = meltingPoint;
            this.boilingPoint = boilingPoint;
            this.density = density;
        }
        else{
            this.creator = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_CREATOR];
            this.name = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_NAME];
            this.texture = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_TEXTURE];
            this.meltingPoint = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_MELTING_POINT];
            this.boilingPoint = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_BOILING_POINT];
            this.density = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_DENSITY];
            this.chem = CHEMICAL_PROPERTIES[id][CHEMICAL_PROPERTY_CHEMS];
        }
    }

    /**
    Get the getID used to refer to this CompoundProperties by the database.
    returns: The id
    */
    getID(){
        return this.id;
    }

    /**
    Get the name used to refer to this CompoundProperties in plain english.
    returns: The name
    */
    getName(){
        return this.name;
    }

    /**
    Get the symbol used to refer to this CompoundProperties in plain english.
    outer: When calling this method, always use no parameters, outer is only used for recursive calls.
        true if this call represents the outer layer of symbols, false otherwise
    returns: The symbol
    */
    getSymbol(outer = true){
        let c = this.getChem();
        let oneChem = c.length === 1;
        var parenthesis = !oneChem && !outer;

        var symbol = "";
        for(var i = 0; i < c.length; i++) symbol += c[i].getSymbol(false);
        let num = this.getCount();
        let oneNum = num === 1;
        parenthesis = !oneNum && !oneChem;
        let extra = !oneChem && !outer;
        return (extra ? "(" : "") +
               (oneNum ? "" : num) +
               (parenthesis ? "(" : "") +
               symbol +
               (parenthesis ? ")" : "") +
               (extra ? ")" : "");
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