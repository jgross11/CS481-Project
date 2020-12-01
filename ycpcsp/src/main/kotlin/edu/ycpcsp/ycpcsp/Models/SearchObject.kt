package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a search object used in an search query
 *  Contains id, title, and creatorName
 */

@JsonTypeName("search")

data class SearchObject(
        var id : Int,
        var title : String,
        var creatorName : String
)

{
    override fun toString(): String {
        return "$id $title $creatorName"
    }
}