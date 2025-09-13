import { toast } from 'vue3-toastify'

export const showToast = {
  success: (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },

  error: (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000, // Longer for errors
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },

  warning: (message) => {
    toast.warning(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },

  info: (message) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },
}

// Predefined messages for common actions
export const toastMessages = {
  appointment: {
    created: 'Appointment created successfully! 🎉',
    updated: 'Appointment updated successfully! ✅',
    deleted: 'Appointment deleted successfully! 🗑️',
    cancelled: 'Appointment cancelled successfully! ❌',
    createError: 'Failed to create appointment. Please try again.',
    updateError: 'Failed to update appointment. Please try again.',
    deleteError: 'Failed to delete appointment. Please try again.',
    validationError: 'Please fill in all required fields correctly.',
    conflictError: 'This appointment conflicts with an existing one.',
    fetchError: 'Failed to load appointments. Please refresh the page.',
  },
  agent: {
    assigned: 'Agent assigned successfully! 👤',
    removed: 'Agent removed successfully! ❌',
    assignError: 'Failed to assign agent. Please try again.',
    fetchError: 'Failed to load agents. Please refresh the page.',
  },
  contact: {
    selected: 'Contact selected! 👤',
    removed: 'Contact removed! ❌',
    required: 'Please select at least one contact.',
  },
  filter: {
    applied: 'Filters applied! 🔍',
    cleared: 'Filters cleared! ✨',
    noResults: 'No appointments found with current filters.',
  },
  general: {
    loading: 'Loading...',
    networkError: 'Network error. Please check your connection.',
    unexpectedError: 'Something went wrong. Please try again.',
    saveSuccess: 'Changes saved successfully! ✅',
    saveError: 'Failed to save changes. Please try again.',
  },
}
