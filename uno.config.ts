import {
    defineConfig,
    presetAttributify,
    presetUno,
    presetWind,
  } from 'unocss';
  
  export default defineConfig({
    // ...UnoCSS options
    presets: [
      presetUno(),
      presetAttributify(),
      presetWind(),
    ],
    theme: {
      colors: {
        'primary': '#6259E3',
        'text': '#050505',
        'bg': '#F7F7F7',
      },
    },
  });