using { com.gavdilabs.timesheet as data } from '../db/timesheet-db';

service TimesheetService {
  entity Employees as projection on data.Employee;
  entity AbsenceAttendanceType as projection on data.AbsenceAttendanceType;
  entity WorkSchedule as projection on data.WorkSchedule;
  entity WorkHours as projection on data.WorkHours;
  entity Project as projection on data.Project;
  entity ProjectAssignment as projection on data.ProjectAssignment;
}