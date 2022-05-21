import React from "react";
import { ChangeEvent } from "react";

interface TaskPropTypes {
  title: string;
  status: boolean;
  id: number;
  changeStatus: (id: number, status: boolean) => void;
  removeTask: (id: number) => void;
}

export const Task: React.FC<TaskPropTypes> = ({
  title,
  status,
  id,
  changeStatus,
  removeTask,
}) => {


  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked);
    
  };

  const removeTaskHandler = () => {
    removeTask(id)    
  }

  return (
    <div>
      <input type="checkbox" checked={status} onChange={changeStatusHandler} />
      <span style={{marginRight: '5px'}} className={status ? 'completed' : ''}>{title}</span>
      <span 
        onClick={removeTaskHandler}
        style={{cursor: 'pointer'}}
      >&times;</span>
    </div>
  );
};
