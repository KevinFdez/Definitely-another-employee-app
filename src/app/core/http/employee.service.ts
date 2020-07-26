import { Injectable } from '@angular/core';

import { HttpModule } from './http.module';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee } from 'src/app/shared/models/employee.model';

/**
 * Este servicio emula las llamadas de la entidad de empleados.
 */
@Injectable({
	providedIn: HttpModule
})
export class EmployeeService {
	private employeesTableDataSourceEmmiter: BehaviorSubject<Employee[]>;
	private actualIdInUse: number;

	private EMPLOYEES_MOCK: Employee[] = [
		{ id: 1, name: 'Cynthia', lastname: 'Kelley', age: 56, startingDate: new Date('2014-01-01T00:00:00.000Z'), departmentId: 1 },
		{ id: 2, name: 'Timothy', lastname: 'Carlson', age: 43, startingDate: new Date('2015-11-05T00:00:00.000Z'), departmentId: 2 },
		{ id: 3, name: 'Jean', lastname: 'Douglas', age: 37, startingDate: new Date('2013-04-08T00:00:00.000Z'), departmentId: 3 },
		{ id: 4, name: 'Johnny', lastname: 'Fields', age: 31, startingDate: new Date('2016-02-09T00:00:00.000Z'), departmentId: 4 }
	];

	/**
	 * Este método existe tan solo para temas de test.
	 * NO UTILIZAR EN LA APP.
	 */
	getEmployeesMock(): Employee[] {
		return this.EMPLOYEES_MOCK;
	}

	constructor() {
		this.employeesTableDataSourceEmmiter = new BehaviorSubject(this.EMPLOYEES_MOCK);
		this.actualIdInUse = 4;
	}

	/**
	 * Este método emula el paso para obtener del servidor la petición de los datos de la tabla
	 * de empleados.
	 *
	 * @returns Devuelve un BehaviorSubject que se resuelve con un listado de entidades de tipo empleado.
	 */
	getListEmployees(): BehaviorSubject<Employee[]> {
		return this.employeesTableDataSourceEmmiter;
	}

	/**
	 * Este método emula el paso para obtener una entidad de tipo empleado dado un identificador
	 * único de empleado.
	 *
	 * @param idEmployee identificador único de empleado.
	 * @returns Devuelve un observable que se resuelve con una entidad de tipo empleado.
	 */
	getEmployee(idEmployee: number): Observable<Employee> {
		const interfaceBridge: Subject<Employee> = new Subject<Employee>();

		setTimeout(
			() => {
				const employee = this.EMPLOYEES_MOCK.find(emp => emp.id === idEmployee);
				interfaceBridge.next(employee);
				interfaceBridge.complete();
			},
			2000
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método emula el paso para enviar al servidor una petición para crear un nuevo empleado.
	 *
	 * @param name nombre del nuevo empleado.
	 * @param lastname apelldios del nuevo empleado.
	 * @param age edad del nuevo empleado.
	 * @param departamentId id del departamento al que está asociado el nuevo empleado.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	createEmployee(name: string, lastname: string, age: number, departmentId: number): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		setTimeout(
			() => {
				this.actualIdInUse += 1;
				const startingDate = new Date();
				const newEmployee: Employee = { id: this.actualIdInUse, name, lastname, age, startingDate, departmentId };
				this.EMPLOYEES_MOCK.push(newEmployee);

				this.employeesTableDataSourceEmmiter.next(this.EMPLOYEES_MOCK);
				interfaceBridge.next();
				interfaceBridge.complete();
			},
			2000
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método emula el paso para actualizar un empleado existente con los cambios que se han
	 * realizado desde la vista de detalle del empleado.
	 *
	 * @param employee datos del empleado modificado.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	updateEmployee(employee: Employee): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		setTimeout(
			() => {
				const index = this.EMPLOYEES_MOCK.findIndex(emp => emp.id === employee.id);
				this.EMPLOYEES_MOCK[index] = employee;

				this.employeesTableDataSourceEmmiter.next(this.EMPLOYEES_MOCK);
				interfaceBridge.next();
				interfaceBridge.complete();
			},
			2000
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método eliminar un empleado dado un ID de empleado.
	 *
	 * @param idEmployee identificador único del empleado.
	 */
	private delete(idEmployee: number): void {
		const index = this.EMPLOYEES_MOCK.findIndex(emp => emp.id === idEmployee);
		this.EMPLOYEES_MOCK.splice(index, 1);
	}

	/**
	 * Este método emula el paso para eliminar un empleado dado un ID de empleado.
	 *
	 * @param idEmployee identificador único del empleado.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	deleteEmployee(idEmployee: number): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		setTimeout(
			() => {
				this.delete(idEmployee);

				this.employeesTableDataSourceEmmiter.next(this.EMPLOYEES_MOCK);
				interfaceBridge.next();
				interfaceBridge.complete();
			},
			2000
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método emula el paso para eliminar varios empleados dado un listado de IDs de empleado.
	 *
	 * @param idEmployee identificador único del empleado.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	deleteEmployees(idsEmployee: Array<number>): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		setTimeout(
			() => {
				idsEmployee.forEach(id => {
					this.delete(id);
				});

				this.employeesTableDataSourceEmmiter.next(this.EMPLOYEES_MOCK);
				interfaceBridge.next();
				interfaceBridge.complete();

			},
			2000
		);

		return interfaceBridge.asObservable();
	}
}
