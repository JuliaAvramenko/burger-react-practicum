describe("drag ingredients to constructor works correctly", () => {
    before(() => {
        cy.intercept("GET", "api/ingredients",)
        cy.viewport(1300, 800)
        cy.visit("http://localhost:3000");
        setTimeout(() => {
            console.log("im ready")
        }, 10000);

    })


    it('should drag ingredient', () => {

        cy.get("[class^=ingredient-card_card__]").first().as("ingredient");

        cy.get("@ingredient").trigger("dragstart");
        cy.get("[class^=burger-constructor_big-table_extra__]").first().as("extra-table")


        cy.get("@extra-table").trigger("drop")
        cy.get("[class^=constructor-table]").first().as("constructor");
        cy.get("[class^=burger-constructor-element_constructor-container__]").first().as("element")
        cy.get("@constructor").contains("Краторная булка N-200i").should("exist")


    })


})