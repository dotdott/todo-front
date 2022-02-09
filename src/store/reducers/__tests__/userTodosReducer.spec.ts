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
