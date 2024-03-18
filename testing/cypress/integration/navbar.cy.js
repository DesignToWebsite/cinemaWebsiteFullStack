
/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(()=>{
      cy.visit('/home')
    })
    it('Navbar for non logged user', () => {
      cy.getDataTest('logo').contains( 'CineBooking' )
      cy.getDataTest('navbar').find('li').should('have.length', 4)
      cy
        .getDataTest('navbar').find('li')
        .then( item =>{
          expect(item[0]).to.contain.text("Home")
          expect(item[1]).to.contain.text("Movies")
          expect(item[2]).to.contain.text("Login")
          expect(item[3]).to.contain.text("SignUp")
        })
    })
  
    it('Navbar for  logged user', () => {
      cy.login()
      cy.getDataTest('navbar').find('li').should('have.length', 4)
      cy
        .getDataTest('navbar').find('li')
        .then( item =>{
          expect(item[0]).to.contain.text("Home")
          expect(item[1]).to.contain.text("Movies")
          expect(item[2]).to.contain.text("Profile")
          expect(item[3]).to.contain.text("Logout")
        })
    })
  
    it('Navbar for  logged Admin', () => {
      cy.loginAdmin()
      cy.getDataTest('navbar').find('li').should('have.length', 5)
      cy
        .getDataTest('navbar').find('li')
        .then( item =>{
          expect(item[0]).to.contain.text("Home")
          expect(item[1]).to.contain.text("Movies")
          expect(item[2]).to.contain.text("Profile")
          expect(item[3]).to.contain.text("Admin")
          expect(item[4]).to.contain.text("Logout")
        })
    })
  
  })