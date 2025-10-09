import { useState, useCallback } from 'react';

const STORAGE_KEY = 'product_options';

// Ce hook va gérer la sauvegarde des options (couleur/taille) dans le localStorage
export const useProductOptions = () => {
  const [options, setOptions] = useState(() => {
    try {
      const storedOptions = window.localStorage.getItem(STORAGE_KEY);
      return storedOptions ? JSON.parse(storedOptions) : {};
    } catch (error) {
      console.error(error);
      return {};
    }
  });

  const saveOptions = useCallback((productId, newOptions) => {
    const newStoredOptions = { ...options, [productId]: newOptions };
    setOptions(newStoredOptions);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newStoredOptions));
    } catch (error) {
      console.error(error);
    }
  }, [options]);

  const getOptions = useCallback((productId) => {
    return options[productId] || { color: 'Standard', size: '40' };
  }, [options]);

  return { saveOptions, getOptions };
};