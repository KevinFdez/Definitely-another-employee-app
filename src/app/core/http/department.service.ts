import { Injectable } from '@angular/core';

import { HttpModule } from './http.module';
import { BehaviorSubject } from 'rxjs';
import { Department } from 'src/app/shared/models/department.model';

/**
 * Este servicio emula las llamadas de la entidad de departamentos.
 */
@Injectable({
	providedIn: HttpModule
})
export class DepartmentService {

	private departmentTableDataSourceEmmiter: BehaviorSubject<Department[]>;

	private DEPARTMENTS_MOCK: Department[] = [
		{ id: 1, name: 'Net Surfers' },
		{ id: 2, name: 'Ideas R Us' },
		{ id: 3, name: 'Venture Vultures' },
		{ id: 4, name: 'ACME Consulting' }
	];

	constructor() {
		this.departmentTableDataSourceEmmiter = new BehaviorSubject(this.DEPARTMENTS_MOCK);
	}

	/**
	 * Este método emula el paso para obtener de un servidor la petición de los datos de la tabla
	 * de departamentos.
	 */
	getListDepartments(): BehaviorSubject<Department[]> {
		return this.departmentTableDataSourceEmmiter;
	}

	/**
	 * Este método emula el paso para enviar al servidor una petición para crear un nuevo departamento.
	 *
	 * @param name nombre del nuevo departamento.
	 */
	createDepartment(name: string): void {
		const id = this.DEPARTMENTS_MOCK.length + 1;
		const newDepartment: Department = { id, name };
		this.DEPARTMENTS_MOCK.push(newDepartment);

		this.departmentTableDataSourceEmmiter.next(this.DEPARTMENTS_MOCK);
	}
}
