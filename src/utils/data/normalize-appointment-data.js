import formatPhoneNumber from '../format/format-phone-number.js'

/**
 * Normalize appointment data from API response
 * @param {Object} apiData - Raw API data
 * @param {Map} agentMap - Map of agent IDs to agent data
 * @returns {Object} Normalized appointment object
 */
export default function normalizeAppointment(apiData, agentMap) {
  const contacts = (apiData.fields.contact_id || []).map((id, idx) => ({
    id,
    name: `${apiData.fields.contact_name[idx]} ${apiData.fields.contact_surname[idx]}`,
    email: apiData.fields.contact_email ? apiData.fields.contact_email[idx] : '',
    phone: apiData.fields.contact_phone ? formatPhoneNumber(apiData.fields.contact_phone[idx]) : '',
  }))

  const agents = (apiData.fields.agent_id || []).map((id) => {
    const agentDetails = agentMap?.get(id) || {}
    return {
      id,
      name: `${agentDetails.fields.agent_name} ${agentDetails.fields.agent_surname}`,
      createdTime: agentDetails.createdTime || null,
      appointments: agentDetails.fields.appointments,
      color: agentDetails.fields.color || '#000000',
      number: agentDetails.fields.number || null,
    }
  })

  return {
    id: apiData.id,
    createdTime: apiData.createdTime,
    appointmentId: apiData.fields.appointment_id || null,
    appointmentDate: apiData.fields.appointment_date || null,
    appointmentAddress: apiData.fields.appointment_address || '',
    contacts,
    agents,
    isCancelled: apiData.fields.is_cancelled || false,
  }
}
