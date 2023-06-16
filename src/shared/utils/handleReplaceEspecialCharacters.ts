function handleRemoveSpecialCharacters(text: string): string {
  return text.replace(/[^\w\s]/gi, "");
}

export { handleRemoveSpecialCharacters };
