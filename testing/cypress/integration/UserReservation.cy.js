/// <reference types="cypress" />

describe("User Reservations test", () => {
  beforeEach(() => {
    cy.login();
  });
  it.only("Ensure the user can watch the Youtube video and make a reservation", () => {
    cy.visit("/movies");
    //GET THE LIST OF THE MOVIE FROM THE API
    cy.intercept({
      method: "GET",
      url: "/api/movies?includeReservations=true&&page=1",
    }).as("getMovies");

    //select the first movie and check that the page display the correct informations
    cy.wait("@getMovies").then((movies) => {
      //check the response
      expect(movies.response.statusCode).to.eq(200);
      expect(movies.response.body.data).to.be.an("array");
      const moviesAPISelected = movies.response.body.data[0];
      cy.getDataTest("cardMovie").eq(0).click();

      cy.contains(moviesAPISelected.name);
      cy.url().should("contain", `/movie_page/${moviesAPISelected.id}`);
      cy.wrap(moviesAPISelected.id).as("movieId");
      cy.getDataTest("playBtn").contains("Play now").click();

      //see if the youtube videa has been loaded
      cy.getDataTest("loading").should("be.visible");
      cy.get("iframe").should("be.visible");
      cy.get("iframe").then(($iframe) => {
        const src = $iframe.attr("src");
        src.includes("autoplay=1");
        cy.log(src);
      });

      // Click outside of the video
      cy.get("body").click("bottomRight");

      //make a reservation
      cy.contains("Reserve your place").click();
      cy.contains("Continue Reservation").should(
        "have.attr",
        "href",
        `/reservation/${moviesAPISelected.id}`
      );
      cy.getDataTest("cardTime");
      cy.getDataTest("cardTime").should("have.class", "red text-white");
      cy.getDataTest("cardTime").click();
      cy.getDataTest("cardTime").should("have.class", "bg-dark text-white");
      cy.contains("Continue Reservation").click();
      cy.url().should("include", `/reservation/${moviesAPISelected.id}`);
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

      //check the page details and compare then to the api info
      //user info is displayed correctelly
      cy.window().then((win) => {
        const user = JSON.parse(win.localStorage.getItem("user"));

        cy.getDataTest("firstName").should("have.attr", "readonly");

        cy.getDataTest("firstName").should("have.value", user.firstName);

        cy.getDataTest("lastName").should("have.attr", "readonly");

        cy.getDataTest("lastName")
          // .invoke('val')
          .should("have.value", user.lastName);
      });

      //reservation for one person

      cy.getDataTest("nbSeat").clear().type(1);
      cy.getDataTest("food").select("candies");
      if(movieDetails.reservations.length > 0){
        const reservations = movieDetails.reservation
        reservations.map((reservation)=>{
          const seats = reservation.placesReserved.split(",")
          seats.map((seat)=>{
            cy
            .getDataTest("seats-container")
            .find(".seat")
            .eq(seat)
            .should("have.class", "occupied")
          })
        })
        cy
            .getDataTest("seats-container")
            .find(".seat")
            .should("have.not.class", "occupied")
            
      }else{
        cy
            .getDataTest("seats-container")
            .find(".seat")
            .eq(0)
            .click()

            cy
            .getDataTest("seats-container")
            .find(".seat")
            .eq(0)
            .should("have.class", "selected")
      }
      const price = 30 + movieDetails.price
      cy
        .getDataTest('totalPrice')
        .invoke('text')
        .should("eq", price.toString())

      cy.getDataTest('submitReservation').click()

      cy.wait(10000)
      
      const urlStripe = movieDetails.reservations.map()
      cy.visit(movieDetails.reservations)
      // cy.url({ timeout: 10000 }).should("contains", "buy.stripe.com")
// cy.wait(20000)
//       cy
//         .url()
//         cy.visit('https://buy.stripe.com/test_4gwdU5ahP9l4cYo9BH')
//         // .should("contains", "buy.stripe.com")
//       cy.intercept('GET', 'your-content-url', (req) => {
//         // Modify the response as needed
//         req.reply((res) => {
//           // Set response status code and body
//           res.status(200);
//           res.body = {
//             // Your response body data here
//           };
//         });
//       }).as('getContent');
//       cy.contains('Moyen de paiement')
    });

    // cy.wait(10000)
    // cy.visit()
  });
  it("entrer to strip", ()=>{
    cy.visit('https://buy.stripe.com/test_4gwdU5ahP9l4cYo9BH')

  })
});
