import React from "react";
import { ChangeEvent } from "react";

interface TaskPropTypes {
  title: string;
  status: boolean;
  id: string;
  changeStatus: (id: string, status: boolean) => void;
  removeTask: (id: string) => void;
}

export const Task: React.FC<TaskPropTypes> = ({
  title,
  status,
  id,
  changeStatus,
  removeTask,
}) => {

  const [statuss, setStatus] = React.useState(false)

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(!statuss)
    changeStatus(id, e.currentTarget.checked);
    
  };

  const removeTaskHandler = () => {
    removeTask(id)    
  }

  return (
    <div>
      <input type="checkbox" checked={statuss} onChange={changeStatusHandler} />
      <span style={{marginRight: '5px'}} className={statuss ? 'completed' : ''}>{title}</span>
      <span 
        onClick={removeTaskHandler}
        style={{cursor: 'pointer'}}
      >&times;</span>
    </div>
  );
};
