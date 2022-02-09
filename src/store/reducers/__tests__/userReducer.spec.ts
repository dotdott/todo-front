import {
  Types as TypesUser,
  INITIAL_STATE,
  addUser,
  cleanUser,
  Creators,
} from "../userReducer";

const mockUserReducer = {
  username: "Gabriel",
  email: "gabriel.jodas@test.com",
  id: 1,
};

describe("types", () => {
  it("should export correctly its types", () => {
    expect(TypesUser).toEqual({
      ADD_USER: "ADD_USER",
      CLEAN_USER: "CLEAN_USER",
    });
  });
});

describe("Creators", () => {
  describe("addUser", () => {
    it("should return the expected action", () => {
      expect(Creators.addUser()).toEqual({
        type: TypesUser.ADD_USER,
      });
    });

    it("should receive expected data when passed in creator action", () => {
      const m = mockUserReducer;

      expect(Creators.addUser(m.username, m.email, m.id)).toEqual({
        type: TypesUser.ADD_USER,
        ...mockUserReducer,
      });
    });

    it("should ignore extra arguments", () => {
      const m = mockUserReducer;

      expect(Creators.addUser(m.username, m.email, m.id, "new value")).toEqual({
        type: TypesUser.ADD_USER,
        ...mockUserReducer,
      });
    });
  });

  describe("cleanUser", () => {
    it("should return the expected action", () => {
      expect(Creators.cleanUser()).toEqual({
        type: TypesUser.CLEAN_USER,
      });
    });

    it("should ignore extra arguments", () => {
      expect(Creators.cleanUser({ value: "new arg" })).toEqual({
        type: TypesUser.CLEAN_USER,
      });
    });
  });
});

describe("reducers", () => {
  describe("addUser", () => {
    it("should not returns action type, and update userReducer with passed values", () => {
      expect(
        addUser(undefined, { ...mockUserReducer, type: "ADD_USER" })
      ).toEqual({ ...mockUserReducer, type: "ADD_USER" });
    });
  });

  describe("cleanUser", () => {
    it("should return user reducer to its initial state", () => {
      expect(cleanUser()).toEqual(INITIAL_STATE);
    });
  });
});
