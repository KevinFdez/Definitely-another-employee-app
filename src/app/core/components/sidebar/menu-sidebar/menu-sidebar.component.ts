import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-menu-sidebar',
	templateUrl: './menu-sidebar.component.html',
	styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent {

	routerSubscription: Subscription;

	constructor() {
		// empty
	}

}
