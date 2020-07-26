import { Component } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

	isShowingRouteLoadIndicator: boolean;

	constructor(router: Router) {

		this.isShowingRouteLoadIndicator = false;

		let asyncLoadCount = 0;

		router.events.subscribe(
			(event: RouterEvent): void => {

				if (event instanceof RouteConfigLoadStart) {
					asyncLoadCount++;

				} else if (event instanceof RouteConfigLoadEnd) {
					asyncLoadCount--;
				}

				this.isShowingRouteLoadIndicator = !!asyncLoadCount;
			},
			error => console.error(error)
		);

	}

}
