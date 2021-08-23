import React, { useState } from "react";
import "./styles.scss";
import * as MU from "@material-ui/core";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/api";
import { setToken } from "../../services/Token";
import LoadingScreen from "../../components/LoadingScreen";
import { useHistory } from "react-router-dom";
import { IUser, Types } from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { IStateUser } from "../../global/@types";

interface ILoginResults {
  user: IUser[];
  token: string;
}

const Login = () => {
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnteringPage, setIsEnteringPage] = useState(true);

  const dispatch = useDispatch();
  const { id } = useSelector((state: IStateUser) => state.stateUser);
  const history = useHistory();

  const handleLogin = async () => {
    const { email, password } = formFields;
    setIsLoading(true);

    try {
      const { data } = await api.get<ILoginResults>("/login", {
        params: { email, password },
      });
      const user = data.user[0];

      dispatch({
        type: Types.ADD_USER,
        id: user.id,
        email: user.email,
        username: user.username,
      });

      setToken(data.token);

      history.push("/tarefas");
    } catch (err) {
      setErrorMessage(err.response.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (id !== -1) return history.goBack();

    setIsEnteringPage(false);
  }, [id]);

  return (
    <MU.Container maxWidth={false} className="background auth__container">
      {!isEnteringPage && (
        <body className="auth__wrapper">
          <p className="auth__wrapper__title">Acesse sua conta:</p>

          <form className="auth__input__fields" autoComplete="off">
            <MU.TextField
              id="outlined-secondary"
              label="E-mail"
              variant="outlined"
              className={`${formFields.email !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
            />
            <MU.TextField
              id="outlined-secondary"
              label="Senha"
              variant="outlined"
              className={`${formFields.password !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
            />
            {errorMessage !== "" && (
              <p className="auth__wrapper__error">{errorMessage}</p>
            )}

            <Button btnClasses="_red" btnFunction={handleLogin}>
              Entrar
            </Button>

            <p className="auth__wrapper__invitation">
              Ainda não tem uma conta?{" "}
              <a className="auth__wrapper__invitation__link" href="/registrar">
                Registre-se
              </a>
            </p>
          </form>
        </body>
      )}

      {isLoading && <LoadingScreen />}
    </MU.Container>
  );
};

export default Login;
