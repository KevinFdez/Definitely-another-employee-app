import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogDeleteComponent, DialogData } from '../../components/employee-dialog-delete/employee-dialog-delete.component';
import { EmployeeService } from 'src/app/core/http/employee.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

	editBtnDisabled: boolean;
	deleteBtnDisabled: boolean;

	selectedEmployee: Employee[];


	constructor(
		private router: Router, public dialog: MatDialog, private employeeService: EmployeeService,
		private sidebarService: SidebarService) {
		this.editBtnDisabled = true;
		this.deleteBtnDisabled = true;
	}

	/**
	 * Este método es llamado cuando se selecciona uno o varios registros de la tabla
	 * de empleados. Habilita o deshabilita los botones de acción.
	 */
	onEmployeeSelected(selectedEmployee: Employee[]): void {
		if (selectedEmployee.length >= 1) {
			this.deleteBtnDisabled = false;
		} else {
			this.deleteBtnDisabled = true;
		}

		if (selectedEmployee.length !== 1) {
			this.editBtnDisabled = true;
		} else {
			this.editBtnDisabled = false;
		}

		this.selectedEmployee = selectedEmployee;
	}

	/**
	 * Este método lleva al componente de detalle del empleado con el ID del empleado para rellenar el formulario
	 * con los datos del empleado seleccionado y permitir su edición.
	 */
	onClickEditEmpBtn(): void {
		this.router.navigate(['/employees/detail', this.selectedEmployee[0].id]);
	}

	/**
	 * Este método abre una diálogo de confirmación para el borrado de los registros seleccionados
	 * de la tabla de empleados. Si se acepta el diálogo se eliminan los registros seleccionados.
	 */
	onClickDeleteEmpBtn(): void {
		const data: DialogData = {
			multipleSelection: this.selectedEmployee.length > 1
		};

		const dialogRef = this.dialog.open(EmployeeDialogDeleteComponent, { data });

		dialogRef.afterClosed().subscribe(result => {
			if (!result) {
				return;
			}

			this.sidebarService.showLoading();
			const employeesId = this.selectedEmployee.map(employee => employee.id);
			this.employeeService.deleteEmployees(employeesId).subscribe(
				() => this.sidebarService.hideLoading(),
				error => console.error(error)
			);
		});
	}
}
