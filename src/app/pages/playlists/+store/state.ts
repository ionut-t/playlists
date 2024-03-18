import { Playlist } from '@repositories/playlists';

export type PlaylistsState = {
    loading: boolean;
    error: string | null;
    playlists: Playlist[];
    searchTerm: string;
};

export const initialState: PlaylistsState = {
    loading: true,
    error: null,
    playlists: [],
    searchTerm: ''
};
