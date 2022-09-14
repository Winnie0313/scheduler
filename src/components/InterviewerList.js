import React from "react";
import PropTypes from 'prop-types'; 
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
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
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
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired // You can chain any of the above with `isRequired` to make sure a warning is shown if the prop isn't provided.
};