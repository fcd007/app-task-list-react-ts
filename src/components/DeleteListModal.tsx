import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { getListById, deleteList, setNotification, setListIdToDelete } from '../store/actions';

interface DeleteListModalProps {
  listId: string;
}

const DeleteListModal: FC<DeleteListModalProps> = ({ listId }) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.list.listById);

  useEffect(() => {
    dispatch(getListById(listId));
  }, [dispatch, listId]);

  const deleteListHandler = () => {
    dispatch(deleteList(listId));
    if(list) {
      dispatch(setNotification(`List "${list.name}" deleted!`, 'danger'));
    }
  }

  const hideModalHandler = () => {
    dispatch(setListIdToDelete(''));
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={hideModalHandler}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">Tem certeza que deseja deletar esta lista?</p>
        </header>
        <div className="modal-card-body">
          <h2 className="is-size-5 has-text-centered">Todas as tarefas relacionadas a esta lista serão excluídas</h2>
          <div className="content">
            {list?.tasks.length === 0 ?
              <p className="has-text-centered pt-4 mb-0">Nenhuma tarefa nesta lista!</p>
              :
              <ul>
                {list?.tasks.map(task => (
                  <li key={task.id}>{task.name}</li>
                ))}
              </ul>
            }
          </div>
        </div>
        <footer className="modal-card-foot">
          <button type="button" className="button is-danger" onClick={deleteListHandler}>Deletar</button>
          <button type="button" className="button" onClick={hideModalHandler}>Calcelar</button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteListModal;