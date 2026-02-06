// List of Admin emails who have access to the Dashboard and should be EXCLUDED from analytics logging
import { ADMIN_EMAILS } from '../constants';

// Re-export for compatibility if needed, but usage should ideally switch to constants
export { ADMIN_EMAILS };

export const isAdmin = (email) => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email);
};
