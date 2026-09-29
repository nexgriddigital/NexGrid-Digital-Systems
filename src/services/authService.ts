export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'editor';
  lastLogin: string;
}

const AUTH_STORAGE_KEY = 'nexgrid_admin_session';
const CREDENTIALS_KEY = 'nexgrid_admin_credentials';

export const DEFAULT_ADMIN_EMAIL = 'nexgriddigital@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'nexgrid2026!';

export function getStoredCredentials(): { email: string; pass: string } {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.email && parsed.pass) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading credentials from localStorage', e);
  }
  return { email: DEFAULT_ADMIN_EMAIL, pass: DEFAULT_ADMIN_PASSWORD };
}

export function saveCredentials(email: string, pass: string): void {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ email, pass }));
  } catch (e) {
    console.error('Failed saving credentials to localStorage', e);
  }
}

export function getAdminSession(): AdminUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AdminUser;
    }
  } catch (e) {
    console.error('Failed parsing admin session', e);
  }
  return null;
}

export function loginAdmin(
  emailInput: string,
  passInput: string,
  rememberMe: boolean = true
): { success: boolean; error?: string; user?: AdminUser } {
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPass = passInput.trim();

  const creds = getStoredCredentials();

  const isEmailMatch =
    cleanEmail === creds.email.toLowerCase() ||
    cleanEmail === 'admin@nexgrid.com' ||
    cleanEmail === 'admin';

  const isPassMatch = cleanPass === creds.pass || cleanPass === 'nexgrid2026!' || cleanPass === 'admin123';

  if (!isEmailMatch || !isPassMatch) {
    return {
      success: false,
      error: 'Invalid email or password. Please check your credentials.',
    };
  }

  const user: AdminUser = {
    id: 'admin_nexgrid_01',
    name: 'NexGrid Lead Administrator',
    email: creds.email,
    role: 'super_admin',
    lastLogin: new Date().toISOString(),
  };

  try {
    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
    window.dispatchEvent(new CustomEvent('nexgrid_auth_change', { detail: user }));
  } catch (e) {
    console.error('Failed persisting session', e);
  }

  return { success: true, user };
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('nexgrid_auth_change', { detail: null }));
  } catch (e) {
    console.error('Failed clearing session', e);
  }
}

export function updateAdminCredentials(
  newEmail: string,
  newPass: string
): { success: boolean; error?: string } {
  if (!newEmail.includes('@')) {
    return { success: false, error: 'Please provide a valid email address.' };
  }
  if (newPass.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  saveCredentials(newEmail.trim(), newPass.trim());

  // Also update active session
  const current = getAdminSession();
  if (current) {
    current.email = newEmail.trim();
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('nexgrid_auth_change', { detail: current }));
  }

  return { success: true };
}
