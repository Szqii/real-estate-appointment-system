/**
 * Highlight search query in text with HTML mark tags
 * @param {string} text - Text to highlight
 * @param {string} query - Search query to highlight
 * @returns {string} Text with highlighted query
 */
export default function highlightText(text, query) {
  if (!text || !query) return text || ''
  const regex = new RegExp(`(${query})`, 'gi')
  return text.toString().replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}
