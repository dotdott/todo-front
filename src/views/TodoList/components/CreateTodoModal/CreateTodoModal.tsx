import * as MU from "@material-ui/core";
import Icons from "../../../../components/Icons";
import Button from "../../../../components/Button";
import "./styles.scss";
import React, { useState } from "react";
import { CheckboxProps } from "@material-ui/core";
import { SwitchBaseProps } from "@material-ui/core/internal/SwitchBase";

interface ICreateTodoModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
  modalRef: any;
}

const CreateTodoModal = ({
  show,
  handleClose,
  modalRef,
  handleConfirm,
}: ICreateTodoModalProps) => {
  const [taskFields, setTaskFields] = useState({
    title: "",
    description: "",
    is_completed: 0,
  });

  const handleToggleCheckbox = (checked: boolean) => {
    if (checked) {
      return setTaskFields({ ...taskFields, is_completed: 1 });
    }

    return setTaskFields({ ...taskFields, is_completed: 0 });
  };

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
              btnFunction={handleConfirm}
            >
              CRIAR NOVA TAREFA
            </Button>
          </div>
        </div>
      </div>
    </MU.Modal>
  );
};

export default CreateTodoModal;
