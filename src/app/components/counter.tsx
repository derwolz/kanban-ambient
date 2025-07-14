
import react from 'react'

import {useState,useEffect} from 'react';
export default function Counter () {
  const [counter, setCounter] = useState(0);
  const [hundredsDigit, setHundredsDigit] = useState('0');
  const [tensDigit, setTensDigit] = useState('0');
  const [onesDigit, setOnesDigit] = useState('0');
  const incrementCounter = ():void => setCounter( counter > 999 ? 0 : counter+1);
  const handleCount = ():void =>{
    incrementCounter();
    const num = (counter.toString().padStart(3,"0"));
    setHundredsDigit(num.substring(0,1));
    setTensDigit(num.substring(1,2))
    setOnesDigit(num.substring(2,3));
   console.log(counter, hundredsDigit, tensDigit, onesDigit);
  }
  useEffect(()=>{
  handleCount();
  },[counter])
    return(
        <div className="flex gap-4 items-center flex-row">
          <div className="flex items-center justify-center w-20 h-40 bg-gray-500 rounded">
          <span className="text-center items-center justify-center color-white text-8xl " >{hundredsDigit}</span>
          </div>
          <div className="w-20 h-40 items-center flex justify-center bg-gray-500 rounded">
          <span className="text-center citems-center justify-center color-white text-8xl " >{tensDigit}</span>
          </div>
          <div className="w-20 h-40 items-center flex justify-center bg-gray-500 rounded">
          <span className="text-center color-white text-8xl items-center justify-center" >{onesDigit}</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
        <button className="bg-blue-500" onClick={handleCount}>Click to increment</button>
        </div>
  )
  }
