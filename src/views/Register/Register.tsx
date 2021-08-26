import React, { useRef, useState } from "react";
import * as MU from "@material-ui/core";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";

import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";
import { IUser, Types } from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { IErrorHandlerResults, IStateUser } from "../../global/@types";

import "../Login/styles.scss";
import { handleErrors } from "../../util/handleErrors";
import { setToken } from "../../services/Token";
import { useCheckIfClickedOutside } from "../../hooks/useCheckIfClickedOutside";
import ModalWarning from "../../components/ModalWarning";

interface IRegisterResults {
  user: IUser;
  token: string;
}

const Register = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnteringPage, setIsEnteringPage] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const dispatch = useDispatch();
  const { id } = useSelector((state: IStateUser) => state.stateUser);
  const history = useHistory();

  const modalRef: any = useRef();

  const handleCloseModal = () => {
    return setShowModalError(false);
  };

  const monitoringClick = useCheckIfClickedOutside({
    showModalError,
    handleClose: handleCloseModal,
    modalRef,
  });

  const handleCreateAccount = async () => {
    const { email, password, password2, username } = formFields;
    setIsLoading(true);

    try {
      if (password !== password2) {
        setIsLoading(false);
        return setErrorMessage("As senhas precisam ser identicas!");
      }

      const { data } = await api.post<IRegisterResults>("/register", {
        email,
        password,
        username,
      });

      const user = data.user;

      dispatch({
        type: Types.ADD_USER,
        id: user.id,
        email: user.email,
        username: user.username,
        saveLogin: true,
      });

      await setToken(data.token);

      return history.push("/tarefas");
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
    if (id !== -1) return history.goBack();

    setIsEnteringPage(false);
  }, [id]);

  return (
    <MU.Container maxWidth={false} className="background auth__container">
      {!isEnteringPage && (
        <div className="auth__wrapper">
          <p className="auth__wrapper__title">Crie sua conta:</p>

          <form className="auth__input__fields" autoComplete="off">
            <MU.TextField
              id="auth-username"
              label="Usuário"
              variant="outlined"
              className={`${formFields.username !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, username: e.target.value })
              }
            />
            <MU.TextField
              id="auth-email"
              label="E-mail"
              variant="outlined"
              className={`${formFields.email !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
            />
            <MU.TextField
              id="auth-password"
              label="Senha"
              variant="outlined"
              type="password"
              className={`${formFields.password !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
            />
            <MU.TextField
              id="auth-password2"
              label="Confirmar senha"
              variant="outlined"
              type="password"
              className={`${formFields.password2 !== "" ? "its_filleded" : {}}`}
              onChange={(e) =>
                setFormFields({ ...formFields, password2: e.target.value })
              }
            />
            {errorMessage !== "" && (
              <p className="auth__wrapper__error">{errorMessage}</p>
            )}

            <Button btnClasses="_red" btnFunction={handleCreateAccount}>
              Registrar
            </Button>

            <p className="auth__wrapper__invitation">
              Já tem uma conta?{" "}
              <a className="auth__wrapper__invitation__link" href="/login">
                Login
              </a>
            </p>
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

export default Register;
