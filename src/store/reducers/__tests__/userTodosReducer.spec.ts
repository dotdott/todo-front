import {
  Types as TypesUserTodos,
  INITIAL_STATE,
  userTodosRequest,
  userTodosSuccess,
  userTodosFailure,
  cleanUserTodos,
  cleanMessageError,
  updateTodoList,
  Creators,
} from "../userTodosReducer";

const mockUserTodosState = {
  search: { value: "any" },
  page: 0,
  perPage: 10,
  user_id: 100,
  has_completed: 1,
};

describe("types", () => {
  it("should export correctly its types", () => {
    expect(TypesUserTodos).toEqual({
      USER_TODOS_REQUEST: "USER_TODOS_REQUEST",
      USER_TODOS_SUCCESS: "USER_TODOS_SUCCESS",
      USER_TODOS_FAILURE: "USER_TODOS_FAILURE",
      CLEAN_USER_TODOS: "CLEAN_USER_TODOS",
      CLEAN_MESSAGE_ERROR: "CLEAN_MESSAGE_ERROR",
      UPDATE_TODO_LIST: "UPDATE_TODO_LIST",
    });
  });
});

describe("Creators", () => {
  describe("USER_TODOS_REQUEST", () => {
    const paramsTypes = {
      search: "search",
      page: 1,
      perPage: 10,
      user_id: 1,
      has_completed: 1,
    };

    it("should return the expected action", () => {
      expect(Creators.userTodosRequest()).toEqual({
        type: TypesUserTodos.USER_TODOS_REQUEST,
      });
    });

    it("should return the expected action with passed arguments", () => {
      expect(Creators.userTodosRequest("search", 1, 10, 1, 1)).toEqual({
        type: TypesUserTodos.USER_TODOS_REQUEST,
        ...paramsTypes,
      });
    });

    it("should ignore extra args", () => {
      expect(
        Creators.userTodosRequest("search", 1, 10, 1, 1, 302913, "sdaj")
      ).toEqual({
        type: TypesUserTodos.USER_TODOS_REQUEST,
        ...paramsTypes,
      });
    });
  });
});

describe("reducers", () => {
  describe("userTodosRequest", () => {
    it("should ignore type argument, and return default state values and updated passed values from arguments", () => {
      expect(
        userTodosRequest(undefined, {
          ...mockUserTodosState,
          type: "USER_TODOS_REQUEST",
        })
      ).toEqual({ ...INITIAL_STATE, ...mockUserTodosState, isLoading: true });
    });
  });

  describe("userTodosSuccess", () => {
    it("should ignore type argument, and return default state values and updated passed values from arguments", () => {
      expect(
        userTodosSuccess(undefined, {
          data: [],
          type: "USER_TODOS_SUCCESS",
        })
      ).toEqual({
        ...INITIAL_STATE,
        data: [],
        isLoading: false,
        has_completed: 0,
      });
    });
  });

  describe("userTodosFailure", () => {
    it("should ignore type argument, and return default state values and updated passed values from arguments", () => {
      expect(
        userTodosFailure(undefined, {
          errorMessage: "some error message",
          type: "USER_TODOS_FAILURE",
        })
      ).toEqual({
        ...INITIAL_STATE,
        errorMessage: "some error message",
        isLoading: false,
        has_completed: 0,
      });
    });
  });
});
