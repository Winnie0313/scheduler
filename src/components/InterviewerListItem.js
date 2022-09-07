import React from "react";
// import the classNames library to dynamically set className to match with corret style
import classNames from "classnames";
//import the stylesheet
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", { // conditionally apply css by given dynamic className
    "interviewers__item--selected": props.selected
  });


  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name} {/* Conditional redering. Need curly bracket because wrting js in JSX */}
    </li>
  );
}