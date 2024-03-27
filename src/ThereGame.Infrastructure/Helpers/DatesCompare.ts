export function isDateSame(dateOne: Date, dateTwo: Date): boolean {
    return new Date(dateOne).toDateString().slice(0, 10) == new Date(dateTwo).toDateString().slice(0, 10);
}

export function isOnRange(date: Date, startDate: Date, endDate: Date): boolean {

    const searchDateObj = new Date(date);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const searchDateWithoutTime = new Date(searchDateObj.getFullYear(), searchDateObj.getMonth(), searchDateObj.getDate());
    const startDateWithoutTime = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
    const endDateWithoutTime = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
    
    return searchDateWithoutTime >= startDateWithoutTime && searchDateWithoutTime <= endDateWithoutTime;
}