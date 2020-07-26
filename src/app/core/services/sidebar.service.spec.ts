import { TestBed, ComponentFixture, async, getTestBed } from '@angular/core/testing';

import { SidebarComponent } from '../components/sidebar/sidebar/sidebar.component';
import { SidebarService } from './sidebar.service';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('SidebarService', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;
	let service: SidebarService;
	let injector: TestBed;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				SidebarComponent
			],
			imports: [
				MaterialModule,
				RouterTestingModule,
				NoopAnimationsModule
			],
			providers: [SidebarService],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		injector = getTestBed();
		service = injector.get(SidebarService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should instantiate', () => {
		expect(component).toBeDefined();
	});

	it('should show the loading overlay', () => {
		const overlayDiv = fixture.debugElement.nativeElement.querySelector('#loadingOverlay');
		const sidenavContent = fixture.debugElement.nativeElement.querySelector('#sidenavMainContent');

		service.showLoading();

		expect(overlayDiv.style.display).toEqual('block');
		expect(sidenavContent.style.filter).toEqual('blur(2px)');
	});

	it('should hide the loading overlay', () => {
		const overlayDiv = fixture.debugElement.nativeElement.querySelector('#loadingOverlay');
		const sidenavContent = fixture.debugElement.nativeElement.querySelector('#sidenavMainContent');

		service.hideLoading();

		expect(overlayDiv.style.display).toEqual('none');
		expect(sidenavContent.style.filter).toEqual('none');
	});
});
