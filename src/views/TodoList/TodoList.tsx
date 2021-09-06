import { useEffect, useRef } from "react";
import * as MU from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import Icons from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../store/reducers/userTodosReducer";
import {
  IErrorHandlerResults,
  IStateUser,
  IStateUserTodos,
  IUserTodos,
} from "../../global/@types";
import LoadingScreen from "../../components/LoadingScreen";
import Drawer from "./components/Drawer";
import { handleFormatFirstPhraseLetterToUpperCase } from "../../util/handleFormatFirstPhraseLetterToUpperCase";
import ModalWarning from "../../components/ModalWarning";
import { useCheckIfClickedOutside } from "../../hooks/useCheckIfClickedOutside";
import CreateTodoModal from "./components/CreateTodoModal";
import { api } from "../../services/api";
import { handleErrors } from "../../util/handleErrors";
import moment from "moment";

const TodoList = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [activeMenu, setActiveMenu] = useState("all");
  const [modalMessage, setModalMessage] = useState("");
  const [showModalError, setShowModalError] = useState(false);
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<IUserTodos>(
    {} as IUserTodos
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const { isLoading, data, errorMessage } = useSelector(
    (state: IStateUserTodos) => state.stateUserTodos
  );

  const { id } = useSelector((state: IStateUser) => state.stateUser);

  const dispatch = useDispatch();

  const handleToggleSwitch = async (isChecked: number, todoId: number) => {
    const checked = isChecked === 1 ? 0 : 1;
    const timeNow = moment(new Date()).format("DD/MM/YYYY HH:mm");

    try {
      const response = await api.put(`/todo/${todoId}`, {
        has_completed: checked.toString(),
        finished_at: timeNow,
      });

      const updatedTodo = data.map((todo) => {
        if (todo.id === todoId) {
          todo.has_completed = checked;
          todo.finished_at = timeNow;
        }

        return todo;
      });

      dispatch({
        type: Types.UPDATE_TODO_LIST,
        data: updatedTodo,
      });
    } catch (err) {
      const error: IErrorHandlerResults = handleErrors(err);

      if (error && error.status) {
        setModalMessage(error.message);
        setShowModalError(true);
      } else {
        if (error) {
          setShowModalError(true);
          setModalMessage(error.message);
        }
      }
    }
  };

  const handleToggleDrawer = () => {
    return setOpenDrawer(!openDrawer);
  };

  const handleCloseModalError = () => {
    if (errorMessage !== "") {
      dispatch({
        type: Types.CLEAN_MESSAGE_ERROR,
      });
    }

    if (selectedTodo.id) {
      setSelectedTodo({} as IUserTodos);
    }

    return setShowModalError(false);
  };

  const handleCloseTodosModal = () => {
    if (selectedTodo) {
      setSelectedTodo({} as IUserTodos);
    }

    return setShowCreateTodoModal(false);
  };

  const handleModalWarningConfirm = async () => {
    if (isDeleting) {
      try {
        const result = await api.post("/todo/delete", {
          todo_id: selectedTodo.id,
        });

        const updatedTodo = data.filter((todo) => todo.id !== selectedTodo.id);

        dispatch({
          type: Types.UPDATE_TODO_LIST,
          data: updatedTodo,
        });

        setIsDeleting(false);
        setSelectedTodo({} as IUserTodos);
        return handleCloseModalError();
      } catch (err) {
        const error: IErrorHandlerResults = handleErrors(err);

        if (error && error.status) {
          setModalMessage(error.message);
          setShowModalError(true);
        } else {
          if (error) {
            setShowModalError(true);
            setModalMessage(error.message);
          }
        }
      }

      setIsDeleting(false);
      setSelectedTodo({} as IUserTodos);
    }

    return handleCloseModalError();
  };

  const handleEdit = (todo: IUserTodos) => {
    setSelectedTodo(todo);
    setShowCreateTodoModal(true);
  };

  const handleDelete = (todo: IUserTodos) => {
    setSelectedTodo(todo);

    setIsDeleting(true);

    setModalMessage(
      "Você deseja realmente excluir esta tarefa permanentemente?"
    );

    setShowModalError(true);
  };

  const modalRef: any = useRef();

  const monitoringClick = useCheckIfClickedOutside({
    showModalError,
    handleClose: handleCloseModalError,
    modalRef,
  });

  const monitoringTodoModalClick = useCheckIfClickedOutside({
    showModalError: showCreateTodoModal,
    handleClose: handleCloseTodosModal,
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
    <MU.Container maxWidth={false} className="background todo__container ">
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

          <div
            className={`tasks glass-background ${
              openDrawer && "is_open"
            } custom-scrollbar larger-scroll`}
          >
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
                <Icons
                  name="add"
                  Styles={{ color: "#fff" }}
                  handleClick={() => setShowCreateTodoModal(true)}
                />
              </div>
            </div>

            <div className="tasks__list ">
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
                      <Icons
                        name="open_in_new"
                        handleClick={() => handleEdit(task)}
                      />
                      <Icons
                        name="delete_outline"
                        handleClick={() => handleDelete(task)}
                      />
                      <p>
                        {handleFormatFirstPhraseLetterToUpperCase(task.task)}
                      </p>
                    </div>
                    <div className="tasks__list__my-task__description">
                      <p>
                        {handleFormatFirstPhraseLetterToUpperCase(
                          task.description
                        )}
                        PASDKOKODSKOPADSPKODSAOPKASDPKOSDAPKO
                        ASDOPKDSAOKADSOPPKDSAOASD ASKOPDSAOK
                      </p>
                    </div>
                    <div className="tasks__list__my-task__set-concluded">
                      <MU.FormControlLabel
                        control={
                          <MU.Switch
                            defaultChecked={task.has_completed === 1}
                            checked={task.has_completed === 1}
                            onChange={() =>
                              handleToggleSwitch(task.has_completed, task.id)
                            }
                          />
                        }
                        label=""
                      />
                    </div>
                    <div className="tasks__list__my-task__status">
                      {task.has_completed === 1
                        ? task.finished_at?.replace(":", "h") + "m"
                        : "Em andamento"}
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
          handleClose={handleCloseModalError}
          handleConfirm={handleModalWarningConfirm}
          modalMessage={modalMessage}
          modalRef={modalRef}
        />
      )}

      {showCreateTodoModal && (
        <CreateTodoModal
          show={showCreateTodoModal}
          handleClose={handleCloseTodosModal}
          modalRef={modalRef}
          selectedTodo={selectedTodo}
        />
      )}
    </MU.Container>
  );
};

export default TodoList;
