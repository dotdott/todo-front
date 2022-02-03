import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import moeImg from "src/assets/moe.png";
import { IStateUser } from "src/global/@types";
import { cleanToken } from "src/services/Token";
import { Types } from "src/store/reducers/userReducer";
import { Types as TypesTodos } from "src/store/reducers/userTodosReducer";
import "./styles.scss";

const Navbar = () => {
  const history = useHistory();
  const { id } = useSelector((state: IStateUser) => state.stateUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await cleanToken();

    dispatch({
      type: Types.CLEAN_USER,
    });
    dispatch({
      type: TypesTodos.CLEAN_USER_TODOS,
    });

    return history.push("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar__go-home">
        <img
          src={moeImg}
          alt=""
          className="navbar__go-home__img"
          onClick={() => history.push("/tarefas")}
        />
      </div>

      <nav className="navbar__navigation">
        <NavLink
          to="/tarefas"
          className="navbar__navigation__hrefs"
          activeClassName="current"
        >
          Minhas Tarefas
        </NavLink>
        {id === -1 ? (
          <NavLink
            to="/login"
            className="navbar__navigation__hrefs"
            activeClassName="current"
          >
            Login
          </NavLink>
        ) : (
          <span
            className="navbar__navigation__hrefs"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
