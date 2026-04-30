import { useState, useEffect } from "react";


export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
