
/// <reference types="cypress" />

describe('Movies page', () => {
    beforeEach(()=>{
      cy.visit('/movies')
    })
  
    it("Show the list of all the movies", ()=>{
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

    it.only("Search input", ()=>{
      cy.fixture("moviesSearch").then(searchMovies =>{
        searchMovies.map((search)=>{
          const encodedItem = encodeURIComponent(search.searchItem);
          cy.intercept({
            method:'GET',
            url: `/api/movies?includeReservations=true&&${search.filter}[contains]=${encodedItem}`
          }).as('getMovies')
          cy.getDataTest("searchInput").clear()
          cy.getDataTest("searchFilter").select(search.select)
          cy.getDataTest("searchInput").type(search.searchItem)
          cy.getDataTest("searchBtn").click()
          cy.wait("@getMovies").then((movies)=>{
            expect(movies.response.body.data).to.be.an('array')
            const movieSelected = movies.response.body.data
            movieSelected.map((movie)=>{
              cy.contains(movie.name)
            })
            if(movieSelected.length == 0){
              cy.contains('No movie exist')
            }
            // console.log(movies.data)
          })
        })
      })
    })
  
    
  })