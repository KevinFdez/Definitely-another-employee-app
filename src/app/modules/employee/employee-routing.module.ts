import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: EmployeesComponent },
	{ path: 'detail/:id', component: EmployeeDetailComponent },
	{ path: 'create', component: EmployeeDetailComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EmployeeRoutingModule { }
