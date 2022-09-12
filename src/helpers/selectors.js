// returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  // find the day object
  const dayObj = state.days.find(item => item.name === day);

  if (!dayObj) {
    return [];
  }
  // find the appointment object with the same id
  for (let id of dayObj.appointments) {
    let appointment = state.appointments[id];
    appointmentsArray.push(appointment);
  }

  return appointmentsArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return interviewObj;
}