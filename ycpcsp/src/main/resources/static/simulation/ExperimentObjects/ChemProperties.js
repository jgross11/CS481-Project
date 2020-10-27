/**
An Object used to track properties of Chemicals using a tree structure.
Do not directly access or assign fields from this object, use getters and setters.
If no getter or setter exists, do not attempt to access or assign the field
*/
class ChemProperties{

    /**
    Create new ChemProperties, using the given stats. Only provide chem and count of this is an atom.
    chem: Either a list of ChemProperties objects, indicating that this is not a leaf of the properties tree,
        or a single integer for the atomic number, indicating that this is a leaf
    count: The number of atoms or molecules of this Chemical, i.e. a hydrogen molecule has a count of 2,
        and a hydrogen atom has a count of 1
    creator: The name of the creator of this ChemProperties. Do not use if this ChemProperties should be an atom.
    name: The name of this ChemProperties. Do not use if this ChemProperties should be an atom.
    meltingPoint: The temperature, in celsius, at which the chemical melts. Do not use if this ChemProperties should be an atom.
    boilingPoint: The temperature, in celsius, at which the chemical boils. Do not use if this ChemProperties should be an atom.
    density: The density of the chemical. Do not use if this ChemProperties should be an atom.
    */
    constructor(chem, count, creator = null, name = null, meltingPoint = null, boilingPoint = null, density = null){
        this.chem = chem;
        this.count = count;

        this.creator = creator;
        this.name = name;

        this.meltingPoint = meltingPoint;
        this.boilingPoint = boilingPoint;
        this.density = density;
    }

    /**
    Determine if this is a leaf of the tree, i.e. this is an atom with no further breaking down
    returns: true if this is an atom, false otherwise
    */
    isAtom(){
        return Array.isArray(this.chem);
    }

    /**
    Get the component chemicals of this ChemicalProperties, or the atomic number, if this is an atom
    returns: The component
    */
    getChem(){
        return chem;
    }

    /**
    Set a new ChemicalProperties list.
    chem: The new list, or one object
    */
    setChem(chem){
        if(chem instanceof ChemicalProperties) this.chem = (Array.isArray(chem)) ? chem : [chem];
        this.chem = chem;
    }

    /**
    Get the count of component chemicals of this ChemicalProperties.
    returns: The count
    */
    getCount(){
        return count;
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
    return: The creator, or "Element" if this is an atom
    */
    getCreator(){
        return (this.creator === null) ? "Element" : this.creator;
    }

    /**
    Get the name used to refer to this ChemProperties in plain english.
    */
    getName(){
        return (this.isAtom()) ? CHEM_PROPERTIES[this.getAtomicNumber()][CHEM_PROPERTY_NAME] : this.name;
    }

    /**
    Get the symbol used to refer to this ChemProperties in plain english.
    */
    getSymbol(){
        var symbol = "";
        if(this.isAtom){
            let s = CHEM_PROPERTIES[this.getAtomicNumber()][CHEM_PROPERTY_SYMBOL];
            symbol = (this.count === 1) ? s : (this.count + s);
        }
        else{
            let c = this.chems;
            symbol += "(";
            for(var i = 0; i < c.length; i++) symbol += c[i].getSymbol();
            symbol += ")";
        }
        return symbol;
    }

    /**
    Get the atomic number of this ChemProperties.
    returns: The atomic number if this ChemProperties is an atom, or null if it is not an atom
    */
    getAtomicNumber(){
        return (this.isAtom()) ? this.chem : null;
    }

    /**
    Get the molar mass of the chemical, including all of its components
    */
    getMolarMass(){
        var total;
        if(this.isAtom()) total = CHEM_PROPERTIES[this.getAtomicNumber][CHEM_PROPERTY_ATOMIC_NUMBER];
        else{
            total = 0;
            let c = this.chems;
            for(var i = 0; i < c.length; i++){
                total += c[i].getMolarMass();
            }
        }
        return this.count * total;
    }

    /**
    Get the temperature at which the chemical melts
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return (this.isAtom()) ? CHEM_PROPERTIES[this.getAtomicNumber()][CHEM_PROPERTY_MELTING_POINT] : this.meltingPoint;
    }

    /**
    Get the temperature at which the chemical boils
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return (this.isAtom()) ? CHEM_PROPERTIES[this.getAtomicNumber()][CHEM_PROPERTY_BOILING_POINT] : this.boilingPoint;
    }

    /**
    Get the density of the chemical
    returns: The density
    */
    getDensity(){
        return (this.isAtom()) ? CHEM_PROPERTIES[this.chem][CHEM_PROPERTY_DENSITY] : this.density;
    }

}


// A test "database" holding a few chemical properties
let CHEM_PROPERTY_SYMBOL = "symbol";
let CHEM_PROPERTY_NAME = "name";
let CHEM_PROPERTY_ATOMIC_NUMBER = "atomicNumber";
let CHEM_PROPERTY_MOLAR_MASS = "molarMass";
let CHEM_PROPERTY_MELTING_POINT = "meltingPoint";
let CHEM_PROPERTY_BOILING_POINT = "boilingPoint";
let CHEM_PROPERTY_DENSITY = "density";

let CHEM_PROPERTIES;

function initChemProperties(){

    let makeChem = function(symbol, name, atomicNumber, molarMass, meltingPoint, boilingPoint, density){
        let c = {};
        c[CHEM_PROPERTY_SYMBOL] = symbol;
        c[CHEM_PROPERTY_NAME] = name;
        c[CHEM_PROPERTY_ATOMIC_NUMBER] = atomicNumber;
        c[CHEM_PROPERTY_MOLAR_MASS] = molarMass;
        c[CHEM_PROPERTY_MELTING_POINT] = meltingPoint;
        c[CHEM_PROPERTY_BOILING_POINT] = boilingPoint;
        c[CHEM_PROPERTY_DENSITY] = density;
        return c;
    }

    let chems = [];
    chems.push(makeChem("H", "Hydrogen", 1, 1.001, -259, -269, 0.09));
    chems.push(makeChem("He", "Helium", 2, 4.003, -272, -253, 0.18));
    chems.push(makeChem("Li", "Lithium", 3, 6.941, 180, 1347, 0.53));

    CHEM_PROPERTIES = chems;
}