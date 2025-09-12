import { computed } from 'vue'

/**
 * Reusable pagination generator
 * @param {ref<number>} totalPages
 * @param {ref<number>} currentPage
 * @param {number} delta
 */

export function usePagination(totalPages, currentPage, delta = 1) {
  const paginationRange = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const range = []
    const rangeWithDots = []

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i)
      }
    }

    let prev = null
    for (let i of range) {
      if (prev) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1)
        } else if (i - prev > 2) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      prev = i
    }

    return rangeWithDots
  })

  return {
    paginationRange,
  }
}
