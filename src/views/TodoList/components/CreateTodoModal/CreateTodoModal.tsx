import * as MU from "@material-ui/core";
import Icons from "../../../../components/Icons";
import Button from "../../../../components/Button";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import ModalWarning from "../../../../components/ModalWarning";
import { api } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../../../store/reducers/userTodosReducer";
import {
  IErrorHandlerResults,
  IStateUserTodos,
  IUserTodos,
} from "../../../../global/@types";
import moment from "moment";
import { handleErrors } from "../../../../util/handleErrors";
import LoadingScreen from "../../../../components/LoadingScreen";

interface ICreateTodoModalProps {
  show: boolean;
  handleClose: () => void;
  modalRef: any;
  selectedTodo?: IUserTodos;
}

const CreateTodoModal = ({
  show,
  handleClose,
  modalRef,
  selectedTodo,
}: ICreateTodoModalProps) => {
  const [taskFields, setTaskFields] = useState({
    title: "",
    description: "",
    has_completed: selectedTodo?.has_completed ? selectedTodo.has_completed : 0,
  });
  const [showErrors, setShowErrors] = useState({ message: "", show: false });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timeNow = moment(new Date()).format("DD/MM/YYYY HH:mm");

  const dispatch = useDispatch();
  const { data } = useSelector(
    (state: IStateUserTodos) => state.stateUserTodos
  );

  const handleToggleCheckbox = (checked: boolean) => {
    if (checked) {
      return setTaskFields({ ...taskFields, has_completed: 1 });
    }

    return setTaskFields({ ...taskFields, has_completed: 0 });
  };

  const handleUpdate = async () => {
    const { title, description, has_completed } = taskFields;
    setIsLoading(true);

    const formData = new FormData();

    if (title !== "") {
      formData.append("task", title);
    }

    if (description !== "") {
      formData.append("description", description);
    }

    formData.append("has_completed", has_completed.toString());

    if (has_completed === 1 || selectedTodo?.has_completed === 1) {
      formData.append("finished_at", timeNow);
    }

    if (selectedTodo?.id) {
      try {
        const update = await api.put(`/todo/${selectedTodo.id}`, formData);

        const updatedTodo = data.map((todo) => {
          if (todo.id === selectedTodo.id) {
            return (todo = update.data[0]);
          }

          return todo;
        });

        dispatch({
          type: Types.UPDATE_TODO_LIST,
          data: updatedTodo,
        });

        setIsLoading(false);
        return handleClose();
      } catch (err) {
        const error: IErrorHandlerResults = handleErrors(err);

        if (error && error.status) {
          setShowErrors({ show: true, message: error.message });
        } else {
          if (error) {
            setShowErrors({ show: true, message: error.message });
          }
        }
      }

      setIsLoading(false);
    }
  };

  const handleSetTodos = async () => {
    const { title, description, has_completed } = taskFields;
    setIsLoading(true);

    if (selectedTodo?.id) {
      return handleUpdate();
    }

    if (taskFields.title !== "") {
      try {
        const result = await api.post("/todo", {
          task: title,
          description,
          has_completed,
          finished_at: has_completed === 1 ? timeNow : null,
        });

        dispatch({
          type: Types.UPDATE_TODO_LIST,
          data: [...data, result.data],
        });

        setIsLoading(false);
        return handleClose();
      } catch (err) {
        const error: IErrorHandlerResults = handleErrors(err);

        if (error && error.status) {
          setShowErrors({ show: true, message: error.message });
        } else {
          if (error) {
            setShowErrors({ show: true, message: error.message });
          }
        }
      }
    } else {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const handleCloseModalError = () => {
    setShowErrors({ message: "", show: false });
  };

  useEffect(() => {
    if (hasError && taskFields.title !== "") {
      setHasError(false);
    }
  }, [hasError, taskFields.title]);

  return (
    <MU.Modal open={show} onClose={handleClose}>
      <div className="modal__todo" ref={modalRef}>
        <div className="modal__todo__background">
          <div className="modal__todo__header">
            <div className="modal__todo__header__title">
              <span>
                {selectedTodo?.id ? "Editar tarefa" : "Crie uma nova tarefa!"}
              </span>

              <Icons name="close" handleClick={handleClose} />
            </div>
          </div>

          <div className="modal__todo__body">
            {hasError && (
              <div className="modal__todo__body__error-field">
                <p>O título é obrigatório</p>
              </div>
            )}
            <MU.TextField
              id="todo-title"
              label="Título"
              variant="outlined"
              defaultValue={selectedTodo?.task}
              className={`${taskFields.title !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setTaskFields({ ...taskFields, title: e.target.value })
              }
            />

            <MU.TextareaAutosize
              aria-label="Descrição da tarefa"
              placeholder="Descrição da tarefa"
              defaultValue={selectedTodo?.description}
              className="modal__todo__body__description-field"
              maxLength={300}
              minRows={8}
              onChange={(e) =>
                setTaskFields({ ...taskFields, description: e.target.value })
              }
            />

            <div className="modal__todo__body__conclude-checkbox">
              <MU.FormControlLabel
                control={
                  <MU.Checkbox
                    defaultChecked={selectedTodo?.has_completed === 1}
                    name="Marcar como concluída"
                    data-testid="checkbox-testid"
                  />
                }
                label="Marcar como concluída"
                onChange={(e, checked) => handleToggleCheckbox(checked)}
              />
            </div>
          </div>

          <div className="modal__todo__footer">
            <Button
              btnClasses="_blue"
              btnExtraStyles={{ height: 35, width: "100%" }}
              btnFunction={handleSetTodos}
            >
              {selectedTodo?.id ? "ATUALIZAR" : "CRIAR NOVA TAREFA"}
            </Button>
          </div>
        </div>

        {isLoading && <LoadingScreen />}

        {showErrors && (
          <ModalWarning
            show={showErrors.show}
            handleClose={handleCloseModalError}
            handleConfirm={handleCloseModalError}
            modalMessage={showErrors.message}
            modalRef={modalRef}
          />
        )}
      </div>
    </MU.Modal>
  );
};

export default CreateTodoModal;
