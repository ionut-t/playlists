import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PLAYLISTS_MOCK } from '../mock';
import { PlaylistsResponse } from '../models';
import Endpoints from './endpoints';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsService', () => {
    let service: PlaylistsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(PlaylistsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpTestingController.verify());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getPlaylists', () => {
        it('should return a list of playlists', () => {
            service.getPlaylists().subscribe({
                next: response => expect(response).toEqual(PLAYLISTS_MOCK),
                error: fail
            });

            const req = httpTestingController.expectOne(Endpoints.playlists);
            expect(req.request.method).toEqual('GET');

            const response: PlaylistsResponse = {
                featuredPlaylists: {
                    name: 'Featured Playlists',
                    content: PLAYLISTS_MOCK
                }
            };

            req.flush(response);
        });

        it('should be OK returning no response', () => {
            service.getPlaylists().subscribe({
                next: response => expect(response).toEqual([]),
                error: fail
            });

            const req = httpTestingController.expectOne(Endpoints.playlists);
            expect(req.request.method).toEqual('GET');

            req.flush(null);
        });

        it('should turn 404 error into an empty list', () => {
            service.getPlaylists().subscribe({
                next: response => expect(response).toEqual([]),
                error: fail
            });

            const req = httpTestingController.expectOne(Endpoints.playlists);
            req.flush('404 Error', { status: 404, statusText: 'Not Found' });
        });
    });
});
