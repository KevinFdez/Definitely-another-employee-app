import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateDepartmentComponent } from '../../components/dialog-create-department/dialog-create-department.component';
import { DepartmentService } from 'src/app/core/http/department.service';

@Component({
	selector: 'app-departments',
	templateUrl: './departments.component.html',
	styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {

	routerSubscription: Subscription;
	departmentSubscription: Subscription;

	constructor(public dialog: MatDialog, private departmentTableService: DepartmentService) {
		// empty
	}

	/**
	 * Este método abre el diálogo de creación de un nuevo departamento. Al aceptar el diálogo se genera un nuevo registro
	 * en la tabla de departamentos.
	 */
	onClickCreateDepartmentBtn(): void {
		const dialogRef = this.dialog.open(DialogCreateDepartmentComponent);

		dialogRef.afterClosed().subscribe(
			result => {
				if (!result) {
					return;
				}

				this.departmentTableService.createDepartment(result);
			},
			error => console.error(error)
		);
	}
}
