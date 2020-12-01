package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.PostDataClasses.EditUserFormData
import java.sql.SQLException

fun ModifyUser(): Boolean {
    var connection = getDBConnection()

    try {
        if(connection != null) {

            try {
                //code for creating the database tables, add when necessary
                //Make sure to manually update when tables are updated

                //statement for Users table
                var preparedSt = connection.prepareStatement("CREATE TABLE `Users` (\n" +
                        "  `UserID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `firstName` varchar(45) DEFAULT NULL,\n" +
                        "  `lastName` varchar(45) DEFAULT NULL,\n" +
                        "  `email` varchar(100) DEFAULT NULL,\n" +
                        "  `password` varchar(255) DEFAULT NULL,\n" +
                        "  `organization` varchar(255) DEFAULT NULL,\n" +
                        "  `question1` varchar(255) DEFAULT NULL,\n" +
                        "  `question2` varchar(255) DEFAULT NULL,\n" +
                        "  `question3` varchar(255) DEFAULT NULL,\n" +
                        "  `ans1` varchar(255) DEFAULT NULL,\n" +
                        "  `ans2` varchar(255) DEFAULT NULL,\n" +
                        "  `ans3` varchar(255) DEFAULT NULL,\n" +
                        "  PRIMARY KEY (`UserID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;")
                preparedSt.executeUpdate()

                //Admin users table
                preparedSt = connection.prepareStatement("CREATE TABLE `Admin_Users` (\n" +
                        "  `auID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `firstName` varchar(45) DEFAULT NULL,\n" +
                        "  `lastName` varchar(45) DEFAULT NULL,\n" +
                        "  `email` varchar(100) DEFAULT NULL,\n" +
                        "  `password` varchar(255) DEFAULT NULL,\n" +
                        "  `organization` varchar(255) DEFAULT NULL,\n" +
                        "  `question1` varchar(255) DEFAULT NULL,\n" +
                        "  `question2` varchar(255) DEFAULT NULL,\n" +
                        "  `question3` varchar(255) DEFAULT NULL,\n" +
                        "  `ans1` varchar(255) DEFAULT NULL,\n" +
                        "  `ans2` varchar(255) DEFAULT NULL,\n" +
                        "  `ans3` varchar(255) DEFAULT NULL,\n" +
                        "  PRIMARY KEY (`auID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;")
                preparedSt.executeUpdate()

                //Statement for Chemical information
                preparedSt = connection.prepareStatement("CREATE TABLE `Chemical_Information` (\n" +
                        "  `idChemical_Information` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `Chemical_Formula` varchar(256) NOT NULL,\n" +
                        "  `Chemical_Name` varchar(256) NOT NULL,\n" +
                        "  `Chemical_Mass` float NOT NULL,\n" +
                        "  `Chemical_Density` float NOT NULL,\n" +
                        "  `Chemical_Water_Soluble` bit(1) NOT NULL,\n" +
                        "  `Chemical_Phase_Change_Solid` float NOT NULL,\n" +
                        "  `Chemical_Phase_Change_Gas` float NOT NULL,\n" +
                        "  PRIMARY KEY (`idChemical_Information`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Chemicals table
                preparedSt = connection.prepareStatement("CREATE TABLE `Chemicals` (\n" +
                        "  `ChemicalID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `experiment_ID` int(11) DEFAULT NULL,\n" +
                        "  `type_id` int(11) DEFAULT NULL,\n" +
                        "  `mass` double NOT NULL DEFAULT '1',\n" +
                        "  `concentration` double NOT NULL DEFAULT '1',\n" +
                        "  PRIMARY KEY (`ChemicalID`),\n" +
                        "  KEY `Chemicals_ibfk_1` (`experiment_ID`),\n" +
                        "  CONSTRAINT `Chemicals_ibfk_1` FOREIGN KEY (`experiment_ID`) REFERENCES `Experiments` (`ExperimentsID`) ON DELETE CASCADE\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //ChemistryGraphics table
                preparedSt = connection.prepareStatement("CREATE TABLE `ChemistryGraphics` (\n" +
                        "  `ChemistryGraphicsID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `ChemicalID` int(11) NOT NULL,\n" +
                        "  `GasInteger` int(32) NOT NULL,\n" +
                        "  `LiquidInteger` int(32) NOT NULL,\n" +
                        "  `SolidInteger` int(32) NOT NULL,\n" +
                        "  PRIMARY KEY (`ChemistryGraphicsID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;")
                preparedSt.executeUpdate()

                //Equations_Information tables
                preparedSt = connection.prepareStatement("CREATE TABLE `Equations_Information` (\n" +
                        "  `idEquations_Information` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `Equations_ReactantString` varchar(45) DEFAULT NULL,\n" +
                        "  `Equations_ProductString` varchar(45) DEFAULT NULL,\n" +
                        "  `Equations_CreatorID` int(11) DEFAULT NULL,\n" +
                        "  PRIMARY KEY (`idEquations_Information`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;")
                preparedSt.executeUpdate()

                //Equipments table
                preparedSt = connection.prepareStatement("CREATE TABLE `Equipments` (\n" +
                        "  `Equipment_ID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `experiment_ID` int(11) DEFAULT NULL,\n" +
                        "  `object_ID` int(11) DEFAULT NULL,\n" +
                        "  `amount` int(11) NOT NULL DEFAULT '0',\n" +
                        "  PRIMARY KEY (`Equipment_ID`),\n" +
                        "  KEY `Equipments_ibfk_1` (`experiment_ID`),\n" +
                        "  CONSTRAINT `Equipments_ibfk_1` FOREIGN KEY (`experiment_ID`) REFERENCES `Experiments` (`ExperimentsID`) ON DELETE CASCADE\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Experiment Equation table
                preparedSt = connection.prepareStatement("CREATE TABLE `Experiment_Equation` (\n" +
                        "  `idExperiment_Equation` int(11) NOT NULL,\n" +
                        "  `Experiment_InformationID` int(11) NOT NULL,\n" +
                        "  `ExperimentID` int(11) NOT NULL,\n" +
                        "  PRIMARY KEY (`idExperiment_Equation`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Experiments Table
                preparedSt = connection.prepareStatement("CREATE TABLE `Experiments` (\n" +
                        "  `ExperimentsID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `title` varchar(255) DEFAULT NULL,\n" +
                        "  `creatorID` int(11) DEFAULT NULL,\n" +
                        "  `tags` binary(200) DEFAULT '0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0',\n" +
                        "  PRIMARY KEY (`ExperimentsID`),\n" +
                        "  KEY `Users tables key_idx` (`creatorID`),\n" +
                        "  CONSTRAINT `Users tables key` FOREIGN KEY (`creatorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Playlist tables
                preparedSt = connection.prepareStatement("CREATE TABLE `Playlist` (\n" +
                        "  `Playlist_ID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `user_ID` int(11) NOT NULL,\n" +
                        "  `experiment_ID` int(11) NOT NULL,\n" +
                        "  `ExperimentDate` int(11) DEFAULT NULL,\n" +
                        "  `ExperimentName` varchar(45) DEFAULT NULL,\n" +
                        "  `Playlist_Name` varchar(45) DEFAULT NULL,\n" +
                        "  PRIMARY KEY (`Playlist_ID`),\n" +
                        "  KEY `Playlist_ibfk_1` (`experiment_ID`),\n" +
                        "  KEY `Playlist_ibfk_2` (`user_ID`),\n" +
                        "  CONSTRAINT `Playlist_ibfk_1` FOREIGN KEY (`experiment_ID`) REFERENCES `Experiments` (`ExperimentsID`) ON DELETE CASCADE,\n" +
                        "  CONSTRAINT `Playlist_ibfk_2` FOREIGN KEY (`user_ID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Quarantine_Users table
                preparedSt = connection.prepareStatement("CREATE TABLE `Quarantine_Users` (\n" +
                        "  `quID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `firstName` varchar(45) DEFAULT NULL,\n" +
                        "  `lastName` varchar(45) DEFAULT NULL,\n" +
                        "  `email` varchar(100) DEFAULT NULL,\n" +
                        "  `password` varchar(255) DEFAULT NULL,\n" +
                        "  `organization` varchar(255) DEFAULT NULL,\n" +
                        "  `question1` varchar(255) DEFAULT NULL,\n" +
                        "  `question2` varchar(255) DEFAULT NULL,\n" +
                        "  `question3` varchar(255) DEFAULT NULL,\n" +
                        "  `ans1` varchar(255) DEFAULT NULL,\n" +
                        "  `ans2` varchar(255) DEFAULT NULL,\n" +
                        "  `ans3` varchar(255) DEFAULT NULL,\n" +
                        "  PRIMARY KEY (`quID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //RecentExperiments table
                preparedSt = connection.prepareStatement("CREATE TABLE `RecentExperiments` (\n" +
                        "  `UserId` int(11) NOT NULL,\n" +
                        "  `ExperimentName` varchar(45) NOT NULL,\n" +
                        "  `experiment_ID` int(11) NOT NULL,\n" +
                        "  `ExperimentDate` date NOT NULL,\n" +
                        "  PRIMARY KEY (`UserId`),\n" +
                        "  KEY `experiment_ID` (`experiment_ID`),\n" +
                        "  CONSTRAINT `RecentExperiments_ibfk_1` FOREIGN KEY (`experiment_ID`) REFERENCES `Experiments` (`ExperimentsID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Recovery_IDS
                preparedSt = connection.prepareStatement("CREATE TABLE `Recovery_IDS` (\n" +
                        "  `recoveryID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `userID` int(11) NOT NULL,\n" +
                        "  PRIMARY KEY (`recoveryID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()

                //Steps Tables
                preparedSt = connection.prepareStatement("CREATE TABLE `Steps` (\n" +
                        "  `StepsID` int(11) NOT NULL AUTO_INCREMENT,\n" +
                        "  `experiment_ID` int(11) DEFAULT NULL,\n" +
                        "  `step_number` int(11) NOT NULL DEFAULT '0',\n" +
                        "  `actor_index` int(11) NOT NULL DEFAULT '0',\n" +
                        "  `actor_ID` bit(1) DEFAULT b'0',\n" +
                        "  `receiver_index` int(11) NOT NULL DEFAULT '0',\n" +
                        "  `receiver_ID` bit(1) DEFAULT b'0',\n" +
                        "  `functionID` int(11) DEFAULT NULL,\n" +
                        "  PRIMARY KEY (`StepsID`)\n" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf32;\n")
                preparedSt.executeUpdate()


                //The method will return true if the query runs successfully
                return true
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            //The method will return false if the query was unsuccessful
            return false
        }
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //return false if the query was not successful
    return false
}