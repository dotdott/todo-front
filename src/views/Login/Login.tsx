import React, { useState } from "react";
import * as MU from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/api";
import { setToken } from "../../services/Token";

import { useHistory } from "react-router-dom";
import { IUser } from "src/store/reducers/types/@typesUserReducer";
import { Types } from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { IErrorHandlerResults, IStateUser } from "../../global/@types";
import { handleErrors } from "../../util/handleErrors";
import { useRef } from "react";
import { useCheckIfClickedOutside } from "../../hooks/useCheckIfClickedOutside";

import ModalWarning from "../../components/ModalWarning";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import "./styles.scss";
import { useKey } from "../../hooks/useKey";

interface ILoginResults {
  user: IUser[];
  token: string;
}

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnteringPage, setIsEnteringPage] = React.useState(true);
  const [showModalError, setShowModalError] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const dispatch = useDispatch();
  const { id } = useSelector((state: IStateUser) => state.stateUser);
  const history = useHistory();

  const modalRef: any = useRef();

  const pressed_enter = useKey("Enter");

  const handleCloseModal = () => {
    return setShowModalError(false);
  };

  // eslint-disable-next-line
  const monitoringClick = useCheckIfClickedOutside({
    showModalError,
    handleClose: handleCloseModal,
    modalRef,
  });

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

      await setToken(data.token);

      setTimeout(() => {
        return history.push("/tarefas");
      }, 5000);
    } catch (err) {
      const error: IErrorHandlerResults = handleErrors(err);

      if (error && error.status) {
        setModalMessage(error.message);
        setShowModalError(true);
      } else {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (inputFocus && pressed_enter) {
      handleLogin();
    }
  }, [pressed_enter]);

  useEffect(() => {
    if (id !== -1) return history.goBack();

    setIsEnteringPage(false);
  }, [id]);

  return (
    <MU.Container maxWidth={false} className="background auth__container">
      {!isEnteringPage && (
        <div className="auth__wrapper">
          <p className="auth__wrapper__title">Acesse sua conta:</p>

          <form className="auth__input__fields" autoComplete="off">
            <MU.TextField
              id="auth-email"
              label="E-mail"
              variant="outlined"
              name="email"
              className={`${formFields.email !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
            <MU.TextField
              id="auth-pass"
              label="Senha"
              name="password"
              variant="outlined"
              type="password"
              className={`${formFields.password !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
            {errorMessage !== "" && (
              <p className="auth__wrapper__error">{errorMessage}</p>
            )}

            <Button btnClasses="_red" btnFunction={handleLogin}>
              Entrar
            </Button>

            <p className="auth__wrapper__invitation">
              Ainda n??o tem uma conta?{" "}
              <a className="auth__wrapper__invitation__link" href="/registrar">
                Registre-se
              </a>
            </p>
            <div className="auth__wrapper__sub-sections">
              <a href="#">Esqueci minha senha</a>
            </div>
          </form>
        </div>
      )}

      {showModalError && (
        <ModalWarning
          show={showModalError}
          handleClose={handleCloseModal}
          handleConfirm={handleCloseModal}
          modalMessage={modalMessage}
          modalRef={modalRef}
        />
      )}

      {isLoading && <LoadingScreen />}
    </MU.Container>
  );
};

export default Login;
