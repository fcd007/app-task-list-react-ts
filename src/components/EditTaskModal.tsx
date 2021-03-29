import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Task, List } from '../store/types';
import { updateTask, unsetTaskToEdit, setNotification } from '../store/actions';

interface EditTaskModalProps {
  taskToEdit: {
    task: Task;
    list: List;
  }
}

const EditTaskModal: FC<EditTaskModalProps> = ({ taskToEdit: { task, list }}) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(task.name);
  const [taskState, setTaskState] = useState(task.completed);

  const closeModalHandler = () => {
    dispatch(unsetTaskToEdit());
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(taskName.trim() === '') {
      return alert('Nome da tarefa obrigatório!');
    }

    if(taskName === task.name && taskState === task.completed) {
      return alert('O nome e o estado da tarefa são os mesmos de antes!');
    }

    dispatch(updateTask(task.id, taskName, taskState, list));
    dispatch(setNotification(`Tarefa "${task.name}" atualizada!`));
  }

  const nameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTaskName(event.currentTarget.value);
  }

  const stateChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTaskState(event.currentTarget.checked);
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModalHandler}></div>
      <form className="modal-card" onSubmit={submitHandler}>
        <header className="modal-card-head">
          <p className="modal-card-title">Editar Tarefa</p>
          <button type="button" className="delete" onClick={closeModalHandler}></button>
        </header>
        <div className="modal-card-body">
          <div className="field">
            <label className="label">Nome da Tarefa</label>
            <div className="control">
              <input type="text" className="input" placeholder="Nome da Tarefa" value={taskName} onChange={nameChangeHandler} />
            </div>
          </div>
          <div className="field">
            <label className="label">Tarefa concluída</label>
            <label className="checkbox">
              <input type="checkbox" checked={taskState} onChange={stateChangeHandler} />
              {' '} Completa
            </label>
          </div>
        </div>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-success">Salvar alterações</button>
          <button type="button" className="button" onClick={closeModalHandler}>Cancelar</button>
        </footer>
      </form>
    </div>
  );
}

export default EditTaskModal;