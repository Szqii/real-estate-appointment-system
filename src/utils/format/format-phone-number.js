/**
 * Format phone number with spaces and plus sign
 * @param {string|number} n - Phone number to format
 * @returns {string} Formatted phone number
 */
export default function formatPhoneNumber(n) {
  return (
    n
      .toString()
      .match(/^(\d{2})(\d{3})(\d{3})(\d{3})(\d{4})$/)
      ?.slice(1)
      .join(' ')
      .replace(/^/, '+') || n
  )
}
