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
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })); //update the state
    })
  }, [])

  // select the day 
  const setDay = day => setState(prev => ({ ...prev, day }));

  // count the remaining spots for the selected day 
  const countSpots = (newAppointments) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const apptIds = currentDay.appointments;

    const apptList = apptIds.map((id) => newAppointments[id]);
    const freeApts = apptList.filter((id) => newAppointments[id].interview === null);
    const amountFreeApts = freeApts.length;

    return amountFreeApts;
  };

  // helper function to update the Spots after booked/canceled an interview
  const updateSpots = (newAppointments) => {

    //count the remaining spots
    return state.days.map((eachDay) => {
      let freeSpots = 0;
      for (let appointmentId of eachDay.appointments) {
        if (newAppointments[appointmentId].interview === null) {
          freeSpots++;
        }
      }
      return { ...eachDay, spots: freeSpots }

    })

  };


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
        // update local state with new appointments and the spots remaining
        setState({...state, appointments, days: updateSpots(appointments)})

      })
      .catch((err) => {
        return err;
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
        setState({...state, appointments, days: updateSpots(appointments)})
      })
  }


  return { state, setDay, bookInterview, cancelInterview };
}