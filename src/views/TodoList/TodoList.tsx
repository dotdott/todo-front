import React, { useEffect } from "react";
import * as MU from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import Icons from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  IUserTodosReducer,
  Types,
} from "../../store/reducers/userTodosReducer";
import { IStateUser } from "../../global/@types";
import LoadingScreen from "../../components/LoadingScreen";

interface IStateUserTodos {
  stateUserTodos: IUserTodosReducer;
}

const TodoList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data, isLoading } = useSelector(
    (state: IStateUserTodos) => state.stateUserTodos
  );

  const { id } = useSelector((state: IStateUser) => state.stateUser);

  const dispatch = useDispatch();

  const handleToggleDrawer = () => {
    return setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    dispatch({
      type: Types.USER_TODOS_REQUEST,
    });
  }, [id]);

  return (
    <MU.Container maxWidth={false} className="background todo__container">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            className={`completed__wrapper ${openDrawer ? "open" : "closed"}`}
          >
            <div className="completed__wrapper__header">
              <p className="completed__wrapper__header-text">Completados</p>

              <div
                className="completed__wrapper__toggle-bubble"
                style={{ marginTop: 0 }}
              >
                <Icons
                  name="keyboard_double_arrow_left"
                  Styles={{ color: "#fff" }}
                  handleClick={handleToggleDrawer}
                />
              </div>
            </div>
          </div>
          {!openDrawer && (
            <div className="completed__wrapper__toggle-bubble">
              <Icons
                name="keyboard_double_arrow_right"
                Styles={{ color: "#fff" }}
                handleClick={handleToggleDrawer}
              />
            </div>
          )}

          <div className="tasks">
            <p>Tarefas</p>
          </div>
        </>
      )}
    </MU.Container>
  );
};

export default TodoList;
