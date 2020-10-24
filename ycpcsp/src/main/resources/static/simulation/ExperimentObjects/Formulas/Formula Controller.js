class FormulaController{

    // This Formula takes a list of chemicals that are then iterated through till a matching set of products are found and then returns the chemical formula.
    getFormula(ListOfChemsFormulas, ProductA, ProductB) {
        for(var i = 0, size = ListOfChemsFormulas.length; i < size ; i++){
            var FormulaMaybe = ListOfChemsFormulas[i];
            if((FormulaMaybe.getProductA() == ProductA || FormulaMaybe.getProductA() == ProductB) && (FormulaMaybe.getProductB() == ProductA || FormulaMaybe.getProductB() == ProductB)){
                return  ListOfChemsFormulas[i];
            }
        }
    }

    //Takes in a Formula and gets the output chemical.
    getForumlaOutputChemical(Forumla){
        return Formula.getOutputChemical();
    }

}