export function dateConverter(date) {
    return date.toString().split(' ').slice(0, 4).join(' ')
}