import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // combined state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

   // request data for days and appointments from different APIs
   useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      console.log("all is: ", all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })); //update the state
    })
  }, [])

  // select the day 
  const setDay = day => setState(prev => ({ ...prev, day }));

  // use the appointment id to find the right appointment slot, and book the interview for the appointment lot
  // and update the interview data on api
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({ ...state, appointments });
      })
  }

  // use the appointment id to find the right appointment slot 
  // and set it's interview data to null on api 
  // and update local state
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({ ...state, appointments });
      })
  }


  return { state, setDay, bookInterview, cancelInterview };
}