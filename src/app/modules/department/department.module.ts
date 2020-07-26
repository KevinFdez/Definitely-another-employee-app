import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentTableComponent } from './components/department-table/department-table.component';
import { DialogCreateDepartmentComponent } from './components/dialog-create-department/dialog-create-department.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		DepartmentsComponent,
		DepartmentTableComponent,
		DialogCreateDepartmentComponent
	],
	entryComponents: [
		DialogCreateDepartmentComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		DepartmentRoutingModule,
		ReactiveFormsModule
	],
	exports: [
		DepartmentRoutingModule
	]
})
export class DepartmentModule { }
