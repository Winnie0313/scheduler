import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // stored the day state in the <Application> component instead of in DayList because Appoinment will need to have access to day state as well

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // get the appointments for the selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // get the interviewers for the selected day
  const interviewers = getInterviewersForDay(state, state.day);

  // create list of appointment HTML 
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            // When we change the state, the <Application> renders and passes the new day to the <DayList></DayList>
            // The <DayList> renders and passes props to the <DayListItem> children causing the updates to the selected visual state.
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
