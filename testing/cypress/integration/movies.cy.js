
/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(()=>{
      cy.visit('/movies')
    })
  
    it("Top Movies section should show only the movies that have the proprety top true", ()=>{
      //GET THE LIST OF THE MOVIE FROM THE API
      cy.intercept({
        method:'GET',
        url: '/api/movies?includeReservations=true&&page=1'
      }).as('getMovies')
  
      //check the page ui
      cy.url().should("contain", "/movies")
      cy.contains("Search")
  
      cy.wait("@getMovies").then((movies)=>{
          //check the response
          expect(movies.response.statusCode).to.eq(200)
          expect(movies.response.body.data).to.be.an('array')
            console.log(movies.response.body.links)
            
        })
    })
  
    
  })