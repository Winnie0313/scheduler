describe("Navigation", () => {
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    // find the <li> element that contains "Tuesday"
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});

