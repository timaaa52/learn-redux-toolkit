import { AddItemForm } from "./components/AddItemForm";
import { Task } from "./components/Task";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchTasks, removeTaskT, TaskAction } from "./store/slices/TaskSlice";
import "./App.css";
import { useEffect } from "react";

export const App = () => {
  const task = useAppSelector((state) => state.tasks.tasks);
  const isLoading = useAppSelector((state) => state.tasks.isLoading)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])
   
  const changeTaskStatus = (id: string, status: boolean) => {
    dispatch(TaskAction.changeTaskStatus({id, status}))
  };

  const removeTask = (id: string) => {
    dispatch(removeTaskT(id));
  };

  if(isLoading) {
    return <div>
        <h1>Loading....</h1>
    </div>
  }

  return (
    <div className="App">
      <AddItemForm />
      {task &&
        task.map((t) => {
          return (
            <Task
              key={t.id}
              id={t.id}
              status={t.status}
              title={t.title}
              changeStatus={changeTaskStatus}
              removeTask={removeTask}
            />
          );
        })}
    </div>
  );
};
