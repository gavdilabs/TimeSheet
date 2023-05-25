namespace com.gavdilabs.timesheet;
using { cuid, temporal, managed } from '@sap/cds/common';

define type Atype : String(20);
define type EmployeeNumber : Integer;
define type Hours : Integer;

type weekday : String enum {
    monday;
    tuesday;
    wednesday;
    thursday;
    friday;
    saturday;
    sunday
  };

entity AbsenceAttendanceType {
    key AID     : Integer;
    AAType      : Atype @title : '{i18n>AbsAttType}' ;
    isAbsence   : Boolean @title : '{i18n>IsAbsence}';
}

entity Employee {
    key userName    : String(8);
    employeeNumber  : EmployeeNumber;
    firstName       : String @title : '{i18n>FirstName}' @Semantics.name.givenName;
    lastName        : String @title : '{i18n>LastName}' @Semantics.name.familyName;
    title           : String(50)  @title : '{i18n>Title}';
    pictureUrl      : String @title : '{i18n>Picture}' @Core.IsURL @Core.MediaType: pictureType;
    pictureType     : String  @Core.IsMediaType;
    _workSchedule   : Association to many WorkSchedule on _workSchedule.employee = $self.employeeNumber;
    _workHours      : Association to many WorkHours on _workHours.employee = $self.employeeNumber;
    _projectAssignments : Association to many ProjectAssignment on _projectAssignments.employee = $self.employeeNumber;
}

entity WorkSchedule : cuid, temporal {
   employee     : EmployeeNumber;
   weekday      : weekday @title : '{i18n>WeekDay}';
   starttime    : Time @title : '{i18n>StartTime}';
   endtime      : Time @title : '{i18n>Endtime}';
   _employee    : Association to Employee on _employee.employeeNumber = $self.employee;
}

entity WorkHours : cuid, managed {
    employee        : EmployeeNumber;
    workingDay      : Date @title : '{i18n>WorkingDay}';
    fromTime        : Time @title : '{i18n>FromTime}';
    toTime          : Time @title : '{i18n>ToTime}';
    AID             : Integer;
    projectID       : UUID;
    _employee       : Association to Employee on _employee.employeeNumber = $self.employee;
    _project        : Association to Project on _project.ID = $self.projectID;
    _absAttendance  : Association to AbsenceAttendanceType on _absAttendance.AID = $self.AID;
}

entity Project : cuid, temporal, managed {
    projectName : String @title : '{i18n>ProjectName}';
    totalHours  : Hours @title : '{i18n>TotalHours}';
    _projectAssignments : Association to many ProjectAssignment on _projectAssignments.projectID = $self.ID;
}

entity ProjectAssignment : temporal {
    key projectID   : UUID;
    key employee    : EmployeeNumber;
    assignedHours   : Hours @title : '{i18n>AssignedHours}';
    _employee       : Association to Employee on _employee.employeeNumber = $self.employee;
    _project        : Association to Project on _project.ID = $self.projectID;
}