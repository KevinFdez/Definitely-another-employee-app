import { AbstractControl } from '@angular/forms';

export class NumericValidator {

	// No es un númerico válido
	static notNaN(control: AbstractControl) {
		const val = control.value;

		if (val === null || val === '') {
			return null;
		}

		if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
			return { invalidNumber: true };
		}

		return null;
	}

	// Tiene los carácteres especificados
	static maxLength = (maxLength: number) => {
		return (control: AbstractControl) => {
			const val = control.value;

			if (val === null || val === '' || isNaN(Number.parseInt(val, 10))) {
				return null;
			}

			if (val.toString().length > maxLength) {
				return { numberMaxLength: true};
			}

			return null;
		};
	}

}
