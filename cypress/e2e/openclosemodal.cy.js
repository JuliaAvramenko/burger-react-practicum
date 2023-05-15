describe("modals open correctly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    setTimeout(() => {
      console.log("im ready")
    }, 5000);

  })


  it('should open ingredient in modal correctly', () => {

    cy.get("[class^=ingredient-card_card__]").first().as("ingredient");

    cy.get("@ingredient").click();
    cy.get("[class^=ingredient-details_modal__container__]").first().as("modal");
    cy.get("@modal").should("contain", "Детали ингредиента");

    cy.get("[class^=modal_modal__close-button__]").first().as("button")
    cy.get("@button").click();
    cy.get("[class^=modal_modal__]").should('not.exist');



  })


})