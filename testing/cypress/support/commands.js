/// <reference types="cypress" />


Cypress.Commands.add('getDataTest', (dataTestSelector) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})

Cypress.Commands.add('login', (login) =>{
    cy.visit('/login')
    cy.getDataTest("login").should('text', "Login").click()
    cy.url().should("include", "/login")
    cy.getDataTest("email").type("test@gmail.com")
    cy.getDataTest("password").type("test")
    cy.getDataTest("loginBtn").click();
    cy.getDataTest("loading").should('be.visible')
    cy.url().should("include","/home")
})

Cypress.Commands.add('loginAdmin', () =>{
    cy.getDataTest("login").should('text', "Login").click()
    cy.url().should("include", "/login")
    cy.getDataTest("email").type("admin.nimda@gmail.com")
    cy.getDataTest("password").type("admin")
    cy.getDataTest("loginBtn").click();
    cy.getDataTest("loading").should('be.visible')
    cy.url().should("include","/home")
})

Cypress.Commands.add("movieUImatchMovieAPI", (moviesFromUI, moviesFromAPI)=>{
    moviesFromUI.forEach((movieUI) =>{
              
        const found = moviesFromAPI.some((movieAPI)=> {
          return movieUI == movieAPI.name
        })
        expect(found).to.be.true
      })
})

Cypress.Commands.add("selectTextFromUI",(moviesCard)=>{
    const topMoviesFromUI = moviesCard.map((index,element)=>{
        return Cypress.$(element).text()
      }).toArray()
      return topMoviesFromUI;
})

Cypress.Commands.add("moviesPropretyAPI", (moviesFromAPI)=>{
    moviesFromAPI.forEach((movie)=>{
        expect(movie).to.have.property('actors')
        expect(movie).to.have.property('age')
        expect(movie).to.have.property('category')
        expect(movie).to.have.property('day')
        expect(movie).to.have.property('description')
        expect(movie).to.have.property('id')
        expect(movie).to.have.property('img')
        expect(movie).to.have.property('name')
        expect(movie).to.have.property('placesRoom')
        expect(movie).to.have.property('price')
        expect(movie).to.have.property('reservations')
        expect(movie).to.have.property('salle')
        expect(movie).to.have.property('star')
        expect(movie).to.have.property('time')
        expect(movie).to.have.property('top')
        expect(movie).to.have.property('video')
        expect(movie).to.have.property('year')
      })
})

Cypress.Commands.add("filterMoviesAPI", (movies, filter, value)=>{
    console.log(typeof value)
    if(typeof value === "boolean"){
        const topMoviesFromAPI = movies.filter(movie=>{
            return movie[filter] == value
        })
        return topMoviesFromAPI

    }else{
        const topMoviesFromAPI = movies.filter(movie=>{
            return movie[filter].includes(value) 
        })
        return topMoviesFromAPI

    }
    
})