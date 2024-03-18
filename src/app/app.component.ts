import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <main class="main">
            <router-outlet></router-outlet>
        </main>
    `,
    styles: `
        .main {
            height: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
