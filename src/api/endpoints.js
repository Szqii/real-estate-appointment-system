/**
 * API endpoint definitions
 * Note: Replace these with your actual Airtable table IDs
 */
export const ENDPOINTS = {
  APPOINTMENTS: import.meta.env.VITE_APPOINTMENTS_TABLE_ID || '/Appointments',
  AGENTS: import.meta.env.VITE_AGENTS_TABLE_ID || '/Agents',
}
