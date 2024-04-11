/// <reference types="cypress" />

describe("User Reservations test", () => {
    beforeEach(() => {
      cy.log();
    });
    it("The process from login to reservation", () => {
    //   cy.login();
      cy.visit("/movies");
      cy.intercept({
        method: "GET",
        url: "/api/movies?includeReservations=true&&page=1",
      }).as("getMovies");
  
      cy.wait("@getMovies").then((movies) => {
        expect(movies.response.statusCode).to.eq(200);
        expect(movies.response.body.data).to.be.an("array");
  
        //click to the first movie in the list
        const moviesAPISelected = movies.response.body.data[0];
        cy.getDataTest("cardMovie").eq(0).click();
  
        //check that the movie page descrition is correct
        cy.movieDescriptionPageDisplayed(moviesAPISelected);
  
        cy.movieYoutubeVideoLoaded();
  
        cy.reserveMovieBtn(moviesAPISelected);
      });
  
      //wait for the movie to get uploaded in the reservation page
      cy.get("@movieId").then((id) => {
        cy.intercept({
          method: "GET",
          url: `/api/movies/${id}?includeReservations=true`,
        }).as("movieReservation");
      });
  
      cy.wait("@movieReservation").then((movieResevation) => {
        expect(movieResevation.response.statusCode).to.eq(200);
        expect(movieResevation.response.body.data).to.be.an("object");
        const movieDetails = movieResevation.response.body.data;
  
        cy.intercept("POST", "/api/reservations").as("submitReservation");
  
        cy.checkFormReservationDefault();
        cy.reservationForOnePerson(movieDetails);
  
        cy.wait("@submitReservation").then((submitReservation)=>{
          expect(submitReservation.response.statusCode).to.eq(201);
          expect(submitReservation.response.body.data).to.be.an("object");
          const reservationDetails = submitReservation.response.body.data;
          // cy.visit("/")
          // console.log(reservationDetails)
          cy.setStripeLinkUrl(reservationDetails.stripeLink);
         
          // cy.visit(reservationDetails.stripeLink)
          
        })
  
      });
  
      cy.visit("/profile")
      cy.contains("Pay Now")
    //   cy.getStripeLinkUrl()
  
  
      // "http://127.0.0.1:8000/api/reservations"
    });
    it("Pay the reservation", () => {
     cy.intercept({
        method: "GET",
        url: '/api/users/3?includeReservations=true'
     }).as('getReservations')
     cy.visit("/profile")
     cy.wait('@getReservations').then((reservation)=>{
        const url = reservation.response.body.data.reservations[0].stripeLink
        const modifiedUrl = url.replace("https://", "")
        console.log(modifiedUrl)
        cy.visit(`https://${modifiedUrl}`)
        cy.get("#email").type("test@gmail.com");
        cy.get("#cardNumber").type("4242 4242 4242 4242");
        cy.get("#cardExpiry").type("10 / 27");
        cy.get("#cardCvc").type("123");
        cy.get("#billingName").type("test");
        cy.wait(1000)
        cy.contains("Payer").click()
        cy.wait(15000)
        // cy.url().should("include", "/profile");
        // cy.get(".SubmitButton-IconContainer").click();
     })
     
  
    });
    it("show invoices",()=>{
    //   cy.login();
      cy.visit('/profile')
      cy.contains('View Invoice').click()
  
    })
    it("Delete the reservation", ()=>{
    //   cy.login();
      cy.visit('/profile')
     cy.getDataTest("deleteReservation").click()
    })
  });
  