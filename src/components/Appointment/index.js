import React from 'react'
//import the stylesheet
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const COMFIRM = "CONFIRM";

export default function Appoinment(props) {
  console.log("redering appointment: ", props.id);
  console.log("interview is: ", props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  console.log("mode is: ", mode)


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  };


  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(COMFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === COMFIRM && <Confirm
        message="Are you sure?"
        onCancel={back}
        onConfirm={deleteInterview}
      />}

    </article>
  );
};