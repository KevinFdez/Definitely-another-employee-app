import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DepartmentsComponent } from './pages/departments/departments.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: DepartmentsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DepartmentRoutingModule { }
