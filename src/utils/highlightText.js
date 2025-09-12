export default function highlightText(text, query) {
  if (!text || !query) return text || ''
  const regex = new RegExp(`(${query})`, 'g')
  return text.toString().replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}
