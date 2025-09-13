import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'

/**
 * Agent API service
 */
export class AgentService {
  /**
   * Fetch all agents
   */
  static async getAgents() {
    try {
      const response = await apiClient.get(ENDPOINTS.AGENTS)
      return response.data.records || []
    } catch (error) {
      throw new Error(`Failed to fetch agents: ${error.message}`)
    }
  }

  /**
   * Fetch a single agent by ID
   */
  static async getAgent(agentId) {
    try {
      const response = await apiClient.get(`${ENDPOINTS.AGENTS}/${agentId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch agent: ${error.message}`)
    }
  }
}
