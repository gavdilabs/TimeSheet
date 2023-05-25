import { CalendarDayType } from "sap/ui/unified/library";
const projectColorMap = new Map() as Map<string, string>
const calendarDayTypes = [ CalendarDayType.Type02, CalendarDayType.Type03, CalendarDayType.Type04, CalendarDayType.Type05, CalendarDayType.Type06, CalendarDayType.Type07, CalendarDayType.Type08, CalendarDayType.Type09, CalendarDayType.Type10, CalendarDayType.Type11] as CalendarDayType[]

export default class Formatter {

  public dateToCalendarFormatter(time: string) {
    const d = new Date(2023, 3, 3, 5, 0);
    return d;
  }
  public dateFinishToCalendarFormatter(time: string) {
    const d = new Date(2023, 4, 3, 6, 0);
    return d;
  }

  public hej(type: string) {
    console.log("type " + type)
  }
  public chooseCalendarType(project: string) {
    if (project) {
      if (!projectColorMap.has(project)) {
        const mapValues = Array.from(projectColorMap.values()) as CalendarDayType[]
        for (let i = 0; i < calendarDayTypes.length; i++) {
          const dayType = calendarDayTypes[i] as CalendarDayType;
          projectColorMap.set(project, dayType)
          if (!mapValues.includes(dayType)) {
            projectColorMap.set(project, dayType)
            break;
          }
        }
      }
    }
    return projectColorMap.get(project);
  }
  public async totalHoursAID2(AID: string, projectID: string, employeeNumber: string) {
    var aa = 0
    await $.ajax({
      type: "GET",
      url: "/odata/WorkHours?$filter=employee eq " + employeeNumber + " and projectID eq '" + projectID + "' and AID eq " + AID,
      dataType: "json",
      success: (res) => {
        if (res.value.length > 0) {
          res.value.forEach(element => {
            var d1 = new Date(element.fromTime);
            var d2 = new Date(element.toTime);
            var sub = (d2.getTime() - d1.getTime()) / 3600000;
            aa = aa + sub
          });
        }
      },
      error: {
        //NOTE: Do nothing
      },
    });
    return String(Math.round(aa))
  }
};
