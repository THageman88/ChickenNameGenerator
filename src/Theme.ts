// src/Theme.ts
import type { ThemeOptions } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: { main: 'rgb(37, 150, 190)' },
    background: { default: '#000000' },
  },
  typography: {
    
  },
  components: {
  },
});
