package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonSubTypes.Type
import com.fasterxml.jackson.annotation.JsonTypeInfo

/**
 *  Superclass that contains information about an object in the experiment
 *  Includes: name
 */


@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)

@JsonSubTypes(
        Type(ChemicalObject::class, name="chemical"),
        Type(EquipmentObject::class, name="equipment")
)

open class ExperimentObject (_name : Int)

{
    var name : Int = _name


    constructor(name : Object) : this(name as String){

    }

    abstract override fun toString(): String
}
