var ChemA;
var ChemB;
var OutputChem;
var FormulaForFun;
var FormulaControllerA;

QUnit.module("Formula", {
    beforeEach: function(){
        ChemA = new Chemical();
        ChemB = new Chemical();
        OutputChem = new Chemical();
        FormulaForFun = new Formulas(ChemA, ChemB, OutputChem);
        FormulaControllerA = new FormulaController();
    }
});


