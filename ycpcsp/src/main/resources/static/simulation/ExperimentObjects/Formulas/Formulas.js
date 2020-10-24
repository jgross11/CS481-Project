class Formulas{
    // The Formula class will be made of for now will be three chemicals
    // Two Product chemicals these chemicals are the chemicals that are being mixed
    // the output chemical is the output of the two product chemicals when combined
    constructor(productA, productB, output) {
        this.productA = productA;
        this.productB = productB;
        this.output = output;
    }
    // setters should not be needed since the class
    getProductA(){
        return this.productA;
    }

    getProductB(){
        return this.productB;
    }

    getOutputChemical(){
        return this.output;
    }

}