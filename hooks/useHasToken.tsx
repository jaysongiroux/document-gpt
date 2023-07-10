import { fetchAPI } from '@/lib/frontend/fetchAPI';
import React, { useEffect } from 'react';

const useHasToken = () => {
  const [hasToken, setHasToken] = React.useState(false);
  const [systemHasToken, setSystemHasToken] = React.useState(false);

  useEffect(() => {
    fetchAPI({
      method: 'GET',
      url: '/api/hasToken',
    })
      .then((resp) => {
        setHasToken(true);
        setSystemHasToken(true);
      })
      .catch(() => {
        setHasToken(false);
        setSystemHasToken(false);
      });
  }, []);
  return {
    hasToken,
    setHasToken,
    systemHasToken,
  };
};

export default useHasToken;
