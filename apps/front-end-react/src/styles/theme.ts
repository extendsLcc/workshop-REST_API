import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: 'md',
        fontWeight: 'bold',
        WebkitFontSmoothing: 'antialiased',
      },
    },
  },

  fonts: {
    heading: `'Roboto', 'sans-serif'`,
    body: `"Roboto", 'sans-serif'`,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
