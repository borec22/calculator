import React, {MouseEvent, useState} from 'react';
import './App.css';

function App() {
   const [expression, setExpression] = useState<string>('0');
   const [lastPressed, setLastPressed] = useState('');
   const [message, setMessage] = useState<string>('');

   let numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
   let operations = ['*', '-', '+', '='];

   type idsType = {
      [key: string]: string
   }

   let ids: idsType = {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
      '=': 'equals',
      '-': 'subtract',
      '+': 'add',
      '*': 'multiply',
      '/': 'divide',
      '.': 'decimal',
      'AC': 'clear',
   }

   const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
      const innerText = e.currentTarget.innerText;

      setLastPressed(innerText);

      if (/[\+\-\*\/]/.test(innerText) && message !== '') {
         setMessage('');
      }

      switch (innerText) {
         case 'AC': {
            setExpression('0');
            setMessage('');
            break;
         }
         case '=': {
            let evaluated;

            try {
               evaluated = eval(expression);
            } catch (e) {
               setExpression(expression);
               break;
            }

            setExpression(evaluated.toString());

            break;
         }
         case '.': {
            let splatted = expression.split(/[\+\-\*\/]/);
            let lastNumber = splatted.slice(-1)[0];

            if (!lastNumber.includes('.')) {
               setExpression(expression + '.');
            }
            break;
         }
         default: {
            let lastThreeSymbols = expression.slice(-3);

            // enter number after calculation
            if (lastPressed === '=' && numbers.includes(innerText)) {
               setExpression(innerText);

            } else if (/[\+\-\/\*]/.test(lastPressed) && /[\+\/\*]/.test(innerText)) {

               if (
                  lastThreeSymbols === '+ -' ||
                  lastThreeSymbols === '* -' ||
                  lastThreeSymbols === '/ -'
               ) {
                  setExpression(state => state.slice(0, -3) + innerText);
                  return;
               } else {
                  setExpression(state => state.slice(0, -1) + innerText);
               }

            } else if (/[\+\-\/\*]/.test(lastPressed) && /[\+\-\/\*]/.test(innerText)) {

               if (
                  lastThreeSymbols === '+ -' ||
                  lastThreeSymbols === '* -' ||
                  lastThreeSymbols === '/ -' ||
                  lastThreeSymbols === '- -'
               ) {
                  if (innerText === '-') {
                     return;
                  }
               }

               setExpression(state => state + ' ' + innerText);

            } else {
               let splatted = expression.split(/[\+\-\*\/]/);
               let lastNumber = splatted.slice(-1)[0];

               if (Number(lastNumber) > 9007199254740991) {
                  setMessage('DIGIT LIMIT MET');
               } else {
                  setExpression(state => state === '0' ? innerText : state + innerText);
               }
            }
         }
      }

   }

   return (
      <div className="App">
         <div className='container'>
            <div id='display' className='display'>
               {message ? message : expression}
            </div>
            <div className='controls'>
               <div className='numContainer'>
                  <button id={ids['AC']} className='button lightGray big-w' onClick={handleOnClick}>AC</button>
                  <button id={ids['/']} className='button orange' onClick={handleOnClick}>/</button>
                  {numbers.filter(num => num !== '0').map((num: string) =>
                     <button
                        key={num}
                        id={ids[num]}
                        className='button gray'
                        onClick={handleOnClick}
                     >
                        {num}
                     </button>)}
                  <button id={ids['0']} className='button gray big-w' onClick={handleOnClick}>0</button>
                  <button id={ids['.']} className='button gray' onClick={handleOnClick}>.</button>
               </div>
               <div className='opsContainer'>
                  {operations.map(operation =>
                     <button
                        key={operation}
                        id={ids[operation]}
                        className={`button orange ${operation === '=' && 'big-h'}`}
                        onClick={handleOnClick}
                     >
                        {operation}
                     </button>)}
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
