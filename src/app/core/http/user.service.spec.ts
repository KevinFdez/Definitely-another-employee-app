import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
	const dummyUserResponse = {
		username: 'John Doe',
		rol: 'Administrador',
		isActive: true
	};

	let service: UserService;
	let injector: TestBed;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [UserService]
		});

		injector = getTestBed();
		service = injector.get(UserService);
		httpMock = injector.get(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('getUser() should return data', () => {
		service.getUser().subscribe(
			res => {
				expect(res).toEqual(dummyUserResponse);
			},
			error => fail(error)
		);

		const req = httpMock.expectOne('./assets/mock/user/getActualUser.json');
		expect(req.request.method).toBe('GET');
		req.flush(dummyUserResponse);
	});

});
