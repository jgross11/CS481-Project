package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains all relevant information for a chemical equation.
 *
 * equationID - the ID of this equation in the DB
 * reactantString - a string containing the reactant side of the equation ex. Na + Cl
 * productString - a string containing the product side of the equation ex. NaCl
 * creatorID - the ID of this equations' creator in the DB
 */

class ChemicalEquation (var equationID : Int, var reactantString : String, var productString : String, var creatorID : Int){

    // null constructor
    constructor() : this(-1, "", "", -1){

    }

    // used when compound is first created on FE and given to BE (before ID exists in DB)
    constructor(reactantString: String, productString: String, creatorID: Int) : this(-1, reactantString, productString, creatorID){

    }

    override fun toString() : String{
        return "$reactantString -> $productString, created by $creatorID with ID $equationID"
    }

}