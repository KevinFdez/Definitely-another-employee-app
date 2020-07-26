import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Filters } from '../components/employee-filter/employee-filter.component';

@Injectable()
export class EmployeeFilterService {

	private employeeFilterEmmiter: Subject<Filters>;


	constructor() {
		this.employeeFilterEmmiter = new Subject();
	}


	getFilters(): Observable<Filters> {
		return this.employeeFilterEmmiter;
	}

	setFilters(filter: Filters): void {
		this.employeeFilterEmmiter.next(filter);
	}

	resetFilters(): void {
		this.employeeFilterEmmiter.next();
	}
}
