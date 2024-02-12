export function isDateSame(dateOne: Date, dateTwo: Date): boolean {
    return new Date(dateOne).toDateString().slice(0, 10) == new Date(dateTwo).toDateString().slice(0, 10);
}