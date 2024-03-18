import { Playlist } from '@repositories/playlists';

export const sortPlaylists = (playlists: Playlist[]) =>
    structuredClone(playlists).sort((a, b) => a.name.localeCompare(b.name));

export const getPlaylistNames = (playlists: Playlist[]) =>
    playlists.map(playlist => playlist.name);

export const filterPlaylists = (playlists: Playlist[], search: string) =>
    playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(search.toLowerCase())
    );

export const filterNames = (names: string[], search: string) =>
    names.filter(name => name.toLowerCase().includes(search.toLowerCase()));
