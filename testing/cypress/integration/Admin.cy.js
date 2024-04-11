/// <reference types="cypress" />

describe("User Reservations test", () => {
    beforeEach(() => {
      cy.loginWithParams("admin.nimda@gmail.com", "admin");
      cy.visit('/admin');

    });
    
    
    it("Add a Movie", ()=>{
      cy.intercept({
        method:'POST',
        url: '/api/movies'
      }).as("addMovie")

      cy.getDataTest("addMovieBtn").click();
      cy.addMovieForm();
      
      cy.wait("@addMovie").then((addMovie)=>{
        expect(addMovie.response.statusCode).to.eq(201);
        expect(addMovie.response.body.data).to.be.an("object");
      })
    })

    it("Edit a movie", ()=>{
      cy.intercept({
        method: "GET",
        url: "/api/movies?includeReservations=true&&page=1"
      }).as("getMovies")

      // cy.intercept({
      //   method: "GET",
      //   url: "/api/movies?includeReservations=true&&name[contains]=Aquaman"
      // }).as("searchMovieAPI")

      cy.intercept({
        method : "PATCH",
        url: "/api/movies/**"
      }).as("updateMovie")
      
      cy.wait("@getMovies")

      cy.searchMovie('Aquaman')

      //Edit the movie
      // cy.wait("@searchMovieAPI").then((movie)=>{
        cy.getDataTest("tableMovies").contains("Aquaman")
        cy.contains("Edit").click()
        cy.get('#day').clear();
        cy.get('#time').clear();
        cy.get('#day').type('Friday');
        cy.get('#time').type('21:30');
        cy.contains("Save Changes").click()
      // })

      //check if the changes has been added
      cy.wait("@updateMovie").then((movie)=>{
        console.log(movie)
        const movieDetails = movie.response.body.data;
        expect(movieDetails.time).to.equal('21:30')
        expect(movieDetails.day).to.equal('Friday')
        cy.searchMovie('Aquaman')
        cy.contains('Friday 21:30')
      })

      
    })
    it("Delete a movie",()=>{
      cy.intercept({
        method: 'DELETE',
        url: '/api/movies/**'
      }).as("deleteMovie")
      cy.searchMovie("Aquaman")
      cy.contains('Delete').click()
      cy.wait('@deleteMovie').then(()=>{
        cy.searchMovie("Aquaman")
        cy.contains('Aquaman').should('not.exist')
      })
    })
  });
  