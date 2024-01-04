document.addEventListener('DOMContentLoaded', function () {
    let input = document.getElementById('inputbox');
    let buttons = document.querySelectorAll('button');
    let string = "";

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            handleButtonClick(e.target.innerHTML);
        });
    });

//keyboard functionality
    document.addEventListener('keydown', function (e) {
      handleKeyPress(e.key);
  });

    function handleButtonClick(value) {
        switch (value) {
            case '=':
                string = evaluateExpression(string);
                break;
            case 'AC':
                string = "";
                break;
            case 'DEL':
                string = string.substring(0, string.length-1);
                break;
            default:
                string += value;
        }
        input.value = string;
    }

//for this function used for keyboard functionality
    function handleKeyPress(key) {
      // Check if the pressed key is a number, operator, or other valid input
      if (/[0-9+\-*/().%=]|Enter|Backspace/.test(key)) {
          if (key === 'Enter') {
              string = evaluateExpression(string);
          } else if (key === 'Backspace') {
              string = string.substring(0, string.length - 1);
          } else {
              string += key;
          }
          input.value = string;
      }
  }



    function evaluateExpression(expression) {
        try {
            // Use regular expression to allow only digits, operators, and parentheses
            const isValidInput = /^[0-9+\-*/()%.]*$/.test(expression);//boolean

            if (isValidInput) {
                const result = calculate(expression);
                localStorage.setItem(document.getElementById('inputbox').value, result);
                return result;
            }
        } catch (error) {
            return 'Error';
        }
    }

    //calculator operation
    function calculate(expression) {
        // Split the expression into operands and operators 
        const box = expression.match(/[+\-*/%.]|(?:\d+\.\d*|\d*\.\d+|\d+)/g);

        if (!box) {
            return 'Error';
      }

    var output = [];
    var opr = [];
 
    var precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '%': 2,
    };
 
    box.forEach(function(element) {
      if (element.match(/\d+(\.\d+)?/)) {
        output.push(parseFloat(element)); 
      }
       else if (element in precedence) {
        while ( opr.length > 0 &&  precedence[opr[opr.length - 1]] >= precedence[element]) {
          output.push(opr.pop()); 
        }
        opr.push(element);
      }
    });
 
    while (opr.length > 0) {
      output.push(opr.pop());
    }
 
    
 
    var result1= [];
    output.forEach(function(element) {
      
      if (typeof element === 'number') {
        result1.push(element);
      } else {
        var opnd2 = result1.pop();
        var opnd1 = result1.pop();
 
        switch (element) {
          case '+':
            result1.push(opnd1 + opnd2);
            
            break;
          case '-':
            result1.push(opnd1 - opnd2);
            break;
          case '*':
            result1.push(opnd1 * opnd2);
            break;
          case '/':
            if (opnd2 === 0) {
              throw new Error('Division by zero');
            }
            result1.push(opnd1 / opnd2);
            break;
        }
      }
    });
 
    if (result1.length !== 1) {
      throw new Error('Invalid expression');
    }

    return result1[0];
  }
 
});



