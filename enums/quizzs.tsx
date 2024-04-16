import { Theme } from "@/pages/menu/[username]";
import { Chapter } from "@/pages/menu/[username]";
export type Question = {
  answer: string;
  choices: string[];
  question: string;
};

export const EMPTY_QUESTION: Question = Object.freeze({
  answer: "",
  choices: ["", "", "", ""],
  question: "",
});

export const EMPTY_THEME: Theme = {
  id: "",
  name: "",
  chapters: [],
};
