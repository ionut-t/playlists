import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessageComponent, SpinnerComponent } from '@common/components';
import { Playlist } from '@repositories/playlists';
import { PlaylistsStore } from './+store';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';

@Component({
    selector: 'app-playlists',
    standalone: true,
    imports: [
        SpinnerComponent,
        ErrorMessageComponent,
        ScrollingModule,
        PlaylistCardComponent,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NgTemplateOutlet
    ],
    templateUrl: './playlists.component.html',
    styleUrl: './playlists.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PlaylistsStore]
})
export class PlaylistsComponent implements OnInit {
    readonly loading = this._store.loading;
    readonly error = this._store.error;
    readonly playlists = this._store.playlists;
    readonly playlistNames = this._store.playlistNames;

    readonly searchControl = new FormControl('', { nonNullable: true });

    readonly trackPlaylistById = (_idx: number, playlist: Playlist) =>
        playlist.id;

    constructor(private readonly _store: PlaylistsStore) {}

    ngOnInit() {
        this._store.loadPlaylists();

        this._store.setSearchTerm(this.searchControl.valueChanges);
    }
}
