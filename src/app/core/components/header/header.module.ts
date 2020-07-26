import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { DropDownUserBoxComponent } from './components/drop-down-user-box/drop-down-user-box.component';

@NgModule({
	declarations: [
		HeaderComponent,
		DropDownUserBoxComponent
	],
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [
		HeaderComponent
	],
	providers: [],
})
export class HeaderModule { }
