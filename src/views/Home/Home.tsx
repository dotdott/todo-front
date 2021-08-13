import { Button, Container, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
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
    <Container maxWidth={false}>
      <Button variant="outlined" className="testt">
        Default
      </Button>
      <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetUserTodos}>Request Todos</button>
    </Container>
  );
};

export default Home;
