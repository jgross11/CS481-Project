
package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException
import edu.ycpcsp.ycpcsp.Models.*

//enum class UserFields {FirstName, LastName, Email, Password, School}
var ID = 1
var FirstName = 2
var LastName = 3
var Email = 4
var Password = 5
var School = 6

fun LoadUser(email: String): User {
    val connection = getDBConnection()

    try {
        if(connection != null) {
            var preparedSt = connection.prepareStatement("SELECT * FROM Database.Users where email = ?;")
            preparedSt.setString(1, email)
            var rs = preparedSt.executeQuery()

            try {
                return if (rs.first()) {
                    var user = User(rs.getString(FirstName), rs.getString(LastName), rs.getString(Email), rs.getString(Password), rs.getString(School), rs.getInt(ID))

                    // attempt to populate user experiment array with preview information
                    preparedSt = connection.prepareStatement("SELECT Experiments.ExperimentsID, Experiments.title FROM Database.Experiments WHERE Experiments.creatorID = ?")
                    preparedSt.setInt(1, user.id)
                    rs = preparedSt.executeQuery()

                    // if user has at least one experiment
                    if(rs.first()) {
                        rs.last()
                        val numExperiments = rs.row
                        rs.first()
                        var userExperimentArr = Array<Experiment>(numExperiments){Experiment()}

                        // populate an array with each experiment's information
                        for(i in 0 until numExperiments){
                            userExperimentArr[i] = Experiment(rs.getString(2), user.getFullName(), rs.getInt(1));
                            rs.next()
                        }
                        // set the user's experiment array to the constructed one
                        user.experiments = userExperimentArr
                    }

                    // attempt tp populate user playlist array
                    // select all of the playlist preview info for each playlist
                    preparedSt = connection.prepareStatement("SELECT Playlist_Name, Playlist_ID FROM Database.Playlist WHERE user_ID = ?")
                    preparedSt.setInt(1, user.id)
                    rs = preparedSt.executeQuery()
                    if(rs.first()){
                        rs.last()
                        val numPlaylists = rs.row
                        rs.first()

                        // create user playlist array
                        var userPlaylistArr = Array<PlayList>(numPlaylists){PlayList()}

                        // populate each playlist with its information
                        for(i in 0 until numPlaylists){
                            val playList = PlayList(user.id, rs.getString(1), rs.getInt(2))
                            println(playList.toString())
                            // obtain the information for a specific experiment and populate it
                            val ps2 = connection.prepareStatement("SELECT Database.Experiments.*, Database.Users.firstName, Database.Users.lastName FROM Database.Playlist_Experiments JOIN Database.Experiments ON Playlist_Id = ? AND Experiment_ID = ExperimentsID JOIN Database.Users ON CreatorID = UserID")
                            ps2.setInt(1, playList.playlistID)
                            val rs2 = ps2.executeQuery()
                            if(rs2.last()){
                                val numPlaylistEntries = rs2.row
                                rs2.first()
                                val playlistEntries = Array<PlaylistObject>(numPlaylistEntries){PlaylistObject()}

                                // populate playlist entry list with obtained information
                                for(x in 0 until numPlaylistEntries){
                                   playlistEntries[x] = PlaylistObject(rs2.getInt(1), rs2.getInt(3), rs2.getString(2), rs2.getString(5), rs2.getString(6))
                                    rs2.next()
                                }

                                // add playlist entries list to playlist
                                playList.entries = playlistEntries
                            }

                            // add fully populated playlist to user playlist list
                            userPlaylistArr[i] = playList
                            println(userPlaylistArr[i])
                            rs.next()
                        }

                        // set fully populated playlist list to user playlist list
                        user.playlists = userPlaylistArr
                    }

                    // return constructed user object
                    user
                } else {
                    User()
                }
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            return User()
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return User()
}