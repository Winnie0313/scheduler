// component test using Jest
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText} from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

afterEach(cleanup);

/*
  A test that renders a React Component
*/
describe ("Application", () => {

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
    console.log(prettyDOM(appointment));

    // fire the add button of above appointment lot
    fireEvent.click(getByAltText(appointment, "Add"))

    // input the student name in the form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));


    // fireEvent.click(getByAltText("Tuesday"));
  
    // expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

})
