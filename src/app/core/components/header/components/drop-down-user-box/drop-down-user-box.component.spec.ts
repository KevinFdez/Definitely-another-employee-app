import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownUserBoxComponent } from './drop-down-user-box.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { UserService } from 'src/app/core/http/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DropDownUserBoxComponent', () => {
	let component: DropDownUserBoxComponent;
	let fixture: ComponentFixture<DropDownUserBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DropDownUserBoxComponent],
			imports: [MaterialModule, NoopAnimationsModule, HttpClientTestingModule],
			providers: [UserService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DropDownUserBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
