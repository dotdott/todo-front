import reducer, {
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
