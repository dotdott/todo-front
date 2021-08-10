import React from "react";
import { api } from "../../services/api";
import "./styles.scss";

const Home = () => {
  const email = "vocejogos@gmail.com";
  const password = "vocejogos";

  const handleLogin = async () => {
    try {
      const response = await api.get("/login", { params: { email, password } });

      console.log("loguei");
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Home;
