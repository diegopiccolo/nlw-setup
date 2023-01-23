import dayjs from "dayjs";

export function generateDaysFromYearBeginning(){
  const firstDayOfTheDay = dayjs().startOf('year');
  const today = new Date();

  const dates = [];
  let compareDate = firstDayOfTheDay;
  
  while (compareDate.isBefore(today)){
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}