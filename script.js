  function getHistory() {
    let history = document.getElementById("history").innerHTML;
    return history;
  }
  function printHistory(num) {
    let history = document.getElementById("history");
    history.innerHTML = num;
  }
  function getOutput() {
    let output = document.getElementById("output").innerHTML;
    return output;
  }
  function printOutput(num) {
    let output = document.getElementById("output");
    if(num === '') {
      output.innerHTML = "";
    }
    else if(num === 0) {
      output.innerHTML = "0";
    }
    else if(num == '-') {
      output.innerHTML = "";
    }
    else {
      num = Number(num);
      num = num.toLocaleString('en');
      output.innerHTML = num;
    }
  }
  function reverseNumber(num) {
    if(num == '') {
      return '';
    }
      return Number(num.replace(/,/g,''));
  }

  const operator = document.querySelectorAll('#operator'),
        numbers = document.querySelectorAll('.numbers');
  operator.forEach(opera => {
    opera.addEventListener('click', (e) => {
      if(e.target.className === 'clear') {
        printOutput('');
        printHistory('');
      }
      else if(e.target.className === 'backspace') {
        let output = String(reverseNumber(getOutput()));
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
      else {
        let history = getHistory();
        let output = getOutput();
        output = reverseNumber(output);
        if(output == '' && history != '') {
          if(isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
          }
        }
        if(output != '' || history != '') {
          history = history + output;
          if(e.target.className === 'equals') {
            let result = eval(history);
            printOutput(result);
            printHistory('');
          }
          else {
            history = history + e.target.getAttribute('data-key');
            printOutput('');
            printHistory(history);
          }
        }

      }
    })
  });
  numbers.forEach(number => {
    number.addEventListener('click', (e) => {
      let output = reverseNumber(getOutput());
      numberValue = output + number.innerHTML;
      printOutput(numberValue);
    })
  });