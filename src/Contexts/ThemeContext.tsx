import React, { createContext, useMemo, type FC } from 'react';
import { CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { getDesignTokens } from '../Theme';
import { useLocalStorage } from 'usehooks-ts';

export interface TTheme {
  isMobile: boolean;
  isSmall: boolean;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const ThemeContext = createContext<TTheme | undefined>(undefined);

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultTheme = useTheme();
  const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));
  const isSmall  = useMediaQuery(defaultTheme.breakpoints.down('md'));

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', prefersDark);

  const muiTheme = useMemo(
    () =>
      createTheme(
        getDesignTokens((darkMode ? 'dark' : 'light') as PaletteMode)
      ),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ isMobile, isSmall, darkMode, setDarkMode }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
