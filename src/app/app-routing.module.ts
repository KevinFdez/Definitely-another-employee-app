import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
	{ path: 'departments', loadChildren: 'src/app/modules/department/department.module#DepartmentModule' },
	{ path: 'employees', loadChildren: 'src/app/modules/employee/employee.module#EmployeeModule' },
	{ path: '', redirectTo: 'employees', pathMatch: 'full' },
	{ path: '**', redirectTo: 'employees' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
