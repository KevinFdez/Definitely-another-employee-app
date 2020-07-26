import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MenuSidebarComponent } from './menu-sidebar.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';

describe('MenuSidebarComponent', () => {
	let component: MenuSidebarComponent;
	let fixture: ComponentFixture<MenuSidebarComponent>;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MenuSidebarComponent],
			imports: [MaterialModule, CommonModule, RouterTestingModule.withRoutes(routes)]
		})
			.compileComponents();

		fixture = TestBed.createComponent(MenuSidebarComponent);
		component = fixture.componentInstance;
		router = TestBed.get(Router);

		spyOn(router, 'navigateByUrl');

		fixture.detectChanges();
		router.initialNavigation();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should instantiate', () => {
		expect(component).toBeDefined();
	});

	it('should trigger the navigation to `/employees`', async(() => {
		const link = fixture.debugElement.nativeElement.querySelector('#employeeRoute');

		link.click();

		expect(router.navigateByUrl).toHaveBeenCalled();
	}));
});
