export function dateConverter(date: Date): string {
    return date.toString().split(' ').slice(0, 4).join(' ')
}