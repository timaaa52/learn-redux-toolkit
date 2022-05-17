import React from 'react'
import { useAppDispatch } from '../hooks/hooks';
import { TaskAction } from '../store/slices/TaskSlice';


export const AddItemForm: React.FC = () => {

    const [title, setTitle] = React.useState('');
    const dispatch = useAppDispatch();
    
    const addTaskHandler = () => {
        dispatch(TaskAction.addTask(title))
        setTitle('')
    }

  return (
    <div>
        <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
        />
        <button 
            aria-label='Add Item'
            onClick={addTaskHandler}
        >Add</button>
    </div>
  )
}

