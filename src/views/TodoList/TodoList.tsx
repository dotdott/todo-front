import React, { useEffect } from "react";
import * as MU from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import Icons from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../store/reducers/userTodosReducer";
import { IStateUser, IStateUserTodos } from "../../global/@types";
import LoadingScreen from "../../components/LoadingScreen";
import Drawer from "./components/Drawer";

const TodoList = () => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const { isLoading } = useSelector(
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
      user_id: id,
    });
  }, []);

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
            <div className="drawer__wrapper__toggle-bubble">
              <Icons
                name="keyboard_double_arrow_right"
                Styles={{ color: "#fff" }}
                handleClick={handleToggleDrawer}
              />
            </div>
          )}

          <div className={`tasks ${openDrawer && "is_open"}`}>
            <p>Tarefas</p>
          </div>
        </>
      )}
    </MU.Container>
  );
};

export default TodoList;
