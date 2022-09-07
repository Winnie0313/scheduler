import React from "react";
import InterviewerListItem from "./InterviewerListItem";
//import the stylesheet
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const InterviewerHTML = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        id={interviewer.id}
        selected={props.interviewer === interviewer.id}
        setInterviewer={props.setInterviewer}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerHTML}
      </ul>
    </section>
  );
}