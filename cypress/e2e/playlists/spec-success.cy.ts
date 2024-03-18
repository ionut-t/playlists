describe('Playlists Page Success', () => {
    const PLAYLISTS_MOCK = [
        {
            id: '1',
            kind: 'playlist',
            name: 'New Music Daily',
            url: 'url-1',
            curator_name: 'Apple Music',
            artwork:
                'https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/23/72/b9/2372b9c7-4803-2956-c17c-eda0368d4cd1/025eba61-6185-4566-8aca-0b4651264247.png/600x600SC.DN01.jpg?l=en-US'
        },
        {
            id: '2',
            kind: 'playlist',
            name: 'Today’s Hits',
            url: 'url-2',
            curator_name: 'Apple Music Hits',
            artwork:
                'https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/9f/1d/88/9f1d88d5-8ac6-12ee-8bf8-f315be49be43/a26a55ef-6659-4610-a59d-fa9a7a4e7f01.png/600x600SC.DN01.jpg?l=en-US'
        },
        {
            id: '3',
            kind: 'playlist',
            name: 'Rap Life',
            url: 'url-3',
            curator_name: 'Apple Music Hip-Hop',
            artwork:
                'https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/9e/b6/62/9eb66296-da10-0d74-a400-be28e6ce0a4f/a59feab2-4cde-4ab5-a74a-f2d6b90c74ed.png/600x600SC.DN01.jpg?l=en-US'
        },
        {
            id: '4',
            kind: 'playlist',
            name: 'Up Next',
            url: 'url-4',
            curator_name: 'Apple Music Up Next',
            artwork:
                'https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/09/f3/2f/09f32f0c-634e-1a53-cfe4-9522b6275601/19e6bf4e-5a6e-4305-b9b3-0ce498dc6c94.png/600x600SC.DN01.jpg?l=en-US'
        }
    ];

    beforeEach(() => {
        cy.visit('/');

        cy.intercept('GET', '*', {
            featuredPlaylists: {
                name: 'Featured Playlists',
                content: PLAYLISTS_MOCK
            }
        }).as('getPlaylists');
    });

    it('loads the page and required elements are visible', () => {
        cy.wait('@getPlaylists').then(interception => {
            expect(interception.response?.statusCode).to.eq(200);

            expect(interception.response?.body).to.deep.equal({
                featuredPlaylists: {
                    name: 'Featured Playlists',
                    content: PLAYLISTS_MOCK
                }
            });
        });

        cy.get('.heading').should('be.visible');
        cy.get('input').should('be.visible');
        cy.get('.viewport').should('be.visible');
    });

    it('searches a playlist', () => {
        cy.wait('@getPlaylists');

        cy.get('input').type('News');
        cy.get('p').contains('No playlist found');
        cy.get('input').clear();
        cy.get('mat-option').contains('New Music Daily').click();
        cy.get('input').clear();
        cy.get('section').click();
    });
});
