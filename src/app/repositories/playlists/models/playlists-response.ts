import { Playlist } from './playlist';

export type PlaylistsResponse = {
    featuredPlaylists: {
        name: string;
        content: Playlist[];
    };
};
