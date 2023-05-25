export namespace com.gavdilabs.timesheet {
  export type Atype = string;
  export type EmployeeNumber = number;
  export type Hours = number;

  export enum Weekday {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  }

  export interface IAbsenceAttendanceType {
    AID: number;
    AAType: Atype;
    isAbsence: boolean;
  }

  export interface IEmployee {
    userName: string;
    employeeNumber: EmployeeNumber;
    firstName: string;
    lastName: string;
    title: string;
    pictureUrl: string;
    pictureType: string;
    _workSchedule?: IWorkSchedule[];
    _workHours?: IWorkHours[];
    _projectAssignments?: IProjectAssignment[];
  }

  export interface IWorkSchedule {
    ID: string;
    validFrom: Date;
    validTo: Date;
    employee: EmployeeNumber;
    weekday: Weekday;
    starttime: Date;
    endtime: Date;
    _employee?: IEmployee;
  }

  export interface IWorkHours {
    ID: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    employee: EmployeeNumber;
    workingDay: Date;
    fromTime: Date;
    toTime: Date;
    AID: number;
    projectID: string;
    _employee?: IEmployee;
    _project?: IProject;
    _absAttendance?: IAbsenceAttendanceType;
  }

  export interface IProject {
    validFrom: Date;
    validTo: Date;
    ID: string;
    projectName: string;
    totalHours: Hours;
    _projectAssignments?: IProjectAssignment[];
  }

  export interface IProjectAssignment {
    validFrom: Date;
    validTo: Date;
    projectID: string;
    employee: EmployeeNumber;
    assignedHours: Hours;
    _employee?: IEmployee;
    _project?: IProject;
  }

  export interface IProjectEmployeeAID {
    employeeNumber: number;
    projectID: string;
    totalHours: number;
    AID: number;
    AAType: string;
    percentage: number;
    isRemaining: boolean;
  }

  export interface IWeekOverview {
    startDate: string;
    numberOfDays: number;
    employeeNumber: number;
    totalWorkedHours: number;
    totalScheduledHours: number;
    totalWorkedDays: number;
    totalSchedulesDays: number;
  }

  export enum Entity {
    AbsenceAttendanceType = "com.gavdilabs.timesheet.AbsenceAttendanceType",
    Employee = "com.gavdilabs.timesheet.Employee",
    WorkSchedule = "com.gavdilabs.timesheet.WorkSchedule",
    WorkHours = "com.gavdilabs.timesheet.WorkHours",
    Project = "com.gavdilabs.timesheet.Project",
    ProjectAssignment = "com.gavdilabs.timesheet.ProjectAssignment",
    ProjectEmployeeAID = "com.gavdilabs.timesheet.ProjectEmployeeAID",
    WeekOverview = "com.gavdilabs.timesheet.WeekOverview",
  }

  export enum SanitizedEntity {
    AbsenceAttendanceType = "AbsenceAttendanceType",
    Employee = "Employee",
    WorkSchedule = "WorkSchedule",
    WorkHours = "WorkHours",
    Project = "Project",
    ProjectAssignment = "ProjectAssignment",
    ProjectEmployeeAID = "ProjectEmployeeAID",
    WeekOverview = "WeekOverview",
  }
}

export namespace sap.common {
  export interface ILanguages {
    name: string;
    descr: string;
    code: string;
    texts: ITexts[];
    localized?: ITexts;
  }

  export interface ICountries {
    name: string;
    descr: string;
    code: string;
    texts: ITexts[];
    localized?: ITexts;
  }

  export interface ICurrencies {
    name: string;
    descr: string;
    code: string;
    symbol: string;
    texts: ITexts[];
    localized?: ITexts;
  }

  export interface ITexts {
    locale: string;
    name: string;
    descr: string;
    code: string;
  }

  export interface ITexts {
    locale: string;
    name: string;
    descr: string;
    code: string;
  }

  export interface ITexts {
    locale: string;
    name: string;
    descr: string;
    code: string;
  }

  export enum Entity {
    Languages = "sap.common.Languages",
    Countries = "sap.common.Countries",
    Currencies = "sap.common.Currencies",
    Texts = "sap.common.Currencies.texts",
  }

  export enum SanitizedEntity {
    Languages = "Languages",
    Countries = "Countries",
    Currencies = "Currencies",
    Texts = "Texts",
  }
}

export namespace TimesheetService {
  export interface IEmployees {
    userName: string;
    employeeNumber: com.gavdilabs.timesheet.EmployeeNumber;
    firstName: string;
    lastName: string;
    title: string;
    pictureUrl: string;
    pictureType: string;
    _workSchedule?: IWorkSchedule[];
    _workHours?: IWorkHours[];
    _projectAssignments?: IProjectAssignment[];
  }

  export interface IAbsenceAttendanceType {
    AID: number;
    AAType: com.gavdilabs.timesheet.Atype;
    isAbsence: boolean;
  }

