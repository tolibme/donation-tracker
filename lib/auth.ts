// Simple password for admin access - change this to your secure password
export const ADMIN_PASSWORD = "supersecret"

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}
