/**
 * Format ISO date string to DD/MM/YYYY HH:MM format
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted date string
 */
export default function formatDate(isoDate) {
  const date = new Date(isoDate)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
