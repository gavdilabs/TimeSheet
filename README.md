# Timesheet

Example Project for Graduates, using a Timesheet application as example on using UI5 / CAP.

## Getting Started

Clone, install Node Depency and run via Project.json scripts.

Entity | Purpose
---------|----------
`Employee` | The Employees that can access the Timesheet
`WorkSchedule` | The Expected Work Hours of the Employee
`Project` | The Available Projects
`WorkHours` | The Actual Working Hours on a Concrete Project
`ProjectAssignment` | Linking Employee with a Project, together with amount of Hours
`AbsenceAttendanceType` | The Possible Absence & Attendance Types

## Next Steps

Implement UI Module `timesheet`

The UI includes the following:

- List of Employees
- List of Projects (Assigned to Select Employee)
- List of Absence/Attendance
- Single Planning Calendar showing the Week: [Single Planning Calendar](https://experience.sap.com/fiori-design-web/single-planning-calendar/), allowing the user to navigate one week back and forth
- Allow Show/Hide Expected Work Hours
- Show Remaining Hours on Project when selecting a Project for an Employee
- Show Messages to the User on different types of Validations
- Have a "Jump To Date" button, allowing the user to jump to any random week

Features:

1. Allow users to create new appointments by clicking, dragging, and releasing on an empty space in the content area (property: enableAppointmentsCreate).
2. Allow users to change the duration of an appointment by clicking and dragging one side of the appointment (property: enableAppointmentsResize).

Service:

- Provide _Function_ for Remaining Hours for Employee on Project, based on subtracting hours from WorkHours and AssignedHours in ProjectAssignment
- Don't list Project where there is 0 hours left on Project Assignments or it is not no longer valid (effective dated)
- **Validation** > Show Error in Message when trying to register more hours than is currently remaining on AssignedHours on
ProjectAssignment
- **Validation** > Show Error when trying to register hours on a Project outside the ProjectAllocation Period

  ## License

  Released under Apache-2 as an Inspiration - Feel free to clone and adapt in any way you'll like!
