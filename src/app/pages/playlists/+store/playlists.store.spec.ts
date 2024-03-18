import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpErrorDictionary } from '@common/utils';
import { PlaylistsService } from '@repositories/playlists';
import { PLAYLISTS_MOCK } from '@repositories/playlists/mock';
import { of, throwError } from 'rxjs';
import { PlaylistsStore } from './playlists.store';
import { sortPlaylists } from './utils';

describe('PlaylistsStore', () => {
    let store: PlaylistsStore;
    let playlistsService: jasmine.SpyObj<PlaylistsService>;

    beforeEach(() => {
        playlistsService = jasmine.createSpyObj('playlistsService', [
            'getPlaylists'
        ]);

        playlistsService.getPlaylists.and.returnValue(of(PLAYLISTS_MOCK));

        TestBed.configureTestingModule({
            providers: [
                PlaylistsStore,
                { provide: PlaylistsService, useValue: playlistsService }
            ]
        });

        store = TestBed.inject(PlaylistsStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.loading()).toBeTrue();
        expect(store.error()).toBeNull();
        expect(store.state().playlists).toEqual([]);
    });

    describe('#loadPlaylists', () => {
        it('should load playlists', () => {
            store.loadPlaylists();
            expect(playlistsService.getPlaylists).toHaveBeenCalledTimes(1);
            expect(store.state().playlists).toEqual(
                sortPlaylists(PLAYLISTS_MOCK)
            );
            expect(store.loading()).toBeFalse();
        });

        it('should handle errors', () => {
            playlistsService.getPlaylists.and.returnValue(
                throwError(() => new HttpErrorResponse({ status: 500 }))
            );

            store.loadPlaylists();
            expect(store.loading()).toBeFalse();
            expect(store.error()).toBe(HttpErrorDictionary[500]);
        });
    });

    it('should search a playlist', () => {
        store.loadPlaylists();
        store.setSearchTerm('New');
        expect(store.playlists()).toHaveSize(1);
        expect(store.playlists()[0].name).toBe('New Music Daily');
        expect(store.playlistNames()[0]).toBe('New Music Daily');
    });
});
