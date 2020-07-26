import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeDialogDeleteComponent } from './components/employee-dialog-delete/employee-dialog-delete.component';
import { EmployeeFilterComponent } from './components/employee-filter/employee-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFilterService } from './services/employee-filter.service';


@NgModule({
	declarations: [
		EmployeeDetailComponent,
		EmployeesComponent,
		EmployeeTableComponent,
		EmployeeDialogDeleteComponent,
		EmployeeFilterComponent
	],
	entryComponents: [
		EmployeeDialogDeleteComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		EmployeeRoutingModule,
		ReactiveFormsModule
	],
	exports: [
		EmployeeRoutingModule
	],
	providers: [
		EmployeeFilterService
	]
})
export class EmployeeModule { }
