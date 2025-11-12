// src/hooks/useNetworkSpeed.js
import { useEffect } from 'react';
import { showNetworkSlowToast } from '../components/NetworkToast';

export const useNetworkSpeed = (url = '/api/data') => {
  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');

        const data = await response.blob(); // check size
        const sizeKB = data.size / 1024;

        if (!didCancel && sizeKB < 10) {
          showNetworkSlowToast(); // show toast if data is too small
        }
      } catch (err) {
        if (!didCancel) showNetworkSlowToast(); // show toast on fetch failure
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);
};
