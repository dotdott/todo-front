import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import "./styles.scss";
import moeImg from "../../assets/moe.png";
import { NavLink, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const handleChangeScreen = () => {};

  return (
    <header className="navbar">
      <div className="navbar__go-home">
        <img
          src={moeImg}
          alt=""
          className="navbar__go-home__img"
          onClick={() => history.push("/")}
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
        <NavLink
          to="/login"
          className="navbar__navigation__hrefs"
          activeClassName="current"
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
