import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComingSoonComponent } from '../../shared/coming-soon/coming-soon.component';

@Component({
	selector: 'app-attributions',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './attributions.component.html',
})
export class AttributionsComponent {}
