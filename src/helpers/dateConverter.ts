export function dateConverter(date: Date): string {
    const string = date.toString()
    const justDate = string.slice(0, string.indexOf('T')).replaceAll('-', '.').split('.').reverse().join('.')
    const time = string.slice(string.indexOf('T')).slice(1, 6)
    return `${justDate}  ${time}`
}