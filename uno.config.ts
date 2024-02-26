import { defineConfig, presetWind, presetAttributify } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind(),
    presetAttributify()
  ],
  theme: {
    breakpoints: {
      xs: '640px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px'
    }
  }
})
