import { useEffect, useState } from 'react';

const useLocalToken = () => {
  const [token, setToken] = useState<string | null | undefined>(null);

  /**
   * Fetches API token from local storage and returns it if it exists.
   * Otherwise, returns null.
   */
  const getLocalToken = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('OPEN_AI_API_TOKEN');
    return token;
  };

  /**
   * Sets API token in local storage.
   * @param token API token to set
   */
  const setLocalToken = (token: string | null | undefined) => {
    if (typeof window === 'undefined') return;
    if (token) {
      localStorage.setItem('OPEN_AI_API_TOKEN', token);
    } else {
      localStorage.removeItem('OPEN_AI_API_TOKEN');
    }
    setToken(token);
  };

  /**
   * Removes API token from local storage.
   * @param token API token to remove
   * @returns true if token was removed, false otherwise
   */
  const removeLocalToken = () => {
    if (typeof window === 'undefined') return false;
    localStorage.removeItem('OPEN_AI_API_TOKEN');
    return true;
  };

  useEffect(() => {
    const localToken = getLocalToken();
    if (localToken) {
      setToken(localToken);
    } else {
      setToken(null);
    }
  }, []);

  return {
    getLocalToken,
    setLocalToken,
    removeLocalToken,
    token,
  };
};

export default useLocalToken;
