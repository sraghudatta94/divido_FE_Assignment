context('Form Page', () => {
  before(() => {
    cy.fixture('lenders').then((lenders: LenderFixture) => {
      this.lenders = lenders;
    });
  });

  beforeEach(() => {
    const host = Cypress.config()['host'];
    cy.visit(host);
  });

  it('Empty name field validation', () => {
    cy.contains(`Bank of Azeroth`).click();
    cy.contains(`Fill Dummy Data`).click();
    cy.get('#first_name').clear();

    cy.contains(`Submit`).click();
    cy.wait(3000);
    cy.contains(`first name is required.`);

    cy.contains(`Reset`).click();
    cy.contains(`Fill Dummy Data`).click();
    cy.contains(`Submit`).click();
    cy.wait(3000);
    cy.contains(`Ok`).click();
  });
});
