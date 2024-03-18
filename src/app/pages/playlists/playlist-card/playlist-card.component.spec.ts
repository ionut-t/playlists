import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findByCss } from '@common/testing';
import { PLAYLISTS_MOCK } from '@repositories/playlists/mock';
import { PlaylistCardComponent } from './playlist-card.component';

describe('PlaylistCardComponent', () => {
    let component: PlaylistCardComponent;
    let fixture: ComponentFixture<PlaylistCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlaylistCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PlaylistCardComponent);
        component = fixture.componentInstance;
        component.playlist = PLAYLISTS_MOCK[0];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the playlist details', () => {
        expect(findByCss(fixture, 'img').nativeElement.src).toBeTruthy();
        expect(findByCss(fixture, 'a').nativeElement.textContent).toContain(
            'New Music Daily'
        );
        expect(findByCss(fixture, 'p.curator').nativeElement.textContent).toBe(
            'Curated by Apple Music'
        );
    });
});
