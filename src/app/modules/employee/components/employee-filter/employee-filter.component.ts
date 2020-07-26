import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Department } from 'src/app/shared/models/department.model';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Subscription } from 'rxjs';
import { EmployeeFilterService } from '../../services/employee-filter.service';

export interface Filters {
	name: string;
	lastname: string;
	departmentId: number;
	startingDate: Date;
}

@Component({
	selector: 'app-employee-filter',
	templateUrl: './employee-filter.component.html',
	styleUrls: ['./employee-filter.component.scss']
})
export class EmployeeFilterComponent implements OnInit, OnDestroy {
	private listDepartmentsSubscription: Subscription;

	employeeFilterForm = new FormGroup({
		name: new FormControl(''),
		lastname: new FormControl(''),
		departmentId: new FormControl(''),
		startingDate: new FormControl('')
	});

	departments: Department[];

	constructor(private employeeFilterService: EmployeeFilterService, private departmentTableService: DepartmentService) {
		// empty
	}

	ngOnInit() {
		this.listDepartmentsSubscription = this.departmentTableService.getListDepartments().subscribe(
			data => this.departments = data,
			error => console.error(error)
		);
	}

	ngOnDestroy() {
		this.listDepartmentsSubscription.unsubscribe();
	}

	onClickFilterBtn(): void {
		this.employeeFilterService.setFilters(this.employeeFilterForm.value);
	}

	onClickResetBtn(): void {
		this.employeeFilterForm.reset();
		this.employeeFilterService.resetFilters();
	}

}
