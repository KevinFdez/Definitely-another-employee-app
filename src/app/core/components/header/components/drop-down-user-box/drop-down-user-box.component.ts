import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-drop-down-user-box',
	templateUrl: './drop-down-user-box.component.html',
	styleUrls: ['./drop-down-user-box.component.scss']
})
export class DropDownUserBoxComponent implements OnInit, OnDestroy {

	user: User;
	userSubscription: Subscription;

	constructor(private userService: UserService) {
		// empty
	}

	ngOnInit() {
		this.userSubscription = this.userService.getUser().subscribe(
			user => this.user = user,
			error => console.error(error)
			);
	}

	ngOnDestroy() {
		if (this.userSubscription != null) {
			this.userSubscription.unsubscribe();
		}
	}

}
