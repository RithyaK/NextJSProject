import { Subject, Chapter } from "@/pages/menu/[username]";

export function filterQuizzByOption(
  array: Subject[] | Chapter[],
  optionSelected: string,
  key: string,
  selectPart: "Thématique" | "difficulty"
) {
  return array.filter((object) => {
    if (optionSelected === selectPart) {
      return object;
    } else {
      return object[key === "name" ? "name" : "difficulty"] === optionSelected;
    }
  });
}

// handle access to difficulty in DATA
