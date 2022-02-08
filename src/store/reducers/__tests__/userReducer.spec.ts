import reducer, {
  Types as TypesUser,
  INITIAL_STATE,
  addUser,
  cleanUser,
  Creators,
} from "../userReducer";

describe("types", () => {
  it("should export correctly its types", () => {
    expect(TypesUser).toEqual({
      ADD_USER: "ADD_USER",
      CLEAN_USER: "CLEAN_USER",
    });
  });
});
