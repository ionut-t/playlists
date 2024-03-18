import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/playlists/playlists.component').then(
                c => c.PlaylistsComponent
            )
    }
];
