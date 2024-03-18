import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Playlist, PlaylistsResponse } from '../models';
import Endpoints from './endpoints';

@Injectable({
    providedIn: 'root'
})
export class PlaylistsService {
    constructor(private readonly _http: HttpClient) {}

    getPlaylists(): Observable<Playlist[]> {
        return this._http.get<PlaylistsResponse>(Endpoints.playlists).pipe(
            catchError(error => {
                if (error.status === 404) return of(null);

                return throwError(() => error);
            }),
            map(response => response?.featuredPlaylists.content ?? [])
        );
    }
}
