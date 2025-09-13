import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AgentService } from '@/api/services'

export const useAgentsStore = defineStore('agents', () => {
  const agents = ref([]) // Private state
  const loading = ref(false)
  const error = ref(null)

  const fetchAgents = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await AgentService.getAgents()
      setAgents(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch agents')
    } finally {
      setLoading(false)
    }
  }

  const setAgents = (data) => {
    agents.value = data
  }

  const setLoading = (value) => {
    loading.value = value
  }

  const setError = (err) => {
    error.value = err
  }

  return {
    fetchAgents,
    agents,
    loading,
    error,
    setAgents,
    setLoading,
    setError,
  }
})
