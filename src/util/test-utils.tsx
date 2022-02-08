import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
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

const mockSelectorUserID = (id: number = -1) => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(() => {
      const value = {
        id: id,
      };

      return value;
    });
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });
};

const mockUserDB = {
  email: "vocejogos5@gmail.com",
  id: 255,
  username: "simpaaa",
  password: "gabriel123",
};

export * from "@testing-library/react";
export { render, mockSelectorUserID, mockUserDB };
