import { Container, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { api } from "../../services/api";
import { setToken } from "../../services/Token";
import { Types } from "../../store/reducers/userTodosReducer";
import "./styles.scss";

const Home = () => {
  const email = "vocejogos@gmail.com";
  const password = "vocejogos";

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const { data } = await api.get("/login", {
        params: { email, password },
      });

      setToken(data.token);

      return data.token;
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUserTodos = () => {
    dispatch({
      type: Types.USER_TODOS_REQUEST,
    });
  };

  return (
    <div className="background">
      <p>Home</p>
    </div>
  );
};

export default Home;
