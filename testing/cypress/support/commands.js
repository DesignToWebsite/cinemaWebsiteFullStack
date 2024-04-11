/// <reference types="cypress" />

Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add("login", (login) => {
  cy.visit("http://localhost:5173/login");
  cy.getDataTest("login").should("text", "Login").click();
  cy.url().should("include", "/login");
  cy.getDataTest("email").type("test@gmail.com");
  cy.getDataTest("password").type("test");
  cy.getDataTest("loginBtn").click();
  cy.getDataTest("loading").should("be.visible");
  cy.url().should("include", "/home");
});

Cypress.Commands.add("loginWithParams", (email, password) => {
  cy.visit("http://localhost:5173/login");
  cy.getDataTest("login").should("text", "Login").click();
  cy.url().should("include", "/login");
  cy.getDataTest("email").type(email);
  cy.getDataTest("password").type(password);
  cy.getDataTest("loginBtn").click();
  cy.getDataTest("loading").should("be.visible");
  cy.url().should("include", "/home");
});

Cypress.Commands.add("loginAdmin", () => {
  cy.getDataTest("login").should("text", "Login").click();
  cy.url().should("include", "/login");
  cy.getDataTest("email").type("admin.nimda@gmail.com");
  cy.getDataTest("password").type("admin");
  cy.getDataTest("loginBtn").click();
  cy.getDataTest("loading").should("be.visible");
  cy.url().should("include", "/home");
});

Cypress.Commands.add("movieUImatchMovieAPI", (moviesFromUI, moviesFromAPI) => {
  moviesFromUI.forEach((movieUI) => {
    const found = moviesFromAPI.some((movieAPI) => {
      return movieUI == movieAPI.name;
    });
    expect(found).to.be.true;
  });
});

Cypress.Commands.add("selectTextFromUI", (moviesCard) => {
  const topMoviesFromUI = moviesCard
    .map((index, element) => {
      return Cypress.$(element).text();
    })
    .toArray();
  return topMoviesFromUI;
});

Cypress.Commands.add("moviesPropretyAPI", (moviesFromAPI) => {
  moviesFromAPI.forEach((movie) => {
    expect(movie).to.have.property("actors");
    expect(movie).to.have.property("age");
    expect(movie).to.have.property("category");
    expect(movie).to.have.property("day");
    expect(movie).to.have.property("description");
    expect(movie).to.have.property("id");
    expect(movie).to.have.property("img");
    expect(movie).to.have.property("name");
    expect(movie).to.have.property("placesRoom");
    expect(movie).to.have.property("price");
    expect(movie).to.have.property("reservations");
    expect(movie).to.have.property("salle");
    expect(movie).to.have.property("star");
    expect(movie).to.have.property("time");
    expect(movie).to.have.property("top");
    expect(movie).to.have.property("video");
    expect(movie).to.have.property("year");
  });
});

Cypress.Commands.add("filterMoviesAPI", (movies, filter, value) => {
  console.log(typeof value);
  if (typeof value === "boolean") {
    const topMoviesFromAPI = movies.filter((movie) => {
      return movie[filter] == value;
    });
    return topMoviesFromAPI;
  } else {
    const topMoviesFromAPI = movies.filter((movie) => {
      return movie[filter].includes(value);
    });
    return topMoviesFromAPI;
  }
});

Cypress.Commands.add("movieDescriptionPageDisplayed", (movie) => {
  cy.contains(movie.name);
  cy.url().should("contain", `/movie_page/${movie.id}`);
  cy.wrap(movie.id).as("movieId");
});

Cypress.Commands.add("movieYoutubeVideoLoaded", () => {
  cy.getDataTest("playBtn").contains("Play now").click();
  cy.getDataTest("loading").should("be.visible");
  cy.get("iframe").should("be.visible");
  cy.get("iframe").then(($iframe) => {
    const src = $iframe.attr("src");
    src.includes("autoplay=1");
    cy.log(src);
  });
  cy.get("body").click("bottomRight");
});

Cypress.Commands.add("reserveMovieBtn", (movie) => {
  cy.contains("Reserve your place").click();
  cy.contains("Continue Reservation").should(
    "have.attr",
    "href",
    `/reservation/${movie.id}`
  );
  cy.getDataTest("cardTime");
  cy.getDataTest("cardTime").should("have.class", "red text-white");
  cy.getDataTest("cardTime").click();
  cy.getDataTest("cardTime").should("have.class", "bg-dark text-white");
  cy.contains("Continue Reservation").click();
  cy.url().should("include", `/reservation/${movie.id}`);
});

