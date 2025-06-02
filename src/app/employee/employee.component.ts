import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService, Employee } from './employeeservice.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [AddEmployeeComponent, CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = []; // Holds the filtered list of employees
  searchQuery: string = ''; // Holds the search query

  isAddEmployeeFormVisible = false; // Controls visibility of the form
  editingEmployee: Employee | null = null; // Holds the employee being edited

  constructor(private employeeService: EmployeeserviceService) {}

  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  refreshEmployeeList(): void {
    // Fetch employees from the backend
    this.employeeService.getEmployeesFromBackend().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees]; // Initialize filtered list
      },
      error: (err) => {
        console.error('Failed to fetch employees:', err);
      }
    });
  }

  filterEmployees(): void {
    const query = this.searchQuery.toLowerCase();
  
    this.filteredEmployees = this.employees.filter(employee => {
      // Check if the query matches the employee ID
      const matchesId = employee.id.toString().includes(query);
  
      // Check if the query matches other fields
      const matchesOtherFields =
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query);
  
      return matchesId || matchesOtherFields; // Return true if any condition matches
    });
  }

  showAddEmployeeForm(): void {
    this.isAddEmployeeFormVisible = true;
    this.editingEmployee = null; // Reset editing state
  }

  editEmployee(employee: Employee): void {
    if (!employee.id) {
      console.error('Employee ID is undefined. Cannot edit employee.');
      return;
    }
  
    this.editingEmployee = { ...employee }; // Clone the employee to avoid direct mutation
    this.isAddEmployeeFormVisible = true; // Show the form
  }

  onFormSubmit(employee: Employee): void {
    if (this.editingEmployee) {
      // Update existing employee
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.refreshEmployeeList();
        this.isAddEmployeeFormVisible = false;
      });
    } else {
      // Add new employee
      this.employeeService.addEmployee(employee).subscribe(() => {
        this.refreshEmployeeList();
        this.isAddEmployeeFormVisible = false;
      });
    }
  }

  deleteEmployee(id: number): void {
    if (!id) {
      console.error('Employee ID is undefined. Cannot delete employee.');
      return;
    }
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.refreshEmployeeList(); // Refresh the list after deletion
    });
  }
  
}