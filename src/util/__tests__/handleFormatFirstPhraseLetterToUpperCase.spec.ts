import { handleFormatFirstPhraseLetterToUpperCase } from "../handleFormatFirstPhraseLetterToUpperCase";

describe("handleFormatFirstPhraseLetterToUpperCase", () => {
  describe("should return empty string", () => {
    it("should return empty string when passed UNDEFINED value", () => {
      const result = handleFormatFirstPhraseLetterToUpperCase(undefined);

      expect(result).toBe("");
    });

    it("should return empty string when passed NULL value", () => {
      const result = handleFormatFirstPhraseLetterToUpperCase(null);

      expect(result).toBe("");
    });

    it("should return empty string when passed EMPTY STRING value", () => {
      const result = handleFormatFirstPhraseLetterToUpperCase("");

      expect(result).toBe("");
    });
  });

  it("should return the passed string first letter in UPPERCASE", () => {
    const value = "test string";

    const result = handleFormatFirstPhraseLetterToUpperCase(value);

    expect(result).toBe("Test string");
  });
});
