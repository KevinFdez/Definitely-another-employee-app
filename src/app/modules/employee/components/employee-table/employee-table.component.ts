import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/core/http/employee.service';
import { EmployeeFilterService } from '../../services/employee-filter.service';
import { Filters } from '../employee-filter/employee-filter.component';

const allowMultiSelect = true;

@Component({
	selector: 'app-employee-table',
	templateUrl: './employee-table.component.html',
	styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit, OnDestroy {
	private selectionSubscription: Subscription;
	private tableDataSourceSubscription: Subscription;
	private employeeFilterSubscription: Subscription;

	displayedColumns: string[] = ['select', 'id', 'name', 'lastname', 'age', 'startingDate'];
	dataSource = new MatTableDataSource<Employee>(undefined);
	selection = new SelectionModel<Employee>(allowMultiSelect, []);

	@Output() selectedEmployee = new EventEmitter<Employee[]>();

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private employeeTableService: EmployeeService, private employeeFilterService: EmployeeFilterService) {
		// empty
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.selectionSubscription = this.selection.changed.subscribe(
			selected => {
				this.selectedEmployee.emit(selected.source.selected);
			},
			error => console.error(error)
		);

		this.tableDataSourceSubscription = this.employeeTableService.getListEmployees().subscribe(
			data => {
				this.selection.clear();
				this.dataSource.data = data;
			},
			error => console.error(error)
		);

		this.dataSource.filterPredicate = (data: Employee, filtersJson: string) => {
			const matchFilter = [];
			const filters: Filters = JSON.parse(filtersJson);

			if (filters.name) {
				const value = data.name === null ? '' : data.name;
				matchFilter.push(value.toLowerCase().includes(filters.name.toLowerCase()));
			}

			if (filters.lastname) {
				const value = data.lastname === null ? '' : data.lastname;
				matchFilter.push(value.toLowerCase().includes(filters.lastname.toLowerCase()));
			}

			if (filters.departmentId) {
				const value = data.departmentId === null ? '' : data.departmentId;
				matchFilter.push(value === filters.departmentId);
			}

			if (filters.startingDate) {
				filters.startingDate = new Date(filters.startingDate);
				matchFilter.push(data.startingDate >= filters.startingDate);
			}

			return matchFilter.every(Boolean);
		};

		this.employeeFilterSubscription = this.employeeFilterService.getFilters().subscribe(
			filter => this.applyFilter(filter),
			error => console.error(error)
		);
	}

	ngOnDestroy() {
		this.selectionSubscription.unsubscribe();
		this.tableDataSourceSubscription.unsubscribe();
		this.employeeFilterSubscription.unsubscribe();
	}

	/**
	 * Este método aplica el fitro que le llega como parámetro al datasource de la tabla de empleados.
	 *
	 * @param filterValue objeto de valor de filtrado con los campos a filtrar rellenos.
	 */
	applyFilter(filterValue: Filters) {
		this.dataSource.filter = JSON.stringify(filterValue);
	}

	/**
	 * Este método indica cuando se han seleccionado todas las entradas que conforman
	 * el datasource de la tabla.
	 *
	 * @returns True si todas las filas están seleccionadas, False si no lo están.
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/**
	 * Este método es utilizado por el selector (checkbox) maestro ubicado en las cabeceras
	 * de la tabla. Si no hay elementos seleccionados, no lo están todos, selecciona todos los elementos.
	 * Si ya están todos los elementos de la tabla seleccionados los deselecciona.
	 */
	masterToggle(): void {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}
}
