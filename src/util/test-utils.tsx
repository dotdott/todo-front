import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../store";
const { store } = configureStore();

export const Wrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

function render(ui: JSX.Element, { ...renderOptions }: any = {}) {
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
