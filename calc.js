/*
*Author: Brandon Green
*Script Description: Basic Calculator
*Original Script written 8/23/23
*Version: 1.1
*/

const data = {
	firstNum: 0,
	operator: '',
	secondNum: 0,
};

//Function that clears display and resets all calculator data to defaults.
function clearCalc() {
	//console.log('clearCalc() called!');
	//document.getElementById('result').value = '0';
	clearEntry();
	
	data.firstNum = 0;
	data.operator = '';
	data.secondNum = 0;
	//console.log('FIXME: data.firstNum: ' + data.firstNum);
	//console.log('FIXME: data.operator: ' + data.operator);
	//console.log('FIXME: data.secondNum: ' + data.secondNum);
	console.log('Calculator data cleared.');
	//console.log('results: ' + document.getElementById('result').value);
}

function clearEntry() {
	//console.log('clearEntry() called!');
	document.getElementById('result').value = '0';
	console.log('Calculator display has been cleared.');
	//console.log('results: ' + document.getElementById('result').value);
}

function backspace() {
	console.log('backspace() called!');
	let resultsStr = document.getElementById('result').value;
	document.getElementById('result').value = resultsStr.substring(0, resultsStr.length - 1);
	
	if(document.getElementById('result').value === '') {
		document.getElementById('result').value = '0';
	}
	
}

function display(input) {
    //console.log('display(' + input + ') has been called!');
    
    //Check if the display is set to 0, if it is replace it by the value of parameter.
    if(document.getElementById('result').value === '0') {
        //console.log('result is 0');
        
        if(input === '.') {
        	document.getElementById('result').value += input;
        }
        
        else {
        document.getElementById('result').value = input;
        }   
    }
    
    else {
    	//If result/display already contains a decimal point, prevent it from being added a 2nd time.
    	if(input === '.' && document.getElementById('result').value.includes('.')) {
    		return;
    	}
    	document.getElementById('result').value += input;
    }
    
    console.log('getLastChar(): ' + getLastChar());
}

function operatorKey(operator) {

	if(!isNaN(document.getElementById('result').value)) {
		if(data.firstNum !== document.getElementById('result').value && data.firstNum !== 0) {
			data.operator = operator;
		}
		
		else {
			data.firstNum = Number(document.getElementById('result').value);
			data.operator = operator;
		}
		
		console.log('FIXME: data.firstNum: ' + data.firstNum);
		console.log('FIXME: data.operator: ' + data.operator);
		console.log('FIXME: data.secondNum: ' + data.secondNum);
		
		clearEntry();
		
	}
	
	else {
		document.getElementById('result').value = 'Error: Input was not a number!';
	}
}

function callCalculate() {
	console.log('callCalculate() called!');
	
	if(data.operator === '') {
		return;
	}
	
	if(!isNaN(document.getElementById('result').value)) {
	
	//Set secondNum to whatever value results.value is set to.
	data.secondNum = Number(document.getElementById('result').value);
	console.log('data.secondNum: ' + data.secondNum);
	
	let result = calculate(data.firstNum, data.operator, data.secondNum);
	
	//Checks if result is a floating point number, if it is rounds number up to 2 decimal places.
	if(isFloat(result)) {
		result = parseFloat(result).toFixed(2);
	}
	
	console.log('result: ' + result);
	
	if(result === 'Infinity') {
		document.getElementById('result').value = 'Error: Cannot divide by zero!'
		console.log('Divide by zero error detected!');
	}
	
	else {
		document.getElementById('result').value = result;
	}

	data.firstNum = result;
	data.operator = '';
	//console.log('FIXME: data.firstNum: ' + data.firstNum);
	}
	
	else {
		document.getElementById('result').value = 'Error: Input was not a number!';
	}
}

function calculate(firstNum, operator, secondNum) {
	console.log('calculate() called!');
	
	switch(operator) {
		case '/': 
			console.log('Calculating ' + firstNum + ' / ' + secondNum);
			return firstNum / secondNum; 
			
		case '-':
			console.log('Calculating ' + firstNum + ' - ' + secondNum);
			return firstNum - secondNum; 
			
		case '+': 
			console.log('Calculating ' + firstNum + ' + ' + secondNum);
			return firstNum + secondNum;
			
		case '*': 
			console.log('Calculating ' + firstNum + ' * ' + secondNum);
			return firstNum * secondNum;
			
		default: 
			console.log('FIXME: default case returned.');
			return;
	}
}

//Checks if a number is a floating point number or not.
function isFloat(number) {
	return number % 1 !== 0;
}

//Return the last character in the display
function getLastChar() {
	let resultsStr = document.getElementById('result').value;
	return resultsStr.substring(resultsStr.length - 1, resultsStr.length);
}

//Clear the calculator whenever the page is loaded or refreshed
window.onload = function() {
  clearCalc();
};
