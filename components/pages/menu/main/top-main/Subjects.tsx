import React from "react";

const Subjects = ({ quizzs }) => {
  return (
    <ul>
      {quizzs.map((subject) => {
        return <li key={subject.id}>{subject.name}</li>;
      })}
    </ul>
  );
};

export default Subjects;
