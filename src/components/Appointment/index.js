import React from 'react'
//import the stylesheet
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



export default function Appoinment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />

      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}

    </article>
  );
};