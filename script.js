const previousOpText = document.querySelector("#previous-op");
const currentOpText = document.querySelector("#current-op");
const button = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previousOpText, currentOpText){
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.currentOp = "";
    }

    // add numbers to calculator screen
    addDigit(digit){
        //check if there is already a point in the current operation
        if(digit === "." && this.currentOpText.innerText.includes(".")){
            return;
        }
        this.currentOp = digit;
        this.updateScreen();
    }

    //Process the calculator operations
    processOp(operation){
        // Check if current is empty
        if(currentOpText.innerText === "" && operation !== "C"){
            // Change the operation
            if(this.previousOpText.innerText !== ""){
                this.changeOp(operation);
            }
            return;
        }
        
        //Get current and previous value
        let opValue;
        const previous = +this.previousOpText.innerText.split(" ")[0];
        const current = +this.currentOpText.innerText;
        
        switch(operation){
            case "+":
                opValue = previous + current;
                this.updateScreen(opValue, operation, current, previous);
                break;
            case "-":
                opValue = previous - current;
                this.updateScreen(opValue, operation, current, previous);
                break;
            case "/":
                opValue = previous / current;
                this.updateScreen(opValue, operation, current, previous);
                break;
            case "*":
                opValue = previous * current;
                this.updateScreen(opValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOp();
                break;
            case "CE":
                this.processClearOp();
                break;
            case "C":
                this.processClearAllOp();
                break;
            case "=":
                this.processEqualOp();
                break;
            default:
                return;
        }

    }

    //Change values of the screen
    updateScreen(opValue = null, operation = null, current = null, previous = null ){
        console.log(opValue, operation, current, previous);
        
        if(opValue === null){
            this.currentOpText.innerText += this.currentOp;
        } else {
            //check if the value is zero, if the current value is added
            if(previous === 0){
                opValue = current;
            }

            //Add current values to previous 
            this.previousOpText.innerText = `${opValue} ${operation}`;
            this.currentOpText.innerText = "";
        }
    }
    // Change math operation 
    changeOp(operation){

        const mathOp = ["+", "-", "*", "/"];

        if(!mathOp.includes(operation)){
            return;
        }

        this.previousOpText.innerText = this.previousOpText.innerText.slice(0 , -1) + operation;
    }
    // OPERATION DEL is delet last digit
    processDelOp(){
        this.currentOpText.innerText = this.currentOpText.innerText.slice(0, -1);
    }

    // OPERATION CE is clear current operation 
    processClearOp(){
        this.currentOpText.innerText = "";
    }

    //OPERATION C is clear all operations
    processClearAllOp(){
        this.currentOpText.innerText = "";
        this.previousOpText.innerText = "";
    }

    //OPERATION "=" is process and operation
    processEqualOp(){
        const operation = previousOpText.innerText.split(" ")[1];
        this.processOp(operation);
    } 

}

const calc = new Calculator (previousOpText, currentOpText);

button.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText
    // differentiate numbers of operations    
    if(+value >= 0 || value === "."){
        calc.addDigit(value);
    }else{
        calc.processOp(value);
    } 
    });

});
