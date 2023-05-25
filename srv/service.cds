using { com.gavdilabs.timesheet as data } from '../db/timesheet-db';

service TimesheetService {
  entity Employees as projection on data.Employee;
  entity AbsenceAttendanceType as projection on data.AbsenceAttendanceType;
  entity WorkSchedule as projection on data.WorkSchedule;
  entity WorkHours as projection on data.WorkHours;
  entity Project as projection on data.Project;
  entity ProjectAssignment as projection on data.ProjectAssignment;
  entity ProjectEmployeeAID as projection on data.ProjectEmployeeAID;
  entity WeekOverview as projection on data.WeekOverview
  define entity cust_scheduleToShifts {
        startTime: DateTime;
        endTime: DateTime;
  }

  define entity cust_weekOverview {
        totalWorkedHours: Integer;
        totalScheduledHours: Integer;
        totalWorkedDays: Integer;
        totalSchedulesDays: Integer;
  }

  function GetDateSpecificWorkSchedule(startDate: String, employeeNumber: Integer) returns many cust_scheduleToShifts;
  function GetWeekProgress(startDate: String, numberOfDays: Integer, employeeNumber: Integer) returns cust_weekOverview;

  define entity cust_ProjectEmployeeAID {
        totalHours: Integer;
        AID: Integer;
        AAType: String;
        percentage: Integer;
  }

  function GetProjectWorkedHours(employeeNumber: Integer, projectID: String) returns many cust_ProjectEmployeeAID;

}
