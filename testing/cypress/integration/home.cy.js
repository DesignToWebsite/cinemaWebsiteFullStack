
/// <reference types="cypress" />

describe('Home page', () => {
  beforeEach(()=>{
    cy.visit('/home')
  })

  it("The header section", ()=>{
    cy.url().should("contain", "/home")
    cy.contains("Your Movie Reservation Hub")
    cy.contains('Reserve now').click()
    cy.url().should("contain", "#movies")
  })

  
  it("Top Movies section should show only the movies that have the proprety top true", ()=>{
    //GET THE LIST OF THE MOVIE FROM THE API
    cy.intercept({
      method:'GET',
      url: '/api/movies?includeReservations=true'
    }).as('getMovies')

    //check the page ui
    cy.url().should("contain", "/home")
    cy.contains("Top movies")

    cy.wait("@getMovies").then((movies)=>{
        //check the response
        expect(movies.response.statusCode).to.eq(200)
        expect(movies.response.body.data).to.be.an('array')
        const moviesFromAPI = movies.response.body.data
        //check the proprety of the movie
        cy.moviesPropretyAPI(moviesFromAPI)
        //get only the top movies from the api response using filterMoviesAPI
        cy.filterMoviesAPI(moviesFromAPI, "top", true).as("topMoviesFromAPI")
        //select the UI movies card
        cy.getDataTest("topMovies")
          .find(".styledCard a h3")
          .then((moviesCard) => {
            //get the titles
            cy.selectTextFromUI(moviesCard).as("topMoviesFromUI")
            //Check if the UI match the Correct response
            cy.get("@topMoviesFromUI").then((topMoviesFromUI)=>{
              cy.get("@topMoviesFromAPI").then((topMoviesFromAPI)=>{
                cy.movieUImatchMovieAPI(topMoviesFromUI, topMoviesFromAPI)
              })
            })
          })
      })
  })

  it("Popular category section should show the correct movies for each category", ()=>{
    //GET THE LIST OF THE MOVIE FROM THE API
    cy.intercept({
      method:'GET',
      url: '/api/movies?includeReservations=true'
    }).as('getMovies')

    //check the page ui
    cy.url().should("contain", "/home")
    cy.contains("Top movies")
    cy.wait("@getMovies").then((movies)=>{
        //check the response
        expect(movies.response.statusCode).to.eq(200)
        expect(movies.response.body.data).to.be.an('array')
        const moviesFromAPI = movies.response.body.data
        //check the proprety of the movie
        cy.moviesPropretyAPI(moviesFromAPI)
        //get the categories menu from the UI
        cy
          .getDataTest("categories")
          .find("li")
          .then((categories)=>{
            cy.selectTextFromUI(categories).as("categories")
            cy.get("@categories").each((category)=>{
              cy.contains(category).click()
              cy.contains(category).should("have.class", "active")
              cy.filterMoviesAPI(moviesFromAPI,"category",category).as("moviesFromAPI")
              cy.getDataTest("categories_section").find(".styledCard h3").then((moviesCard)=>{
                //get the titles
                cy.selectTextFromUI(moviesCard).as("moviesFromUI")
                //Check if the UI match the Correct response
                cy.get("@moviesFromUI").then((moviesFromUI)=>{
                  cy.get("@moviesFromAPI").then((moviesFromAPI)=>{
                    cy.movieUImatchMovieAPI(moviesFromUI, moviesFromAPI)
                  })
                })
              })
            })
          })
      })
  })
})