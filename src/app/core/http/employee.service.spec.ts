import { TestBed, getTestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { Employee } from 'src/app/shared/models/employee.model';


describe('EmployeeService', () => {
	const dummyEmployeeResponse: Employee = {
		id: 1,
		name: 'Cynthia',
		lastname: 'Kelley',
		age: 56,
		startingDate: new Date('2014-01-01T00:00:00.000Z'),
		departmentId: 1
	};

	let service: EmployeeService;
	let injector: TestBed;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [EmployeeService]
		});

		injector = getTestBed();
		service = injector.get(EmployeeService);
		httpMock = injector.get(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should getEmployee($idEmployee) return an employee', fakeAsync(() => {
		const idEmployee = 1;
		let empleado;

		service.getEmployee(idEmployee).subscribe(
			emp => empleado = emp,
			error => fail(error)
		);

		tick(2000); // Tiempo de espera por el timeout dentro del service.
		expect(empleado).toEqual(dummyEmployeeResponse);
	}));

	it('should createEmployee($params) create a new employee', fakeAsync(() => {
		const name = 'Martin';
		const lastname = 'Burriana';
		const age = 27;
		const departmentId = 1;
		const empoyeesMock = service.getEmployeesMock();

		expect(empoyeesMock.length).toEqual(4);

		service.createEmployee(name, lastname, age, departmentId).subscribe(
			() => { },
			error => fail(error)
		);

		tick(2000); // Tiempo de espera por el timeout dentro del service.

		expect(empoyeesMock.length).toEqual(5);

		const newEmployee = empoyeesMock[empoyeesMock.length - 1];

		expect(newEmployee.name).toEqual(name);
		expect(newEmployee.lastname).toEqual(lastname);
		expect(newEmployee.age).toEqual(age);
		expect(newEmployee.departmentId).toEqual(departmentId);
	}));

	it('should updateEmployee($employee) update an existing employee', fakeAsync(() => {
		const name = 'Martin';
		const lastname = 'Burriana';
		const age = 27;
		const departmentId = 1;
		const empoyeesMock = service.getEmployeesMock();
		const employeeToUpdate = empoyeesMock[empoyeesMock.length - 1];

		employeeToUpdate.name = name;
		employeeToUpdate.lastname = lastname;
		employeeToUpdate.age = age;
		employeeToUpdate.departmentId = departmentId;

		service.updateEmployee(employeeToUpdate).subscribe(
			() => { },
			error => fail(error)
		);

		tick(2000); // Tiempo de espera por el timeout dentro del service.

		const updatedEmployee = empoyeesMock[empoyeesMock.length - 1];

		expect(updatedEmployee.name).toEqual(name);
		expect(updatedEmployee.lastname).toEqual(lastname);
		expect(updatedEmployee.age).toEqual(age);
		expect(updatedEmployee.departmentId).toEqual(departmentId);
	}));

	it('should deleteEmployee($idEmployee) delete an existing employee', fakeAsync(() => {
		const idEmployee = 1;
		const empoyeesMock = service.getEmployeesMock();

		service.deleteEmployee(idEmployee).subscribe(
			() => { },
			error => fail(error)
		);

		tick(2000); // Tiempo de espera por el timeout dentro del service.

		expect(empoyeesMock.length).toEqual(3);

		const updatedEmployee = empoyeesMock[0];

		expect(updatedEmployee.id).toEqual(2);
	}));

});
