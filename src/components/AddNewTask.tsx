import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { List, Task } from '../store/types';
import { addTask, setNotification } from '../store/actions';

interface AddNewTaskProps {
  list: List;
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTaskName(event.currentTarget.value);
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(taskName.trim() === '') {
      return alert('Nome da tarefa obrigatório!');
    }

    const newTask: Task = {
      name: taskName,
      id: `task-${new Date().getTime()}`,
      completed: false
    }

    dispatch(addTask(newTask, list));
    dispatch(setNotification(`Nova tarefa criada ("${newTask.name}")!`));
    setTaskName('');
  }

  return(
    <section className="section">
      <h2 className="is-size-4 has-text-centered">Adicionar nova tarefa ao campo selecionado</h2>
      <form onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Nome da tarefa</label>
          <div className="control">
            <input type="text" className="input" placeholder="Add Tarefa" value={taskName} onChange={changeHandler} />
          </div>
          <div className="control mt-4">
            <input type="submit" value="Add tarefa" className="button is-primary" />
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddNewTask;