import { render as rtlRender, fireEvent } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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

type IMockUserDB = {
  email: string;
  id?: number;
  username: string;
  password: string;
};

const mockUserDB: IMockUserDB = {
  email: "vocejogos5@gmail.com",
  id: 255,
  username: "simpaaa",
  password: "gabriel123",
};

const changeInputValue = (input: any, val: any) => {
  if (input) {
    fireEvent.change(input, { target: { value: val } });
  }
};

export * from "@testing-library/react";
export { render, mockSelectorUserID, mockUserDB, changeInputValue };
