import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { MenuSidebarComponent } from './components/sidebar/menu-sidebar/menu-sidebar.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { HeaderModule } from './components/header/header.module';
import { HttpModule } from './http/http.module';



@NgModule({
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		AppRoutingModule,
		HeaderModule,
		HttpModule
	],
	declarations: [
		SidebarComponent,
		MenuSidebarComponent
	],
	exports: [
		HeaderModule,
		SidebarComponent,
		HttpModule
	],
	providers: [
	]
})
export class CoreModule {
}