Cypress.Commands.add("checkFormReservationDefault", () => {
  cy.window().then((win) => {
    const user = JSON.parse(win.localStorage.getItem("user"));

    cy.getDataTest("firstName").should("have.attr", "readonly");

    cy.getDataTest("firstName").should("have.value", user.firstName);

    cy.getDataTest("lastName").should("have.attr", "readonly");

    cy.getDataTest("lastName").should("have.value", user.lastName);
  });
});

Cypress.Commands.add("reservationForOnePerson", (movieDetails) => {
  cy.getDataTest("nbSeat").clear().type(1);
  cy.getDataTest("food").select("candies");
  // cy.getDataTest("seats-container").find(".seat").eq(0).click();
  cy.getDataTest("seats-container")
    .find(".seat")
    .filter((index, seat) => !Cypress.$(seat).hasClass("occupied"))
    .eq(0)
    .click();

  //   }
  const price = 30 + movieDetails.price;
  cy.getDataTest("totalPrice").invoke("text").should("eq", price.toString());

  cy.getDataTest("submitReservation").click();
});

Cypress.Commands.add("reservationFirstPlaceForOnePerson", () => {
  cy.getDataTest("nbSeat").clear().type(1);
  cy.getDataTest("seats-container").find(".seat").eq(0).click();
  cy.getDataTest("submitReservation").click();
});

let StripeLinkUrl ;

Cypress.Commands.add("setStripeLinkUrl", (value) => {
  StripeLinkUrl = value;
});

Cypress.Commands.add("getStripeLinkUrl", () => {
  console.log(StripeLinkUrl);
  // cy.visit(StripeLinkUrl)
  return StripeLinkUrl;
});

Cypress.Commands.add("stripePayment", () => {
  console.log(StripeLinkUrl);
  
  cy.visit("/profile")
  cy.contains("Pay Now")
  
  cy.contains("Pay Now").invoke("text").then((text) => {
    let linkText = text;
    // Now the linkText variable contains the text value of the link
    // You can use it further in your test
    cy.log("Link Text:", linkText); // Log the extracted link text
    cy.visit(linkText);

  });
  // cy.get(".PaymentHeader").click();
  cy.get("#email").type("test@gmail.com");
  cy.get("#cardNumber").type("4242 4242 4242 4242");
  cy.get("#cardExpiry").type("10 / 27");
  cy.get("#cardCvc").type("123");
  cy.get("#billingName").type("test");
  cy.get(".SubmitButton-IconContainer").click();
});

Cypress.Commands.add("addMovieForm", (movieInfo) => {
  cy.get("#name").type("Aquaman");
  cy.get("#img").type(
    "https://static.toiimg.com/thumb/msid-90355881,width-219,height-317,imgsize-190174/90355881.jpg"
  );
  cy.get("#description").type(
    "Jason Momoa as Arthur Curry / Aquaman: A half-Atlantean, half-human who is reluctant to be king of the undersea nation of Atlantis. He is a member of the Justice League. He possesses superhuman strength, durability, has hydrokinetic powers, can communicate with sea creatures, and can swim at supersonic speeds"
  );
  cy.get("#year").type("2018");
  cy.get("#video").type("jj3LK15liKA");
  cy.get("#actors").type(
    "Jason Momoa, Amber Heard, Willem Dafoe, Patrick Wilson, Nicole Kidman, Dolph Lundgren"
  );
  cy.get("#category").type("Action, Adventure, Fantasy");
  cy.get("#star").type("100");
  cy.get("#day").type("Monday");
  cy.get("#time").type("14:00");
  cy.get("#salle").type("s1");
  cy.get("#price").type("70");
  cy.get("#placesRoom").type("60");
  cy.get("#age").type("18+");
  cy.get("#top").select("true");
  cy.getDataTest("submitBtn").click();
});

Cypress.Commands.add("searchMovie", (movieName) => {
  cy.intercept({
    method: "GET",
    url: `/api/movies?includeReservations=true&&name[contains]=${movieName}`,
  }).as("searchMovieAPI");

  cy.getDataTest("searchInput").type("Aquaman");
  cy.contains("Search").click();
  cy.wait("@searchMovieAPI").then(()=>{
    return true
  });
});

// Cypress.Commands.add("DeleteMovie",()=>{

// })