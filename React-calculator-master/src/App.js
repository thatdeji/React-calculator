import React, { useState } from 'react';
import './App.css';
import Button from './Button';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  //times used to store previous state if 2 operators are pressed consecutively
  const [times, setTimes] = useState(null);
  const [showPressed, setShowPressed] = useState('');

  const compute = (value) => () => {
    const displayNumber = Number(display);

    switch (value) {
      // Cancel functionality
      case 'C':
        setDisplay('0');
        setShowPressed('')
        setPreviousValue(null);
        setOperator(null);
        break;

      // Percentage functionality
      case '%':
        setDisplay(`${displayNumber / 100}`);
        setPreviousValue(null);
        setOperator(null);
        setShowPressed(`${displayNumber / 100}`)
        break;

      // ± functionality
      case '±':
        setDisplay(`${displayNumber * -1}`);
        setShowPressed(`${displayNumber * -1}`);
        break;

      // Append . functionality
      case '.':
        if (display.includes('.')) return;
        // if last pressed is = and . is pressed reset all values and start a new operation
        if(showPressed[showPressed.length -1] === '=') {
          setDisplay('0' + value);
          setShowPressed( '0' + value)
          setPreviousValue(null);
          setOperator(null);
        }else {
          setDisplay(display + '.');
          setShowPressed(`${showPressed}${value}`);
        }
        break;

      // Addition functionality
      case '+':
        setShowPressed(`${showPressed}+`)
        if (showPressed[showPressed.length - 1] === '=') {
          setShowPressed(`${display}${value}`)
        }
        if (operator !== null) {
          //  if plus is pressed after another operator, set operator to plus
          if (operator.length >= 2) {
            setOperator('+');
            setPreviousValue(times + displayNumber);
            console.log(operator);
          }
          if (operator === '+') {
            setPreviousValue(previousValue + displayNumber);
          } else if (operator === '-') {
            setOperator('+');
            setPreviousValue(previousValue - displayNumber);
          }
          // Allows chaining of operators
          else if (operator === '*' && display !== '0') {
            setOperator('+');
            setPreviousValue(previousValue * displayNumber);
          }
          // if times and plus are pressed consecutively set operator to plus. 5 * + 3 = 8
          else if (operator === '*' && display === '0') {
            setOperator('+');
          } else if (operator === '÷') {
            setPreviousValue(previousValue / displayNumber);
          }
        } else {
          setPreviousValue(displayNumber);
          setOperator('+');
        }
        setDisplay('0');
        break;

      // Subtract functionality
      case '-':
        setShowPressed(`${showPressed}-`)
        if (showPressed[showPressed.length - 1] === '=') {
          setShowPressed(`${display}${value}`)
        }
        if (operator !== null) {
          if (operator === '+') {
            //if prev operator is plus and minus is pressed set operator to minus. => 5 + - 3 = 2
            setOperator('-');
            setPreviousValue(previousValue + displayNumber);
          } else if (operator === '-') {
            setPreviousValue(previousValue - displayNumber);
          } else if (operator === '*') {
            // Check if display is '0' then 2 operators were pressed consecutively else allow operator chaining. i.e 5 * 3 - 2 ...
            // if times is pressed followed by minus consecutively, set operator to '* -' which evaluates when equal to is pressed. Also store previousValue in times => 5 * - 5 = -25
            setOperator(display === '0' ? '* -' : '-');
            setTimes(previousValue);
            setPreviousValue(previousValue * displayNumber);
          } else if (operator === '÷') {
            setPreviousValue(previousValue / displayNumber);
          }
        } else {
          setPreviousValue(displayNumber);
          setOperator('-');
        }
        setDisplay('0');
        break;

      // Multiply functionality
      case 'x':
        setShowPressed(`${showPressed}x`)
        if (showPressed[showPressed.length - 1] === '=') {
          setShowPressed(`${display}${value}`)
        }
        if (operator !== null) {
          if (operator === '+') {
            setOperator('*');
            setPreviousValue(previousValue + displayNumber);
          } else if (operator === '-') {
            setOperator('*');
            setPreviousValue(previousValue - displayNumber);
          } else if (operator === '*') {
            setPreviousValue(previousValue * displayNumber);
          } else if (operator === '÷') {
            setPreviousValue(previousValue / displayNumber);
          }
        } else {
          setPreviousValue(displayNumber);
          setOperator('*');
        }
        setDisplay('0');
        break;

      // Divide functionality
      case '÷':
        setShowPressed(`${showPressed}÷`)
        if (showPressed[showPressed.length - 1] === '=') {
          setShowPressed(`${display}${value}`)
        }
        if (operator !== null) {
          if (operator === '+') {
            setPreviousValue(previousValue + displayNumber);
          } else if (operator === '-') {
            setOperator('÷');
            setPreviousValue(previousValue - displayNumber);
          } else if (operator === '*') {
            setPreviousValue(previousValue * displayNumber);
          } else if (operator === '÷') {
            setPreviousValue(previousValue / displayNumber);
          }
        } else {
          setPreviousValue(displayNumber);
          setOperator('÷');
        }
        setDisplay('0');
        break;

      // Equal to functionality
      case '=':
        setShowPressed('=')
        if (!operator) return;

        if (operator === '+') {
          setDisplay(`${previousValue + displayNumber}`);
        } else if (operator === '-') {
          setDisplay(`${previousValue - displayNumber}`);
        } else if (operator === '*') {
          setDisplay(`${previousValue * displayNumber}`);
        } else if (operator === '÷') {
          setDisplay(`${previousValue / displayNumber}`);
        } else if (operator === '* -') {
          // Use times value which was stored from previousValue to set the display since previousValue will change to 0
          setDisplay(times * -displayNumber);
        }
        setOperator(null);
        break;

      default:
        if (display[display.length - 1] === '.') {
          setDisplay(display + value);

        } else {
          setDisplay(`${Number(display + Number(value))}`);
          setShowPressed(`${showPressed}${value}`);
        }
        if (showPressed[showPressed.length - 1] === '+') {
          setShowPressed(showPressed + value)
        }
        if (showPressed[showPressed.length - 1] === '-') {
          setShowPressed(`${showPressed}${value}`)
        }
        if (showPressed[showPressed.length - 1] === 'x') {
          setShowPressed(`${showPressed}${value}`)
        }
        if (showPressed[showPressed.length - 1] === '÷') {
          setShowPressed(`${showPressed}${value}`)
        }
        if (showPressed[showPressed.length - 1] === '.') {
          setShowPressed(`${showPressed}${value}`)
        }
        if (showPressed[showPressed.length - 1] === '=') {
          // if last pressed is = and a number is pressed reset all values and start a new operation
          setDisplay(value);
          setShowPressed(value)
          setPreviousValue(null);
          setOperator(null);
        }

    }

  };

  return (
    <div className="App">
      <div
        className={`display ${display.length >= 8 ? 'reduce' : ''} ${showPressed.length >= 8 ? 'reduce' : ''} ${display.length >= 17 ? 'reduce-more' : ''} ${showPressed.length >= 17 ? 'reduce-more' : ''}`}
      >{!showPressed.includes('=') ? showPressed : `${parseFloat(Number(display).toFixed(4))}`}</div>
      <div className="buttons">
        <Button value="C" handleClick={compute} />
        <Button value="±" type="function" handleClick={compute} />
        <Button value="÷" type="function" handleClick={compute} />
        <Button value="x" type="function" handleClick={compute} />
        <Button value="7" handleClick={compute} />
        <Button value="8" handleClick={compute} />
        <Button value="9" handleClick={compute} />
        <Button value="-" type="function" handleClick={compute} />
        <Button value="4" handleClick={compute} />
        <Button value="5" handleClick={compute} />
        <Button value="6" handleClick={compute} />
        <Button value="+" type="function" handleClick={compute} />
        <Button value="1" handleClick={compute} />
        <Button value="2" handleClick={compute} />
        <Button value="3" handleClick={compute} />
        <Button value="=" type="function" handleClick={compute} id="equals" />
        <Button value="0" handleClick={compute} />
        <Button value="." handleClick={compute} />
        <Button value="%" handleClick={compute} />
      </div>
    </div>
  );
}

export default App;
