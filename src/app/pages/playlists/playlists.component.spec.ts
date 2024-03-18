import { signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorMessageComponent, SpinnerComponent } from '@common/components';
import {
    findAllByDirective,
    findByDirective,
    initializeVirtualScroll
} from '@common/testing';
import { PLAYLISTS_MOCK } from '@repositories/playlists/mock';
import { PlaylistsStore } from './+store';
import { getPlaylistNames } from './+store/utils';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { PlaylistsComponent } from './playlists.component';

describe('PlaylistsComponent', () => {
    let component: PlaylistsComponent;
    let fixture: ComponentFixture<PlaylistsComponent>;
    let store: jasmine.SpyObj<PlaylistsStore>;

    const mountComponent = async ({
        loading,
        error
    }: {
        loading?: boolean;
        error?: string;
    } = {}) => {
        store = jasmine.createSpyObj(
            'PlaylistsStore',
            ['loadPlaylists', 'setSearchTerm'],
            {
                loading: signal(loading),
                error: signal(error),
                playlistNames: signal(getPlaylistNames(PLAYLISTS_MOCK)),
                playlists: signal(PLAYLISTS_MOCK)
            }
        );

        await TestBed.configureTestingModule({
            imports: [PlaylistsComponent, NoopAnimationsModule]
        }).compileComponents();

        TestBed.overrideProvider(PlaylistsStore, { useValue: store });

        fixture = TestBed.createComponent(PlaylistsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    };

    it('should create', async () => {
        await mountComponent();
        expect(component).toBeTruthy();
    });

    it('should load playlists on init', async () => {
        await mountComponent();
        expect(store.loadPlaylists).toHaveBeenCalled();
    });

    it('should track the search changes', async () => {
        await mountComponent();
        expect(store.setSearchTerm).toHaveBeenCalled();
    });

    it('should show a loading spinner', async () => {
        await mountComponent({ loading: true });
        expect(findByDirective(fixture, SpinnerComponent)).toBeTruthy();
    });

    it('should show error', async () => {
        await mountComponent({ error: 'Error' });
        expect(findByDirective(fixture, ErrorMessageComponent)).toBeTruthy();
    });

    it('should display a list of playlists', fakeAsync(async () => {
        await mountComponent();
        initializeVirtualScroll(fixture);

        const items = findAllByDirective(fixture, PlaylistCardComponent);
        expect(items).toHaveSize(4);
    }));
});