  export interface IWorkSchedule {
    ID: string;
    validFrom: Date;
    validTo: Date;
    employee: com.gavdilabs.timesheet.EmployeeNumber;
    weekday: com.gavdilabs.timesheet.Weekday;
    starttime: Date;
    endtime: Date;
    _employee?: IEmployees;
  }

  export interface IWorkHours {
    ID: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    employee: com.gavdilabs.timesheet.EmployeeNumber;
    workingDay: Date;
    fromTime: Date;
    toTime: Date;
    AID: number;
    projectID: string;
    _employee?: IEmployees;
    _project?: IProject;
    _absAttendance?: IAbsenceAttendanceType;
  }

  export interface IProject {
    validFrom: Date;
    validTo: Date;
    ID: string;
    projectName: string;
    totalHours: com.gavdilabs.timesheet.Hours;
    _projectAssignments?: IProjectAssignment[];
  }

  export interface IProjectAssignment {
    validFrom: Date;
    validTo: Date;
    projectID: string;
    employee: com.gavdilabs.timesheet.EmployeeNumber;
    assignedHours: com.gavdilabs.timesheet.Hours;
    _employee?: IEmployees;
    _project?: IProject;
  }

  export interface IProjectEmployeeAID {
    employeeNumber: number;
    projectID: string;
    totalHours: number;
    AID: number;
    AAType: string;
    percentage: number;
    isRemaining: boolean;
  }

  export interface IWeekOverview {
    startDate: string;
    numberOfDays: number;
    employeeNumber: number;
    totalWorkedHours: number;
    totalScheduledHours: number;
    totalWorkedDays: number;
    totalSchedulesDays: number;
  }

  export interface ICust_scheduleToShifts {
    startTime: Date;
    endTime: Date;
  }

  export interface ICust_weekOverview {
    totalWorkedHours: number;
    totalScheduledHours: number;
    totalWorkedDays: number;
    totalSchedulesDays: number;
  }

  export interface ICust_ProjectEmployeeAID {
    totalHours: number;
    AID: number;
    AAType: string;
    percentage: number;
  }

  export enum FuncGetDateSpecificWorkSchedule {
    name = "GetDateSpecificWorkSchedule",
    paramStartDate = "startDate",
    paramEmployeeNumber = "employeeNumber",
  }

  export interface IFuncGetDateSpecificWorkScheduleParams {
    startDate: string;
    employeeNumber: number;
  }

  export type FuncGetDateSpecificWorkScheduleReturn = ICust_scheduleToShifts[];

  export enum FuncGetWeekProgress {
    name = "GetWeekProgress",
    paramStartDate = "startDate",
    paramNumberOfDays = "numberOfDays",
    paramEmployeeNumber = "employeeNumber",
  }

  export interface IFuncGetWeekProgressParams {
    startDate: string;
    numberOfDays: number;
    employeeNumber: number;
  }

  export type FuncGetWeekProgressReturn = ICust_weekOverview;

  export enum FuncGetProjectWorkedHours {
    name = "GetProjectWorkedHours",
    paramEmployeeNumber = "employeeNumber",
    paramProjectID = "projectID",
  }

  export interface IFuncGetProjectWorkedHoursParams {
    employeeNumber: number;
    projectID: string;
  }

  export type FuncGetProjectWorkedHoursReturn = ICust_ProjectEmployeeAID[];

  export enum Entity {
    Employees = "TimesheetService.Employees",
    AbsenceAttendanceType = "TimesheetService.AbsenceAttendanceType",
    WorkSchedule = "TimesheetService.WorkSchedule",
    WorkHours = "TimesheetService.WorkHours",
    Project = "TimesheetService.Project",
    ProjectAssignment = "TimesheetService.ProjectAssignment",
    ProjectEmployeeAID = "TimesheetService.ProjectEmployeeAID",
    WeekOverview = "TimesheetService.WeekOverview",
    Cust_scheduleToShifts = "TimesheetService.cust_scheduleToShifts",
    Cust_weekOverview = "TimesheetService.cust_weekOverview",
    Cust_ProjectEmployeeAID = "TimesheetService.cust_ProjectEmployeeAID",
  }

  export enum SanitizedEntity {
    Employees = "Employees",
    AbsenceAttendanceType = "AbsenceAttendanceType",
    WorkSchedule = "WorkSchedule",
    WorkHours = "WorkHours",
    Project = "Project",
    ProjectAssignment = "ProjectAssignment",
    ProjectEmployeeAID = "ProjectEmployeeAID",
    WeekOverview = "WeekOverview",
    Cust_scheduleToShifts = "Cust_scheduleToShifts",
    Cust_weekOverview = "Cust_weekOverview",
    Cust_ProjectEmployeeAID = "Cust_ProjectEmployeeAID",
  }
}

export type User = string;

export enum Entity {}

export enum SanitizedEntity {}
