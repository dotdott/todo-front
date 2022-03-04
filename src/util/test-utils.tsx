import * as redux from "react-redux";

import { render as rtlRender, fireEvent } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { IUserTodos } from "src/global/@types";
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

const mockTodos: IUserTodos[] = [
  {
    task: "New Task",
    description: "Yeaa!! task finished 👵",
    finished_at: "03/03/2022 15:30",
    has_completed: 1,
    id: 101,
    user_id: 1,
  },
  {
    task: "New Uncompleted Task",
    description: "Should do this task soon.",
    finished_at: "",
    has_completed: 0,
    id: 102,
    user_id: 1,
  },
];

const changeInputValue = (input: Element | null, val: string | number) => {
  if (input) {
    fireEvent.change(input, { target: { value: val } });
  }
};

const spySelector = (values: any = {}) => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, "useSelector");

    spy.mockReturnValue(values);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
};

export * from "@testing-library/react";
export {
  render,
  mockSelectorUserID,
  mockUserDB,
  mockTodos,
  changeInputValue,
  spySelector,
};
