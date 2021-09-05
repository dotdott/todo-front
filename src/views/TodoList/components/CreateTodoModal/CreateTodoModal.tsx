import * as MU from "@material-ui/core";
import Icons from "../../../../components/Icons";
import Button from "../../../../components/Button";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import { CheckboxProps } from "@material-ui/core";
import { SwitchBaseProps } from "@material-ui/core/internal/SwitchBase";
import ModalWarning from "../../../../components/ModalWarning";
import { api } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../../../store/reducers/userTodosReducer";
import { IStateUserTodos } from "../../../../global/@types";

interface ICreateTodoModalProps {
  show: boolean;
  handleClose: () => void;
  modalRef: any;
}

const CreateTodoModal = ({
  show,
  handleClose,
  modalRef,
}: ICreateTodoModalProps) => {
  const [taskFields, setTaskFields] = useState({
    title: "",
    description: "",
    has_completed: 0,
  });
  const [showErrors, setShowErrors] = useState({ message: "", show: false });
  const [hasError, setHasError] = useState(false);

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

  const handlePostTodo = async () => {
    if (taskFields.title !== "") {
      const { title, description, has_completed } = taskFields;

      try {
        const result = await api.post("/todo", {
          task: title,
          description,
          has_completed,
        });

        dispatch({
          type: Types.UPDATE_TODO_LIST,
          data: [...data, result.data],
        });

        return handleClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      setHasError(true);
    }
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
              <span>Crie uma nova tarefa!</span>

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
              className={`${taskFields.title !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setTaskFields({ ...taskFields, title: e.target.value })
              }
            />

            <MU.TextareaAutosize
              aria-label="Descrição da tarefa"
              placeholder="Descrição da tarefa"
              className="modal__todo__body__description-field"
              maxLength={300}
              minRows={8}
              onChange={(e) =>
                setTaskFields({ ...taskFields, description: e.target.value })
              }
            />

            <div className="modal__todo__body__conclude-checkbox">
              <MU.FormControlLabel
                control={<MU.Checkbox name="Marcar como concluída" />}
                label="Marcar como concluída"
                onChange={(e, checked) => handleToggleCheckbox(checked)}
              />
            </div>
          </div>

          <div className="modal__todo__footer">
            <Button
              btnClasses="_blue"
              btnExtraStyles={{ height: 35, width: "100%" }}
              btnFunction={handlePostTodo}
            >
              CRIAR NOVA TAREFA
            </Button>
          </div>
        </div>
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
