import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	multipleSelection: boolean;
}

@Component({
	selector: 'app-employee-dialog-delete',
	templateUrl: './employee-dialog-delete.component.html',
	styleUrls: ['./employee-dialog-delete.component.scss']
})
export class EmployeeDialogDeleteComponent {

	multipleSelection: boolean;

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
		this.multipleSelection = this.data.multipleSelection;
	}

}
