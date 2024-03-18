/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom Cypress command to compare movie titles displayed in the UI with the movie titles from the API response
         * and verify if they match.
         * 
         * This command iterates over the movie titles extracted from the UI and checks if each title exists
         * in the movie titles obtained from the API response.
         * 
         * @param {Array} moviesFromUI - An array containing movie titles extracted from the UI
         * @param {Array} moviesFromAPI - An array containing movie titles obtained from the API response
         * 
         * @example
         * cy.movieUImatchMovieAPI(topMoviesFromUI, topMoviesFromAPI)
         */
        movieUImatchMovieAPI(moviesFromUI: Array, moviesFromAPI: Array)


        /**
         * Custom Cypress command to select the text content  from the UI.
         * 
         * This command extracts the text content  from the UI and returns them as an array.
         * 
         * @param {JQuery<HTMLElement>} moviesCard - jQuery object representing movie elements from the UI
         * @returns {Array<string>} An array containing the text content 
         * 
         * @example
         * cy.selectTextFromUI(moviesCard)
         */
        selectTextFromUI(moviesCard: JQuery<HTMLElement>): string[]

            /**
         * Custom Cypress command to validate movie properties obtained from the API response.
         * 
         * This command checks if each movie object from the API response contains the expected properties.
         * 
         * @param {Array<object>} moviesFromAPI - An array containing movie objects obtained from the API response
         * 
         * @example
         * cy.moviesPropretyAPI(moviesFromAPI)
         */
        moviesPropretyAPI(moviesFromAPI: object[]): Chainable

            /**
             * Custom Cypress command to filter an array of movies based on a specified property and value.
             * 
             * This command filters the given array of movies based on the provided property and value,
             * returning a new array containing only the movies that match the specified criteria.
             * 
             * @param {Array<object>} movies - An array of movie objects to be filtered
             * @param {string} filter - The name of the property to filter by
             * @param {any} value - The value to filter the property by
             * @returns {Array<object>} An array containing the filtered movies
             * 
             * @example
             * cy.filterMoviesAPI(moviesFromAPI, "top", true)
             */
            filterMoviesAPI(movies: Array, filter: string, value : any) : Array

            /**
             * Custom Cypress command to select DOM elements by their data-test attribute.
             * 
             * This command retrieves DOM elements based on the value of their data-test attribute,
             * allowing for easier selection and interaction with elements specifically designated for testing.
             * 
             * @param {string} dataTestSelector - The value of the data-test attribute to select elements by
             * @returns {Chainable<JQuery<HTMLElement>>} A Cypress chainable object containing the selected DOM elements
             * 
             * @example
             * cy.getDataTest("loginButton").click();
             */
            getDataTest(dataTestSelector : string)
    
    }
}