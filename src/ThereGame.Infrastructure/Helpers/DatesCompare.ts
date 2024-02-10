export function isDateSame(dateOne: Date, dateTwo: Date): boolean {
    return dateOne.toDateString().slice(0, 10) == dateTwo.toDateString().slice(0, 10);
}