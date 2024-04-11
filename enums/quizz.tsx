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
