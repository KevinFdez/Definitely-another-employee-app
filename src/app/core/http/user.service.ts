import { Injectable } from '@angular/core';
import { HttpModule } from './http.module';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

/**
 * Este servicio emula las llamadas de la entidad usuario o de autenticación.
 */
@Injectable({
	providedIn: HttpModule
})
export class UserService {
	baseUrl = `${environment.url}/user`;

	constructor(private http: HttpClient) { }

	/**
	 * This method executes an API call and gets the user that is logged in for the current session.
	 */
	getUser(): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/getActualUser${environment.urlSuffix}`);
	}
}
