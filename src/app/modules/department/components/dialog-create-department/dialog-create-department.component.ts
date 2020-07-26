import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData {
	name: string;
}

@Component({
	selector: 'app-dialog-create-department',
	templateUrl: './dialog-create-department.component.html',
	styleUrls: ['./dialog-create-department.component.scss']
})
export class DialogCreateDepartmentComponent {
	department = new FormControl('', [
		Validators.required
	]);

	constructor() {
		// empty
	}

}
