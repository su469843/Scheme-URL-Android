import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorValue } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  backgroundColor: ColorValue;
  textColor: ColorValue;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  backgroundColor: '#fff',
  textColor: '#000',
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('@theme');
        if (stored === 'dark' || stored === 'light') {
          setTheme(stored);
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      await AsyncStorage.setItem('@theme', next);
    } catch (e) {
      // ignore
    }
  };

  const backgroundColor = theme === 'light' ? '#f5f5f5' : '#121212';
  const textColor = theme === 'light' ? '#333' : '#f5f5f5';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
