import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

/**
 * Este servicio permite manejar el overlay de bloqueo o carga de elementos para el
 * elemento de sidenav-content.
 */
@Injectable({ providedIn: CoreModule })
export class SidebarService {


	constructor() {
		// empty
	}

	/**
	 * Este método bloquea el area de navegación del sidebar y añade un efecto.
	 */
	showLoading(): void {
		document.getElementById('loadingOverlay').style.display = 'block';
		document.getElementById('sidenavMainContent').style.filter = 'blur(2px)';
	}

	/**
	 * Este método desbloquea el area de navegación del sidebar.
	 */
	hideLoading(): void {
		document.getElementById('loadingOverlay').style.display = 'none';
		document.getElementById('sidenavMainContent').style.filter = 'none';
	}
}
