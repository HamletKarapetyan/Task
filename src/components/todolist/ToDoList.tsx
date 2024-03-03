import React, { useState } from "react";
import { IToDo } from "../../interfaces";
import "./ToDoList.css";

const ToDoList: React.FC = () => {
  const [arr, setArr] = useState<IToDo[]>([]);

  const AddToDo: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { newToDo: { value: newToDo } } = e.target as typeof e.target & {
      newToDo: { value: string };
    };
    const newToDoItem: IToDo = {
      id: arr.length,
      todo: newToDo,
      completed: false,
    };

    if (newToDo) {
      setArr((arr) => [...arr, newToDoItem]);
    }
  };

  const remove = (id: number) => {
    setArr((arr) => arr.filter((el: IToDo) => el.id !== id));
  };

  const markCompleted = (id: number) => {
    setArr((arr) =>
      arr.map((el) =>
        el.id === id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  return (
    
    <div className="toDoList">
      <div className='toDoText'>
        <h2>To-Do List</h2>
        <p>Simplify your daily To-Dos</p>
      </div>
      <form onSubmit={AddToDo}>
        <input type="text" name="newToDo" />
        <button>Add</button>
      </form>
      <div className="addedToDos">
        {arr?.map((el, index: number) => {
          return (
            <div className={`addedToDo ${el.completed ? 'completed' : ''}`} key={index}>
              <div className="elHolder">{el?.todo}</div>
              <div className="buttons">
                <button onClick={() => remove(el.id)} className="deleteToDo">
                  Delete
                </button>
                <button onClick={() => markCompleted(el.id)} className="doneToDo">
                  {el.completed ? 'Undo' : 'Done'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoList;
