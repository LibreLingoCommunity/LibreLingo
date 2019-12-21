describe("Cards ", () => {
    const CARDS_TEST_URL = "course/spanish-from-english/skill/_cards_test"
    describe("Open skill page", () => {
        beforeEach(() => {
            cy.visit(CARDS_TEST_URL)
        })

        it("Has correct question", () => {
            cy.contains(/Which of these is/).should("be.visible")
        })

        it("Has 3 cards", () => {
            cy.get(".options")
                .find(".card")
                .should("have.length", 3)
        })

        it("All cards inactive", () => {
            cy.get(".options")
                .find(".card[data-test=neutral]")
                .should("have.length", 3)
        })

        it("Has no panel visible", () => {
            cy.get(".panel").should("not.exist")
        })

        it("Submit button is not visible", () => {
            cy.contains("Submit").should("not.exist")
        })
    })

    describe("Clicking card", () => {
        beforeEach(() => {
            cy.visit(CARDS_TEST_URL)
            cy.get(".card")
                .first()
                .click()
        })

        it("Panel is visible", () => {
            cy.get(".panel").should("be.visible")
        })

        it("Submit button is visible", () => {
            cy.contains("Submit").should("exist")
        })

        it("2 cards inactive", () => {
            cy.get(".options")
                .find(".card[data-test=inactive]")
                .should("have.length", 2)
        })

        it("1 card inactive", () => {
            cy.get(".options")
                .find(".card[data-test=active]")
                .should("have.length", 1)
        })
    })

    describe("Submitting a correct answer", () => {
        beforeEach(() => {
            cy.visit(CARDS_TEST_URL)
            cy.get(".card[data-test-correct=true]").click()
            cy.contains("Submit").click()
        })

        it("Panel says correct answer", () => {
            cy.contains(/Correct solution/).should("be.visible")
        })

        it("Continue button is visible", () => {
            cy.contains("Continue").should("exist")
        })
    })

    describe("Submitting a incorrect answer", () => {
        beforeEach(() => {
            cy.visit(CARDS_TEST_URL)
            cy.get(".card[data-test-correct=false]")
                .first()
                .click()
            cy.contains("Submit").click()
        })

        it("Panel says incorrect answer", () => {
            cy.contains(/Incorrect solution/).should("be.visible")
        })

        it("Continue button is visible", () => {
            cy.contains("Continue").should("exist")
        })
    })
})
