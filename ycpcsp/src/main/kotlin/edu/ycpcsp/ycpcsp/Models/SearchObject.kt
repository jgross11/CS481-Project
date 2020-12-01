package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a chemical used in an experiment
 *  Contains name (inherited from ExperimentObject), quantity, and concentration
 */

@JsonTypeName("chemical")

data class SearchObject(
        var id : String,
        var title : String,
        var CreatorName : String
)

{
    override fun toString(): String {
        return "$id $title $CreatorName"
    }
}