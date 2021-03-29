import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { List } from '../store/types';
import { setListToEdit, updateList, setNotification } from '../store/actions';

interface EditListModalProps {
  list: List;
}

const EditListModal: FC<EditListModalProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState(list.name);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(listName.trim() === '') {
      return alert('Nome da lista obrigatório!');
    }

    if(listName.trim() === list.name) {
      return alert('O nome da lista não pode ser igual!');
    }

    dispatch(updateList(list.id, listName.trim()));
    dispatch(setNotification(`Lista "${list.name}" Atualizada!`));
  }

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    setListName(event.currentTarget.value);
  }

  const hideModalHandler = () => {
    dispatch(setListToEdit(''));
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={hideModalHandler}></div>
      <form className="modal-card" onSubmit={submitHandler}>
        <header className="modal-card-head">
          <p className="modal-card-title">Editar Lista</p>
          <button type="button" className="delete" onClick={hideModalHandler}></button>
        </header>
        <div className="modal-card-body">
          <div className="field">
            <label className="label">Nome da Lista</label>
            <div className="control">
              <input 
                type="text"
                className="input"
                name="listName"
                placeholder="Nome da Lista"
                value={listName}
                onChange={changeHandler}  
              />
            </div>
          </div>
        </div>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-success">Salvar alterações</button>
          <button type="button" className="button" onClick={hideModalHandler}>Cancelar</button>
        </footer>
      </form>
    </div>
  );
}

export default EditListModal;