/**
 * Helper to get the currently logged in OS username (Windows / macOS / Linux)
 */
export const getOSUsername = (): string => {
  const envUsername = import.meta.env.VITE_OS_USERNAME;
  if (envUsername && typeof envUsername === 'string' && envUsername.trim() !== '') {
    return envUsername.trim();
  }
  return 'Kidung';
};
