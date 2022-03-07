import { useSelector } from "react-redux";
import Icons from "../../../../components/Icons";
import { IStateUserTodos } from "../../../../global/@types";
import "./styles.scss";

interface IDrawerProps {
  handleToggleDrawer: () => void;
  openDrawer: boolean;
}

const Drawer = ({ handleToggleDrawer, openDrawer }: IDrawerProps) => {
  const { data } = useSelector(
    (state: IStateUserTodos) => state.stateUserTodos
  );

  return (
    <div className={`drawer__wrapper ${openDrawer ? "open" : "closed"}`}>
      {openDrawer && (
        <>
          <div className="drawer__wrapper__header">
            <p className="drawer__wrapper__header-text">Completados</p>

            <div
              className="drawer__wrapper__toggle-bubble"
              style={{ marginTop: 0 }}
            >
              <Icons
                name="keyboard_double_arrow_left"
                Styles={{ color: "#fff" }}
                handleClick={handleToggleDrawer}
                data-testid="toggle-drawer-test"
              />
            </div>
          </div>

          <div className="drawer__body custom-scrollbar">
            {data &&
              data.length > 0 &&
              data.map(
                (task) =>
                  task.has_completed === 1 && (
                    <div className="todo__tasks" key={task.id}>
                      <div className="todo__tasks__name">
                        <p>{task.task}</p>

                        <div className="icon_circle">
                          <Icons
                            name="check"
                            Styles={{
                              color: "hsl(0, 100%, 69%)",
                              cursor: "default",
                            }}
                          />
                        </div>
                      </div>

                      <div className="todo__tasks__description">
                        <p>{task.description}</p>
                      </div>

                      <div className="todo__tasks__finished-time">
                        <p>{task.finished_at?.replace(":", "h")}m</p>
                      </div>
                    </div>
                  )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default Drawer;
