import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Department } from 'src/app/shared/models/department.model';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/core/http/department.service';

@Component({
	selector: 'app-department-table',
	templateUrl: './department-table.component.html',
	styleUrls: ['./department-table.component.scss']
})
export class DepartmentTableComponent implements OnInit, OnDestroy {

	private tableDataSourceSubscription: Subscription;

	dataSource = new MatTableDataSource<Department>(undefined);
	displayedColumns: string[] = ['id', 'name'];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private departmentTableService: DepartmentService) {
		// empty
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.tableDataSourceSubscription = this.departmentTableService.getListDepartments().subscribe(
			data => {
				this.dataSource.data = data;
			},
			error => console.error(error)
		);
	}

	ngOnDestroy() {
		this.tableDataSourceSubscription.unsubscribe();
	}

}
