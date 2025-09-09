import formatPhoneNumber from './formatPhoneNumber';

function normalizeAppointment(apiData) {
    const contacts = (apiData.fields.contact_id || []).map((id, idx) => ({
        id,
        name: `${apiData.fields.contact_name[idx]} ${apiData.fields.contact_surname[idx]}`,
        email: apiData.fields.contact_email ? apiData.fields.contact_email[idx] : '',
        phone: apiData.fields.contact_phone ? formatPhoneNumber(apiData.fields.contact_phone[idx]) : ''
    }));

    const agents = (apiData.fields.agent_id || []).map((id, idx) => ({
        id,
        name: `${apiData.fields.agent_name[idx]} ${apiData.fields.agent_surname[idx]}`
    }));

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

export default normalizeAppointment;
