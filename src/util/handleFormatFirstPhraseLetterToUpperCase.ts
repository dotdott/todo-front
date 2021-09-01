export const handleFormatFirstPhraseLetterToUpperCase = (
  text: string | undefined | null
) => {
  if (text && text.length > 0) {
    const textArray = text.split(" ");

    return textArray[0][0].toUpperCase() + text.slice(1);
  }

  return "";
};
