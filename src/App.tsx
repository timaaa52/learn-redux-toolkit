import { AddItemForm } from "./components/AddItemForm";
import { Task } from "./components/Task";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { TaskAction } from "./store/slices/TaskSlice";
import "./App.css";

export const App = () => {
  const task = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
   
  const changeTaskStatus = (id: string, status: boolean) => {
    dispatch(TaskAction.changeTaskStatus({id, status}));
  };

  const removeTask = (id: string) => {
    dispatch(TaskAction.removeTask({id}));
  };

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
