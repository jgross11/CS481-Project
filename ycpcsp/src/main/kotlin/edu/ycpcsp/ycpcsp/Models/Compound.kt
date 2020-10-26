package edu.ycpcsp.ycpcsp.Models

class Compound (var formula : String, var name : String, var density : Double, var isWaterSoluable : Boolean, var solidTemp : Double, var gasTemp : Double, var liquidTemp : Double){

    constructor() : this("", "", 0.0, false, 0.0, 0.0, 0.0){

    }

    override fun toString() : String{
        return "$name: $formula, density=$density, watersoluble: $isWaterSoluable, gas @ ${gasTemp}C, liquid @ ${liquidTemp}C, solid @ ${solidTemp}C\n"
    }

}


//${comp.formula}, ${comp.name}, ${comp.solidTemp}, ${comp.gasTemp}, ${comp.gasTemp}