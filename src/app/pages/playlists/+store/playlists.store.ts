import { Injectable } from '@angular/core';
import { getError } from '@common/utils';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Playlist, PlaylistsService } from '@repositories/playlists';
import { map, switchMap } from 'rxjs';
import { initialState, PlaylistsState } from './state';
import {
    filterNames,
    filterPlaylists,
    getPlaylistNames,
    sortPlaylists
} from './utils';

@Injectable()
export class PlaylistsStore extends ComponentStore<PlaylistsState> {
    // SELECTORS
    readonly loading = this.selectSignal(({ loading }) => loading);
    readonly error = this.selectSignal(({ error }) => error);

    private readonly _playlists = this.selectSignal(
        ({ playlists }) => playlists
    );
    private readonly _searchTerm = this.selectSignal(
        ({ searchTerm }) => searchTerm
    );

    private readonly _playlistNames = this.selectSignal(
        this._playlists,
        getPlaylistNames
    );

    readonly playlistNames = this.selectSignal(
        this._playlistNames,
        this._searchTerm,
        filterNames
    );

    readonly playlists = this.selectSignal(
        this._playlists,
        this._searchTerm,
        filterPlaylists
    );

    // UPDATERS
    readonly setSearchTerm = this.updater<string>((state, searchTerm) => ({
        ...state,
        searchTerm
    }));

    private readonly _setPlaylists = this.updater<Playlist[]>(
        (state, playlists) => ({
            ...state,
            playlists,
            loading: false
        })
    );

    private readonly _setError = this.updater<string>((state, error) => ({
        ...state,
        error,
        loading: false
    }));

    // EFFECTS
    readonly loadPlaylists = this.effect<void>($ =>
        $.pipe(
            switchMap(() =>
                this._playlistsService.getPlaylists().pipe(
                    map(sortPlaylists),
                    tapResponse(
                        playlists => this._setPlaylists(playlists),
                        error => this._setError(getError(error))
                    )
                )
            )
        )
    );

    constructor(private readonly _playlistsService: PlaylistsService) {
        super(initialState);
    }
}
