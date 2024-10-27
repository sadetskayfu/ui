import { FC, ReactNode, useState } from 'react'
import { Theme, ThemeContext, LOCAL_STORAGE_THEME_KEY } from './ThemeContext'

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  document.body.className = theme;

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
