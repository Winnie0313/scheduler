// component test using Jest
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

import axios from "axios";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  waitForElementToBeRemoved
} from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

afterEach(cleanup);

/*
  A test that renders a React Component
*/
describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // return waitForElement(() => getByText("Monday")).then(() => {
    //   fireEvent.click(getByText("Tuesday"));

    //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // });

    await waitForElement(() => getByText("Monday")); // same as above. We need to wait for the api result to load the page with datas, then we can end the test. With await the function will not run to completion until the Promise that we are awaiting has resolved.

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    //getByTest is imported from testing-library, not the one bounded to the render function above
    await waitForElement(() => getByText(container, "Archie Cohen")); // same as above. We need to wait for the api result to load the page with datas, then we can go to the next step. With await the function will not run to completion until the Promise that we are awaiting has resolved.

    // get the empty appointment lot
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // fire the add button of above appointment lot
    fireEvent.click(getByAltText(appointment, "Add"))

    // input the student name in the form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // debug(container);

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    
    fireEvent.click(getByAltText(appointment, "Delete"))

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // 3. Click the "Eddit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"))
    
    // change the student name 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Tom Wang" }
    });

    // change the interviewer
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  
    // and save the interview.
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Tom Wang"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();
    
    const { container, debug } = render(<Application />);

    //getByTest is imported from testing-library, not the one bounded to the render function above
    await waitForElement(() => getByText(container, "Archie Cohen")); // same as above. We need to wait for the api result to load the page with datas, then we can go to the next step. With await the function will not run to completion until the Promise that we are awaiting has resolved.

    // get the empty appointment lot
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // fire the add button of above appointment lot
    fireEvent.click(getByAltText(appointment, "Add"))

    // input the student name in the form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    
    // save the appointment
    fireEvent.click(getByText(appointment, "Save"));

    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
  
    
    await waitForElement(() => getByText(appointment, "Could not save appointment."));

    
    debug()
  });

})

