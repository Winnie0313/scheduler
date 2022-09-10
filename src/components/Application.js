import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";



const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {
  // stored the day state in the <Application> component instead of in DayList because Appoinment will need to have access to day state as well
  
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})
  
  // combined state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));




  useEffect(() => {
    axios.get('/api/days')
      .then(res => {
        const newDays = res.data;
        // console.log("result", res.data);
        // setDays(res.days)
        setDays(newDays);
        // console.log("days data: ", days);
      })
  }, []);


  // we can only use map on array. Object.values returns an array of the given object's value
  const appoinmentList = Object.values(appointments).map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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
        {appoinmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
