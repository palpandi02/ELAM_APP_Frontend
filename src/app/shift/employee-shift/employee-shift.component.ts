import { Component, OnInit } from '@angular/core';
import { EmployeeshiftserviceService } from './employeeshiftservice.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-shift',
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './employee-shift.component.html',
  styleUrls: ['./employee-shift.component.css']
})
export class EmployeeShiftComponent implements OnInit {
  shifts: any[] = [];
  filteredShifts: any[] = [];
  searchDate: string = '';
  errorMessage: string | null = null;

  constructor(private shiftService: EmployeeshiftserviceService) {}

  ngOnInit(): void {
    const employeeId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (employeeId) {
      this.fetchEmployeeShifts(employeeId);
    }
  }

  fetchEmployeeShifts(employeeId: number): void {
    this.shiftService.getEmployeeShifts(employeeId).subscribe({
      next: (data) => {
        this.shifts = data;
        this.filteredShifts = [...this.shifts]; // Initialize filtered shifts
      },
      error: (error) => {
        console.error('Error fetching employee shifts:', error);
        this.errorMessage = 'Failed to fetch shifts. Please try again later.';
      }
    });
  }

  applySearch(): void {
    if (this.searchDate) {
      this.filteredShifts = this.shifts.filter(shift => shift.date === this.searchDate);
    } else {
      this.filteredShifts = [...this.shifts];
    }
  }

  // Check if shift date is in the past
  isShiftDatePast(shiftDate: string): boolean {
    const today = new Date();
    const shift = new Date(shiftDate);
    
    // Set time to 00:00:00 for accurate date comparison
    today.setHours(0, 0, 0, 0);
    shift.setHours(0, 0, 0, 0);
    
    return shift < today;
  }

  requestSwap(shiftId: number): void {
    // Find the shift to check if it's a past date
    const shift = this.shifts.find(s => s.id === shiftId);
    if (shift && this.isShiftDatePast(shift.date)) {
      alert('Cannot request swap for past shift dates.');
      return;
    }

    this.shiftService.requestShiftSwap(shiftId).subscribe({
      next: () => {
        alert('Shift swap request submitted successfully.');
        this.fetchEmployeeShifts(parseInt(localStorage.getItem('userId') || '0', 10)); // Refresh shifts
      },
      error: (error) => {
        console.error('Error requesting shift swap:', error);
        alert('Failed to request shift swap. Please try again later.');
      }
    });
  }
}