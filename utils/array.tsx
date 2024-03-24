import { Subject, Chapter } from "@/pages/menu/[username]";
export function filterQuizzByOption(
  array: Subject[] | Chapter[],
  optionSelected: string,
  key: string
) {
  return array.filter((object) => {
    console.log(object);
    if (optionSelected === "All") {
      return object;
    } else {
      return object[key === "name" ? "name" : "difficulty"] === optionSelected;
    }
  });
}

// handle access to difficulty in DATA
