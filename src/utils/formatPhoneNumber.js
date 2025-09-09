const formatPhoneNumber = n => n.toString().match(/^(\d{2})(\d{3})(\d{3})(\d{3})(\d{4})$/)?.slice(1).join(' ').replace(/^/, '+') || n;

export default formatPhoneNumber;
