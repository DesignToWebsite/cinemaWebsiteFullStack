


describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
    it('The home page is displayed correctly for non logged user', () => {
      cy.getDataTest('logo').contains('CineBooking')
      cy.getDataTest('navbar').find('li').should('have.length', 4)
      cy.getDataTest('navbar').find('li')
    })
  })