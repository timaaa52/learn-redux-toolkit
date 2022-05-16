import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { AppRootStateType } from './store';
import { calcByAmount, decrement, increment } from './store/countReducer';

export const App = () => {

  const [value, setValue] = useState('')
  const count = useSelector((state: AppRootStateType) => state.counter.value)
  const dispatch = useDispatch()



  return (
    <div className="App">
      <span>{count}</span>
      <input type="text" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        <button
          aria-label='increment count'
          onClick={() => dispatch(increment())}
          disabled={count === 10}
        >increment</button>
        <button
          aria-label='decrement'
          onClick={() => dispatch(decrement())}
          disabled={count === 0}
        >decrement</button>
        <button
          aria-label='increment by value'
          onClick={() => dispatch(calcByAmount(+value))}
          >
          increment By Value
        </button>
      </div>
    </div>
  )
}
