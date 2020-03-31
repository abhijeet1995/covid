import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { removeErrorMarkup } from "tslint/lib/verify/parse";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employeeSearch: string = null;
  public employeeCount: number = null;
  public employees: any[] = [];
  public employeeSort: boolean = false;
  public errorMessage: string;


  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._employeeService.getAllEmployees().subscribe((data) => {
      this.employees = data.Countries
      console.log(this.employees)
      this.employeeCount = this.employees.length;
    }, (err) => {
      this.errorMessage = err;
    });
  }

  public filterEmployees(employeeSearch) {
    this._employeeService.getAllEmployees().subscribe((data) => {
      this.employees = data.Countries.filter(function (employee) {
        return employee.Country.toUpperCase().trim().match(employeeSearch.toUpperCase().trim());
      });
      this.employeeCount = this.employees.length;
    });
  }

}