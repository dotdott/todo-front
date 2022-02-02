import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../store";
const { store } = configureStore();

type IMockComponent = {
  Component: () => JSX.Element;
  rest?: any;
};

export const MockComponent = ({ Component, rest }: IMockComponent) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Component {...rest} />
      </BrowserRouter>
    </Provider>
  );
};
