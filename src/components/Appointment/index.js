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
import Error from './Error';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const COMFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appoinment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true))
  };


  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  function close() {
    back();
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(COMFIRM)}
          onEdit={() => transition(EDIT)}
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

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_DELETE && <Error onClose={close} message="Could not cancel appointment." />}
      {mode === ERROR_SAVE && <Error onClose={close} message="Could not save appointment." />}



    </article>
  );
};