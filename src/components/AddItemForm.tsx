import React from 'react'
import { useAppDispatch } from '../hooks/hooks';
import { addNewTask, TaskAction } from '../store/slices/TaskSlice';


export const AddItemForm: React.FC = () => {

    const [title, setTitle] = React.useState<string>('');
    const dispatch = useAppDispatch();
    
    const addTaskHandler = () => {
        dispatch(addNewTask(title))
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

