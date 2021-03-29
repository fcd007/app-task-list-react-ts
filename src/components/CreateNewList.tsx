import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { List } from '../store/types';
import { addList, setNotification } from '../store/actions';

const CreateNewList: FC = () => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setListName(event.currentTarget.value);
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(listName.trim() === '') {
      return alert('Nome da lista obrigatório!');
    }

    const newList: List = {
      id: `list-${new Date().getTime()}`,
      name: listName,
      tasks: []
    }

    dispatch(addList(newList));
    dispatch(setNotification(`Nova lista ("${newList.name}") criada!`));
    setListName('');
  }

  return(
    <div className="card mb-5">
      <div className="card-header">
        <p className="card-header-title">Criar Nova Lista</p>
      </div>
      <div className="card-content">
        <form onSubmit={submitHandler}>
          <div className="field">
            <label className="label">Nome Lista</label>
            <div className="control">
              <input 
                type="text" 
                className="input"
                placeholder="Add nome da lista"
                name="listName"
                value={listName}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">Criar Nova Lista</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewList;