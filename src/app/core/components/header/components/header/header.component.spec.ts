import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DropDownUserBoxComponent } from '../drop-down-user-box/drop-down-user-box.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { UserService } from 'src/app/core/http/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderComponent, DropDownUserBoxComponent],
			imports: [MaterialModule, NoopAnimationsModule, HttpClientTestingModule],
			providers: [UserService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
