import { useState, useEffect } from "react";

// Мы используем Generic <T>, чтобы хук работал с любым типом данных (числа, объекты, массивы)
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Инициализация: Пытаемся достать данные из хранилища при первом рендере
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
