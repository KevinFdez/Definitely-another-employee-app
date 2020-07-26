import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NumericValidator } from './numericValidator';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
	template: `
		<form [formGroup]="exampleForm">
			<mat-form-field>
				<input matInput type="text" formControlName="numberField">
        	</mat-form-field>
		</form>
	`
})
class TestComponent {
	exampleForm = new FormGroup({
		numberField: new FormControl('', [NumericValidator.notNaN, NumericValidator.maxLength(2)])
	});
}

describe('NumericValidator', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				FormsModule,
				MaterialModule,
				ReactiveFormsModule,
				NoopAnimationsModule
			],
			declarations: [TestComponent],
			providers: [
				{ provide: ComponentFixtureAutoDetect, useValue: true },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
	});

	it('should validate the number field', async(() => {
		component.exampleForm.controls.numberField.setValue(1);

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(component.exampleForm.valid).toBe(true);
		});
	}));

	it('should invalidate the number field because of a string value', async(() => {
		component.exampleForm.controls.numberField.setValue('asdf');

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(component.exampleForm.valid).toBe(false);
		});
	}));

	it('should invalidate the number field because of a maxLength directive', async(() => {
		component.exampleForm.controls.numberField.setValue(123);

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(component.exampleForm.valid).toBe(false);
		});
	}));
});


