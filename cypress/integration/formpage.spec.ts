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

  it('Bank 1 flow', () => {
    cy.contains(`Bank of Azeroth`).click();
    cy.contains(`Fill Dummy Data`).click();
    cy.contains(`Submit`).click();
    cy.wait(3000);
    cy.contains(`OK`).click();
  });

  it('Bank 2 flow', () => {
    cy.contains(`Middle Earth Bank`).click();
    cy.contains(`Fill Dummy Data`).click();
    cy.contains(`Submit`).click();
    cy.wait(3000);
    cy.contains(`OK`).click();
  });

  it('Bank 1 flow', () => {
    cy.contains(`Naboo Bank`).click();
    cy.contains(`Fill Dummy Data`).click();
    cy.contains(`Submit`).click();
    cy.wait(3000);
    cy.contains(`OK`).click();
  });
});
