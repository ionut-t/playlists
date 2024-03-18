describe('Playlists Page Error', () => {
    it('loads the page and display an error message', () => {
        cy.visit('/');
        cy.intercept(
            'GET',
            'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json',
            { statusCode: 500 }
        ).as('getPlaylists');

        cy.wait('@getPlaylists').its('response.statusCode').should('eq', 500);

        cy.get('app-error-message').should('be.visible');
    });
});
