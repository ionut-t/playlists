import { Playlist } from '../models';

export const PLAYLISTS_MOCK: Playlist[] = [
    {
        id: '1',
        kind: 'playlist',
        name: 'New Music Daily',
        url: 'url-1',
        curator_name: 'Apple Music',
        artwork: 'artwork-1'
    },
    {
        id: '2',
        kind: 'playlist',
        name: 'Today’s Hits',
        url: 'url-2',
        curator_name: 'Apple Music Hits',
        artwork: 'artwork-2'
    },
    {
        id: '3',
        kind: 'playlist',
        name: 'Rap Life',
        url: 'url-3',
        curator_name: 'Apple Music Hip-Hop',
        artwork: 'artwork-3'
    },
    {
        id: '4',
        kind: 'playlist',
        name: 'Up Next',
        url: 'url-4',
        curator_name: 'Apple Music Up Next',
        artwork: 'artwork-4'
    }
];
