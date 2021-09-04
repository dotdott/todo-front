import { useEffect, useRef } from "react";
import * as MU from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import Icons from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../store/reducers/userTodosReducer";
import { IStateUser, IStateUserTodos } from "../../global/@types";
import LoadingScreen from "../../components/LoadingScreen";
import Drawer from "./components/Drawer";
import { handleFormatFirstPhraseLetterToUpperCase } from "../../util/handleFormatFirstPhraseLetterToUpperCase";
import ModalWarning from "../../components/ModalWarning";
import { useCheckIfClickedOutside } from "../../hooks/useCheckIfClickedOutside";

const TodoList = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [activeMenu, setActiveMenu] = useState("all");
  const [isConcluded, setIsConcluded] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModalError, setShowModalError] = useState(false);

  const { isLoading, data, errorMessage } = useSelector(
    (state: IStateUserTodos) => state.stateUserTodos
  );

  const { id } = useSelector((state: IStateUser) => state.stateUser);

  const dispatch = useDispatch();

  const handleToggleDrawer = () => {
    return setOpenDrawer(!openDrawer);
  };

  const handleCloseModal = () => {
    return setShowModalError(false);
  };

  const modalRef: any = useRef();

  const monitoringClick = useCheckIfClickedOutside({
    showModalError,
    handleClose: handleCloseModal,
    modalRef,
  });

  useEffect(() => {
    const filterValue =
      activeMenu === "concluded" ? 1 : activeMenu === "inProgress" ? 0 : "";

    dispatch({
      type: Types.USER_TODOS_REQUEST,
      user_id: id,
      has_completed: filterValue,
    });
  }, [id, activeMenu]);

  useEffect(() => {
    if (errorMessage !== "") {
      setModalMessage(errorMessage);
      setShowModalError(true);
    }
  }, [errorMessage]);

  return (
    <MU.Container maxWidth={false} className="background todo__container">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Drawer
            openDrawer={openDrawer}
            handleToggleDrawer={handleToggleDrawer}
          />

          {!openDrawer && (
            <div className="h-100 glass-background">
              <div className="drawer__wrapper__toggle-bubble">
                <Icons
                  name="keyboard_double_arrow_right"
                  Styles={{ color: "#fff" }}
                  handleClick={handleToggleDrawer}
                />
              </div>
            </div>
          )}

          <div className={`tasks glass-background ${openDrawer && "is_open"}`}>
            <div className="tasks__header">
              <div className="tasks__header__tabs">
                <p
                  className={`tasks__header__tabs__item ${
                    activeMenu === "inProgress" && "active"
                  }`}
                  onClick={() => setActiveMenu("inProgress")}
                >
                  Em andamento
                </p>
                <p
                  className={`tasks__header__tabs__item ${
                    activeMenu === "concluded" && "active"
                  }`}
                  onClick={() => setActiveMenu("concluded")}
                >
                  Concluídas
                </p>
                <p
                  className={`tasks__header__tabs__item ${
                    activeMenu === "all" && "active"
                  }`}
                  onClick={() => setActiveMenu("all")}
                >
                  Todas
                </p>
              </div>

              <div
                className="drawer__wrapper__toggle-bubble"
                style={{ marginTop: 0 }}
              >
                <Icons name="add" Styles={{ color: "#fff" }} />
              </div>
            </div>

            <div className="tasks__list">
              <div className="tasks__list__my-task no-border">
                <div className="tasks__list__my-task__title head">Título</div>
                <div className="tasks__list__my-task__description head">
                  <p>Descrição</p>
                </div>
                <div className="tasks__list__my-task__set-concluded head">
                  Concluída
                </div>
                <div className="tasks__list__my-task__status head">Status</div>
              </div>

              {data.length > 0 &&
                data.map((task) => (
                  <div className="tasks__list__my-task">
                    <div className="tasks__list__my-task__title">
                      {handleFormatFirstPhraseLetterToUpperCase(task.task)}
                    </div>
                    <div className="tasks__list__my-task__description">
                      <p>
                        {handleFormatFirstPhraseLetterToUpperCase(
                          task.description
                        )}
                      </p>
                    </div>
                    <div className="tasks__list__my-task__set-concluded">
                      <MU.FormControlLabel
                        control={
                          <MU.Switch
                            defaultChecked={task.has_completed === 1}
                            onChange={() => setIsConcluded(!isConcluded)}
                          />
                        }
                        label=""
                      />
                    </div>
                    <div className="tasks__list__my-task__status">
                      {task.has_completed === 1
                        ? task.created_at
                        : "Em andamento"}
                      <Icons name="open_in_new" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {showModalError && (
        <ModalWarning
          show={showModalError}
          handleClose={handleCloseModal}
          handleConfirm={handleCloseModal}
          modalMessage={modalMessage}
          modalRef={modalRef}
        />
      )}
    </MU.Container>
  );
};

export default TodoList;
