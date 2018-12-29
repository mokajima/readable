const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

export function formatDate(timestamp) {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = monthNames[date.getMonth()]
  const day = date.getDay()
  const hours = date.getHours()
  const minutes = ('0' + date.getMinutes()).slice(-2)

  const formattedDate = `${month} ${day}, ${year} at ${hours}:${minutes}`

  return formattedDate
}

/**
 * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
export function getId() {
  return Math.random().toString(36).slice(2)
}

export function getTimestamp() {
  return new Date().getTime()
}
