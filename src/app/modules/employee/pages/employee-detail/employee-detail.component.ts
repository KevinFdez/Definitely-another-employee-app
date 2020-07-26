import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/core/http/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/shared/models/department.model';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { NumericValidator } from 'src/app/shared/validators/numericValidator';


@Component({
	selector: 'app-employee-detail',
	templateUrl: './employee-detail.component.html',
	styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
	private listDepartmentsSubscription: Subscription;

	employee: Employee;
	departments: Department[];

	employeeForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
		lastname: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]),
		age: new FormControl('', [Validators.required, NumericValidator.notNaN, NumericValidator.maxLength(2)]),
		departmentId: new FormControl('', [Validators.required]),
		startingDate: new FormControl({ value: '', disabled: true })
	});

	constructor(
		private route: ActivatedRoute, private location: Location, private employeeService: EmployeeService,
		private departmentTableService: DepartmentService, private sidebarService: SidebarService) {
		// empty
	}

	ngOnInit(): void {
		this.getEmployee();
		this.listDepartmentsSubscription = this.departmentTableService.getListDepartments().subscribe(
			data => this.departments = data,
			error => console.error(error)
		);
	}

	ngOnDestroy(): void {
		this.listDepartmentsSubscription.unsubscribe();
	}

	/**
	 * Este método obtiene un empleado para rellenar los campos del formulario si en la URL se
	 * ha especificado un ID de empleado.
	 */
	private getEmployee(): void {
		const idEmployee = this.route.snapshot.paramMap.get('id');

		if (idEmployee) {
			this.sidebarService.showLoading();
			this.employeeService.getEmployee(Number.parseInt(idEmployee, 10))
				.subscribe(
					emp => {
						this.employee = emp;
						this.employeeForm.patchValue(this.employee);
						this.sidebarService.hideLoading();
					},
					error => {
						console.error('Ha habido un error al obtener el empleado con id: %s \n %s', idEmployee, error);
						this.sidebarService.hideLoading();
					}
				);
		}
	}

	/**
	 * Este método vuelve a la dirección de URL anterior.
	 */
	goBack(): void {
		this.location.back();
	}

	/**
	 * Este método actualiza la variable local de empleado para ser utilizada para transportar los nuevos datos.
	 */
	private updateEmployeeVar(): void {
		this.employee.name = this.employeeForm.value.name;
		this.employee.lastname = this.employeeForm.value.lastname;
		this.employee.age = this.employeeForm.value.age;
		this.employee.departmentId = this.employeeForm.value.departmentId;
	}

	/**
	 * Este método guarda los valores de la ficha detalle del empleado. Si es un empleado nuevo, no tiene ID,
	 * llama a generar un nuevo empleado. Si contiene ID llama a actualizar empleado actual.
	 */
	save(): void {
		this.sidebarService.showLoading();

		if (this.employee != null) {
			this.updateEmployeeVar();
			this.employeeService.updateEmployee(this.employee).subscribe(
				() => {
					this.sidebarService.hideLoading();
					this.goBack();
				},
				error => {
					console.error('Ha habido un error al actualizar el empleado existente: \n %s', error);
					this.sidebarService.hideLoading();
				}
			);

		} else {
			this.employeeService.createEmployee(
				this.employeeForm.get('name').value,
				this.employeeForm.get('lastname').value,
				this.employeeForm.get('age').value,
				this.employeeForm.get('departmentId').value
			)
				.subscribe(
					() => {
						this.sidebarService.hideLoading();
						this.goBack();
					},
					error => {
						console.error('Ha habido un error al guardar un nuevo empleado: \n %s', error);
						this.sidebarService.hideLoading();
					}
				);
		}
	}
}
