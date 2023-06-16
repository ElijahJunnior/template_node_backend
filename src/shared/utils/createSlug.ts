import { handleReplaceAccent } from "./handleReplaceAccent";
import { handleRemoveSpecialCharacters } from "./handleReplaceEspecialCharacters";
import { handleReplaceSpaceCharacter } from "./handleReplaceSpaceCharacter";

export function handleCreateSlug(value: string): string {
  let handled_value = value.toLowerCase().trim();

  handled_value = handleReplaceAccent(value);

  handled_value = handleRemoveSpecialCharacters(handled_value);

  handled_value = handleReplaceSpaceCharacter(handled_value, "_");

  return handled_value;
}
