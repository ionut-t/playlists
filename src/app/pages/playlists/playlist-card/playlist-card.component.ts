import { NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input
} from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Playlist } from '@repositories/playlists';

@Component({
    selector: 'app-playlist-card',
    standalone: true,
    imports: [NgOptimizedImage, MatAnchor, MatIcon],
    templateUrl: './playlist-card.component.html',
    styleUrl: './playlist-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistCardComponent {
    @HostBinding('class.mat-elevation-z8')
    @Input({ required: true })
    playlist!: Playlist;
}
